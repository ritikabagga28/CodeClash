import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { levelForXp, nextLevelForXp } from "../data/challenges";
import { getActiveSession, saveActiveSession, clearActiveSession } from "../services/authService";

// ============================================================================
// Single source of truth for "player" progress and theme state.
// ============================================================================

const STORAGE_KEY = "codeclash.progress.v1";
const CUSTOM_KEY = "codeclash.customChallenges.v1";
const THEME_KEY = "codeclash.theme.v1";

const defaultProgress = {
  xp: 0,
  points: 0,
  completedChallengeIds: [],
  streak: 1,
  lastResult: null, // { challengeId, xpEarned, pointsEarned, passed, total }
};

const defaultAuth = { isLoggedIn: false, username: "", user: null };

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
  return getActiveSession();
}

function loadTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function AppProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress);
  const [customChallenges, setCustomChallenges] = useState(loadCustomChallenges);
  const [auth, setAuth] = useState(loadAuth);
  const [theme, setTheme] = useState(loadTheme);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(customChallenges));
  }, [customChallenges]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

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

  const login = useCallback((userData) => {
    const userObj = typeof userData === "string" ? { name: userData, email: "" } : userData;
    const session = saveActiveSession(userObj);
    if (session) {
      setAuth(session);
    }
  }, []);

  const logout = useCallback(() => {
    clearActiveSession();
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
      theme,
      toggleTheme,
      setTheme,
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
    theme,
    toggleTheme,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}
