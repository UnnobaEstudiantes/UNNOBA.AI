import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import "./reset.css";

// Hooks personalizados
import { useTheme } from "./hooks/useTheme";
import { useChat } from "./hooks/useChat";
import { useAdmin } from "./hooks/useAdmin";

// Componentes
import Header from "./components/Header/Header";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import InputBox from "./components/InputBox/InputBox";
import LoginModal from "./components/LoginModal/LoginModal";
import AdminPanel from "./components/AdminPanel/AdminPanel";

// Constantes
import { PREDEFINED_RESPONSES } from "./utils/constants";

const App = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const {
    message,
    setMessage,
    isResponseScreen,
    messages,
    isGenerating,
    streamedResponse,
    error,
    messagesEndRef,
    pausarUnnobaAi,
    saltosDeLinea,
    hitRequest,
    newChat,
    generateResponse,
    addPredefinedResponse,
    stopGenerating,
  } = useChat();

  const { enabled: adminEnabled, isAdmin, user: adminUser, login, logout } =
    useAdmin();
  /** No bloquea a alumnos: quien tenga la clave abre "Cargar material" y entra al panel. */
  const [loginOpen, setLoginOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  const onAdminLogout = useCallback(() => {
    setAdminPanelOpen(false);
    setLoginOpen(true);
    logout();
  }, [logout]);

  // Efectos para los eventos de teclado
  useEffect(() => {
    const handle2KeyDown = (e) => {
      if (e.key === "u") {
        saltosDeLinea.current = true;
      }
    };
    document.addEventListener("keydown", handle2KeyDown);

    return () => {
      document.removeEventListener("keydown", handle2KeyDown);
    };
  }, [saltosDeLinea]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "x") {
        pausarUnnobaAi.current = true;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pausarUnnobaAi]);

  // Efecto para hacer scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamedResponse, messagesEndRef]);

  const handleCardClick = (question) => {
    if (isGenerating) return;

    const respuesta = PREDEFINED_RESPONSES[question];

    if (respuesta) {
      addPredefinedResponse(question, respuesta);
    } else {
      // Si no es uno de los atajos, va por IA
      setMessage(question);
      setTimeout(() => {
        generateResponse(question);
      }, 300);
    }
  };

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {isResponseScreen ? (
          <motion.div
            key="chat-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", flexDirection: "column", flex: 1 }}
          >
            <Header
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              onNewChat={newChat}
              onStop={stopGenerating}
              isGenerating={isGenerating}
              showNewChatButton={true}
              adminEnabled={adminEnabled}
              isAdmin={isAdmin}
              sessionUser={adminUser}
              onOpenLogin={() => setLoginOpen(true)}
              onOpenAdminPanel={() => setAdminPanelOpen(true)}
              onAdminLogout={onAdminLogout}
            />
            <ChatScreen
              messages={messages}
              isGenerating={isGenerating}
              streamedResponse={streamedResponse}
              messagesEndRef={messagesEndRef}
            />
          </motion.div>
        ) : (
          <motion.div
            key="welcome-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              <Header
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                onStop={stopGenerating}
                showNewChatButton={false}
                adminEnabled={adminEnabled}
                isAdmin={isAdmin}
                sessionUser={adminUser}
                onOpenLogin={() => setLoginOpen(true)}
                onOpenAdminPanel={() => setAdminPanelOpen(true)}
                onAdminLogout={onAdminLogout}
              />
            </div>
            <WelcomeScreen
              onCardClick={handleCardClick}
              isGenerating={isGenerating}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <InputBox
          message={message}
          setMessage={setMessage}
          onSend={hitRequest}
          isGenerating={isGenerating}
          error={error}
          onStop={stopGenerating}
        />
        <motion.p
          className="bottom-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          TPI 2025 · Sistemas Inteligentes. Asistente de consulta académica
          (material de la cátedra e información UNNOBA). Integrantes: Ag.
          Bascoy, B. Bertacchini, F. Figueroa, F. Lucero · Docentes: L. Esnaola,
          J. P. Tessore.
        </motion.p>
      </motion.div>

      {adminEnabled && (
        <LoginModal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onSubmit={login}
        />
      )}
      {adminEnabled && isAdmin && (
        <AdminPanel
          open={adminPanelOpen}
          onClose={() => setAdminPanelOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
