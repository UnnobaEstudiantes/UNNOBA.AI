import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./Header.css";

const Header = ({
  isDarkMode,
  toggleTheme,
  onNewChat,
  isGenerating,
  showNewChatButton = false,
  adminEnabled = false,
  isAdmin = false,
  sessionUser = null,
  onOpenLogin,
  onOpenAdminPanel,
  onAdminLogout,
}) => {
  return (
    <div className="header header-always-centered">
      <div className="header-left">
        {adminEnabled && !isAdmin && (
          <motion.button
            type="button"
            className="btn-ghost btn-ghost--accent"
            onClick={onOpenLogin}
            whileTap={{ scale: 0.97 }}
          >
            Cargar material
          </motion.button>
        )}
        {adminEnabled && isAdmin && (
          <>
            {sessionUser && (
              <span className="header-session-user" title="Carga de documentos">
                {sessionUser}
              </span>
            )}
            <motion.button
              type="button"
              className="btn-ghost btn-ghost--accent"
              onClick={onOpenAdminPanel}
              whileTap={{ scale: 0.97 }}
            >
              Cargar documentos
            </motion.button>
            <motion.button
              type="button"
              className="btn-ghost"
              onClick={onAdminLogout}
              whileTap={{ scale: 0.97 }}
            >
              Salir
            </motion.button>
          </>
        )}
      </div>
      <div className="header-title-block">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="main-title"
        >
          UNNOBA.AI
        </motion.h1>
        <p className="header-subtitle">
          TPI 2025 · Sistemas Inteligentes — Asistente de consulta académica
        </p>
      </div>
      <div className="header-buttons">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-theme"
          onClick={toggleTheme}
          style={{
            backgroundColor: isDarkMode ? "#f59e0b" : "#374151",
            color: isDarkMode ? "#111827" : "white",
          }}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </motion.button>
        {showNewChatButton && (
          <motion.button
            whileHover={!isGenerating ? { scale: 1.05 } : {}}
            whileTap={!isGenerating ? { scale: 0.95 } : {}}
            className="btn-primary"
            onClick={onNewChat}
            disabled={isGenerating}
          >
            Nuevo Chat
          </motion.button>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  onNewChat: PropTypes.func,
  isGenerating: PropTypes.bool,
  showNewChatButton: PropTypes.bool,
  adminEnabled: PropTypes.bool,
  isAdmin: PropTypes.bool,
  sessionUser: PropTypes.string,
  onOpenLogin: PropTypes.func,
  onOpenAdminPanel: PropTypes.func,
  onAdminLogout: PropTypes.func,
};

export default Header;
