/**
 * Authentication Service for CodeClash.
 * 
 * Manages user registration, credential authentication, password hashing,
 * and session persistence. Structured to allow easy migration to a backend API.
 */

const USERS_STORAGE_KEY = "codeclash.users.v1";
const SESSION_STORAGE_KEY = "codeclash.auth.v1";

/**
 * Hash a password using SHA-256 via Web Crypto API with a lightweight fallback.
 */
export async function hashPassword(password) {
  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    try {
      const msgBuffer = new TextEncoder().encode(password);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
      // Fallback below
    }
  }

  // Fallback simple deterministic hash if crypto.subtle is not accessible
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `hash_${Math.abs(hash).toString(16)}`;
}

/**
 * Retrieve all registered users from storage.
 * Note: Never prepopulated with default or fake users.
 */
export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to read registered users:", err);
    return [];
  }
}

/**
 * Save registered users to storage.
 */
function saveRegisteredUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Failed to save registered users:", err);
  }
}

/**
 * Validate email format.
 */
export function validateEmail(email) {
  if (!email || typeof email !== "string") return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Register a new user with strict field validations.
 */
export async function registerUser({ name, email, password, confirmPassword }) {
  const errors = {};

  const cleanName = (name || "").trim();
  const cleanEmail = (email || "").trim().toLowerCase();

  if (!cleanName || cleanName.length < 2) {
    errors.name = "Competitor name must be at least 2 characters.";
  }

  if (!cleanEmail) {
    errors.email = "Email address is required.";
  } else if (!validateEmail(cleanEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const existingUsers = getRegisteredUsers();
  const emailExists = existingUsers.some((u) => u.email.toLowerCase() === cleanEmail);

  if (emailExists) {
    return {
      success: false,
      errors: { email: "An account with this email already exists." },
    };
  }

  const passwordHash = await hashPassword(password);
  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: cleanName,
    email: cleanEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  saveRegisteredUsers([...existingUsers, newUser]);

  return {
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  };
}

/**
 * Authenticate an existing user.
 */
export async function authenticateUser({ email, password }) {
  const cleanEmail = (email || "").trim().toLowerCase();

  if (!cleanEmail) {
    return {
      success: false,
      error: "Email is required.",
      field: "email",
    };
  }

  if (!password) {
    return {
      success: false,
      error: "Password is required.",
      field: "password",
    };
  }

  const existingUsers = getRegisteredUsers();
  const user = existingUsers.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    return {
      success: false,
      error: "Account not found. Please sign up first.",
      field: "email",
    };
  }

  const candidateHash = await hashPassword(password);
  if (user.passwordHash !== candidateHash) {
    return {
      success: false,
      error: "Incorrect password.",
      field: "password",
    };
  }

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

/**
 * Retrieve active session from storage.
 */
export function getActiveSession() {
  const defaultAuth = { isLoggedIn: false, username: "", user: null };
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return defaultAuth;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.isLoggedIn && parsed.user) {
      return {
        isLoggedIn: true,
        username: parsed.user.name || parsed.username || "Competitor",
        user: parsed.user,
      };
    }
    return defaultAuth;
  } catch {
    return defaultAuth;
  }
}

/**
 * Store active user session.
 */
export function saveActiveSession(user) {
  try {
    const session = {
      isLoggedIn: true,
      username: user.name,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    return session;
  } catch (err) {
    console.error("Failed to save session:", err);
    return null;
  }
}

/**
 * Clear user session on logout.
 */
export function clearActiveSession() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear session:", err);
  }
}
