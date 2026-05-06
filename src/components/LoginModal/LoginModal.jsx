import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import "./LoginModal.css";

const LoginModal = ({ open, onClose, onSubmit }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setPassword("");
      setError("");
    }
  }, [open]);

  const handleSend = (e) => {
    e.preventDefault();
    const result = onSubmit({ password });
    if (result?.ok) onClose();
    else setError(result?.error || "No se pudo verificar la clave");
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="login-modal-backdrop"
          role="presentation"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-labelledby="login-title"
            aria-modal="true"
            className="login-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <h2 id="login-title" className="login-modal-title">
              Cargar material
            </h2>
            <p className="login-modal-hint">
              Solo para quien suba o actualice apuntes (la clave la deja quien
              prepara el entorno). El resto usa el chat directo, sin contraseña.
            </p>
            <form onSubmit={handleSend} className="login-modal-form">
              <label className="login-modal-label" htmlFor="login-pass">
                Clave
              </label>
              <input
                id="login-pass"
                type="password"
                className="login-modal-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                autoFocus
              />
              {error && <p className="login-modal-error">{error}</p>}
              <div className="login-modal-actions">
                <button
                  type="button"
                  className="login-modal-btn secondary"
                  onClick={onClose}
                >
                  Cerrar
                </button>
                <button type="submit" className="login-modal-btn primary">
                  Entrar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginModal;
