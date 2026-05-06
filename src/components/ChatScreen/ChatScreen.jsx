import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import MessageBubble from "../MessageBubble/MessageBubble";
import LoadingDots from "../LoadingDots/LoadingDots";
import TypingCursor from "../TypingCursor/TypingCursor";
import {
  formatResponseText,
  formatCalendarResponse,
  formatDateInfo,
} from "../../utils/formatters";
import "./ChatScreen.css";

const ChatScreen = ({
  messages,
  isGenerating,
  streamedResponse,
  messagesEndRef,
}) => {
  const appear = {
    type: "spring",
    stiffness: 420,
    damping: 30,
    mass: 0.6,
  };

  // Función para formatear respuestas en streaming
  const getFormattedStreamedResponse = (text) => {
    if (!text) return "";

    // Detectar tipo de respuesta para aplicar formateo apropiado
    if (
      text.includes("CALENDAR") ||
      text.includes("ACADÉMICO") ||
      text.includes("📅") ||
      text.includes("EXÁMENES") ||
      text.includes("INSCRIPCIONES") ||
      text.includes("FERIADOS")
    ) {
      return formatCalendarResponse(text);
    }

    // Detectar información de fechas
    const hasDateInfo =
      /\d{4}-\d{2}-\d{2}|\d{1,2}\s+de\s+\w+|\w+\s+\d{1,2}\s+al?\s+\d{1,2}/i.test(
        text
      );
    if (hasDateInfo) {
      return formatDateInfo(text);
    }

    return formatResponseText(text);
  };

  return (
    <div className="messages-container">
      <div className="messages-content">
        <AnimatePresence initial={false}>
          {messages?.map((msg, index) => (
            <motion.div
              key={`m-${index}-${msg.type}`}
              className="message-row"
              data-user={msg.type === "userMsg" ? "true" : "false"}
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={appear}
            >
              <MessageBubble
                message={msg.text}
                isUser={msg.type === "userMsg"}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {isGenerating && streamedResponse && (
          <div className="streaming-response message-row" data-user="false">
            <motion.div
              key="stream"
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="bot-message streaming-message"
              dangerouslySetInnerHTML={{
                __html: getFormattedStreamedResponse(streamedResponse),
              }}
            />
            <TypingCursor />
          </div>
        )}
        {isGenerating && !streamedResponse && (
          <div className="message-row" data-user="false">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bot-message loading-message"
            >
              <LoadingDots />
            </motion.div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

ChatScreen.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  isGenerating: PropTypes.bool.isRequired,
  streamedResponse: PropTypes.string.isRequired,
  messagesEndRef: PropTypes.object.isRequired,
};

export default ChatScreen;
