import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoCalendar, IoLaptop, IoCreate, IoBook } from "react-icons/io5";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import { WELCOME_MESSAGE, TYPING_SPEED } from "../../utils/constants";
import "./WelcomeScreen.css";

const WelcomeScreen = ({ onCardClick, isGenerating = false }) => {
  const [displayedMessage, setDisplayedMessage] = useState("");

  useEffect(() => {
    if (displayedMessage.length < WELCOME_MESSAGE.length) {
      const timeout = setTimeout(() => {
        setDisplayedMessage(
          WELCOME_MESSAGE.substring(0, displayedMessage.length + 1)
        );
      }, TYPING_SPEED);
      return () => clearTimeout(timeout);
    }
  }, [displayedMessage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const cards = [
    {
      question: "¿Cómo consulto el contenido o las unidades de la materia?",
      icon: <IoBook />,
    },
    {
      question: "¿Dónde veo mi calendario académico?",
      icon: <IoCalendar />,
    },
    {
      question: "¿Cómo y cuándo me inscribo a materias o finales?",
      icon: <IoCreate />,
    },
    {
      question: "¿Como utilizo la plataforma virtual o campus?",
      icon: <IoLaptop />,
    },
  ];

  return (
    <motion.div
      className="welcome-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="welcome-message-container">
        <p className="welcome-message">{displayedMessage}</p>
      </div>
      <div className="cards-grid">
        {cards.map((item, i) => (
          <Card
            key={i}
            index={i}
            question={item.question}
            icon={item.icon}
            onClick={onCardClick}
            disabled={isGenerating}
          />
        ))}
      </div>
    </motion.div>
  );
};

WelcomeScreen.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  isGenerating: PropTypes.bool,
};

export default WelcomeScreen;
