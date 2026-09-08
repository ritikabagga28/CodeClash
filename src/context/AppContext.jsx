import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { levelForXp, nextLevelForXp } from "../data/challenges";

// ============================================================================
// Single source of truth for "player" progress. Everything here is kept in
// React state and mirrored to localStorage, so the prototype survives a
// refresh without needing a backend yet. Evaluation 2 swaps the persistence
// layer (see the two useEffects at the bottom) for real API calls without
// touching any component that consumes this context.
// ============================================================================

const STORAGE_KEY = "codearena.progress.v1";
const CUSTOM_KEY = "codearena.customChallenges.v1";
const AUTH_KEY = "codearena.auth.v1";

const defaultProgress = {
  xp: 0,
  points: 0,
  completedChallengeIds: [],
  streak: 1,
  lastResult: null, // { challengeId, xpEarned, pointsEarned, passed, total }
};

const defaultAuth = { isLoggedIn: false, username: "" };

const AppContext = createContext(null);

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultProgress, ...JSON.parse(raw) } : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

function loadCustomChallenges() {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? { ...defaultAuth, ...JSON.parse(raw) } : defaultAuth;
  } catch {
    return defaultAuth;
  }
}

export function AppProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress);
  const [customChallenges, setCustomChallenges] = useState(loadCustomChallenges);
  const [auth, setAuth] = useState(loadAuth);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(customChallenges));
  }, [customChallenges]);

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  }, [auth]);

  const completeChallenge = useCallback((challenge, { passedCount, totalCount }) => {
    const allPassed = passedCount === totalCount;
    setProgress((prev) => {
      const alreadyDone = prev.completedChallengeIds.includes(challenge.id);
      const xpEarned = allPassed && !alreadyDone ? challenge.xp : 0;
      const pointsEarned = allPassed && !alreadyDone ? challenge.points : 0;
      return {
        ...prev,
        xp: prev.xp + xpEarned,
        points: prev.points + pointsEarned,
        completedChallengeIds: allPassed
          ? Array.from(new Set([...prev.completedChallengeIds, challenge.id]))
          : prev.completedChallengeIds,
        lastResult: {
          challengeId: challenge.id,
          title: challenge.title,
          xpEarned,
          pointsEarned,
          passed: allPassed,
          passedCount,
          totalCount,
        },
      };
    });
  }, []);

  const addCustomChallenge = useCallback((challenge) => {
    setCustomChallenges((prev) => [...prev, challenge]);
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  // NOTE: this is a UI-only stand-in for real authentication. It doesn't
  // check a password against anything — it just records "someone is signed
  // in" so the sidebar/dashboard can react to it. Evaluation 2 swaps this
  // for a real auth call without touching the components that read `auth`.
  const login = useCallback((username) => {
    setAuth({ isLoggedIn: true, username: username?.trim() || "Coder" });
  }, []);

  const logout = useCallback(() => {
    setAuth(defaultAuth);
  }, []);

  const value = useMemo(() => {
    const level = levelForXp(progress.xp);
    const nextLevel = nextLevelForXp(progress.xp);
    const xpIntoLevel = progress.xp - level.xpRequired;
    const xpForNextLevel = nextLevel ? nextLevel.xpRequired - level.xpRequired : xpIntoLevel || 1;

    return {
      progress,
      customChallenges,
      level,
      nextLevel,
      xpIntoLevel,
      xpForNextLevel,
      completeChallenge,
      addCustomChallenge,
      resetProgress,
      auth,
      login,
      logout,
    };
  }, [
    progress,
    customChallenges,
    completeChallenge,
    addCustomChallenge,
    resetProgress,
    auth,
    login,
    logout,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}
