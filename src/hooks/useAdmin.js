import { useState, useCallback, useMemo } from "react";

const SESSION_OK = "tpi_unnoba_admin_ok";
const SESSION_USER = "tpi_unnoba_admin_user";

/**
 * Acceso a la carga de documentos (solo front, prototipo TPI). Una clave en .env, sin flujo "real".
 * El backend debe validar las cargas si esto pasa a producción.
 */
function adminFeatureEnabled() {
  return import.meta.env.VITE_ENABLE_ADMIN === "true";
}

function readSession() {
  if (!adminFeatureEnabled()) {
    return { isLoggedIn: false, user: null };
  }
  const ok = sessionStorage.getItem(SESSION_OK) === "1";
  if (!ok) return { isLoggedIn: false, user: null };
  return {
    isLoggedIn: true,
    user: sessionStorage.getItem(SESSION_USER) || "Carga",
  };
}

function displayLabel() {
  const raw = import.meta.env.VITE_ADMIN_LABEL;
  const s = raw != null ? String(raw).trim() : "";
  return s || "Carga";
}

function expectedPassword() {
  return import.meta.env.VITE_ADMIN_KEY;
}

export function useAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => readSession().isLoggedIn
  );
  const [user, setUser] = useState(() => readSession().user);

  const enabled = useMemo(() => adminFeatureEnabled(), []);

  const login = useCallback((payload) => {
    if (!adminFeatureEnabled()) {
      return { ok: false, error: "Carga de material deshabilitada" };
    }
    const expectedPwd = expectedPassword();
    if (!expectedPwd || String(expectedPwd).trim() === "") {
      return {
        ok: false,
        error: "Falta la clave en .env (VITE_ADMIN_KEY). Avisale a quien armó el proyecto.",
      };
    }
    const p = String(
      typeof payload === "string" ? payload : payload?.password ?? ""
    );
    if (p !== expectedPwd) {
      return { ok: false, error: "Clave incorrecta" };
    }
    const label = displayLabel();
    sessionStorage.setItem(SESSION_OK, "1");
    sessionStorage.setItem(SESSION_USER, label);
    setIsLoggedIn(true);
    setUser(label);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_OK);
    sessionStorage.removeItem(SESSION_USER);
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  // Compat: el resto del app usa "isAdmin"
  return {
    enabled,
    isAdmin: isLoggedIn,
    user,
    login,
    logout,
  };
}
