import React, { useState } from 'react';
import './Quiz.css';

const QuizApp = () => {
const  originalQuestions = [
  {
    question: "Which JavaScript keyword is used to declare a constant?",
    options: ["var", "let", "const", "static"],
    correct: "const",
    category: "JavaScript",
    difficulty: "Easy"
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correct: "<a>",
    category: "HTML",
    difficulty: "Easy"
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["font-color", "text-color", "color", "background-color"],
    correct: "color",
    category: "CSS",
    difficulty: "Easy"
  },
  {
    question: "Which JavaScript method converts JSON text into a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "parse.JSON()"],
    correct: "JSON.parse()",
    category: "JavaScript",
    difficulty: "Medium"
  },
  {
    question: "Which HTML attribute is used to provide an alternate text for an image?",
    options: ["title", "src", "alt", "href"],
    correct: "alt",
    category: "HTML",
    difficulty: "Easy"
  },
  {
    question: "Which CSS layout module is best for one-dimensional layouts?",
    options: ["Grid", "Flexbox", "Float", "Position"],
    correct: "Flexbox",
    category: "CSS",
    difficulty: "Medium"
  },
  {
    question: "Which JavaScript operator is used to compare both value and type?",
    options: ["==", "=", "===", "!="],
    correct: "===",
    category: "JavaScript",
    difficulty: "Easy"
  },
  {
    question: "Which HTML tag is used to define a table row?",
    options: ["<td>", "<th>", "<tr>", "<table>"],
    correct: "<tr>",
    category: "HTML",
    difficulty: "Easy"
  },
  {
    question: "Which CSS property is used to make a website responsive?",
    options: ["media queries", "flex-wrap", "responsive", "@media"],
    correct: "@media",
    category: "CSS",
    difficulty: "Medium"
  },
  {
    question: "Which JavaScript method is used to add an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correct: "push()",
    category: "JavaScript",
    difficulty: "Easy"
  }
];


  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [quizQuestions, setQuizQuestions] = useState(() => shuffleArray(originalQuestions));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answer, index) => {
    if (isAnswered) return;

    setSelectedAnswer(index);
    setIsAnswered(true);

    if (answer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setQuizQuestions(shuffleArray(originalQuestions));
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowResult(false);
  };

  const getButtonClass = (index, option) => {
    if (!isAnswered) return 'optionButton';
    
    const isCorrect = option === quizQuestions[currentQuestion].correct;
    const isSelected = index === selectedAnswer;

    if (isCorrect) return 'optionButton correctAnswer';
    if (isSelected && !isCorrect) return 'optionButton wrongAnswer';
    return 'optionButton';
  };

  const progressPercentage = Math.round((currentQuestion / quizQuestions.length) * 100);
  const finalPercentage = Math.round((score / quizQuestions.length) * 100);

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (showResult && e.key === 'Enter') {
        handleRestart();
        return;
      }
      
      if (showResult) return;
      
      if (e.key >= '1' && e.key <= '4') {
        const idx = Number(e.key) - 1;
        if (idx < quizQuestions[currentQuestion].options.length && !isAnswered) {
          handleAnswerClick(quizQuestions[currentQuestion].options[idx], idx);
        }
      } else if (e.key === 'Enter' && isAnswered) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion, isAnswered, showResult]);

  return (
    <div className="pageWrapper">
      <main className="appContainer">
        <div className="headerSection">
          <div className="glowDot"></div>
          <div className="appTitle">Quick Quiz</div>
          <div className="spacer"></div>
          <div className="infoPill">Q{currentQuestion + 1} of {quizQuestions.length}</div>
          <div className="infoPill">Score: {score}</div>
        </div>

        <div className="progressSection">
          <div className="progressBar">
            <div 
              className="progressFill" 
              style={{ width: `${showResult ? 100 : progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="contentArea">
          {!showResult ? (
            <>
              <div className="questionCard">
                <div className="questionMeta">
                  <span>{quizQuestions[currentQuestion].category}</span>
                  <span>•</span>
                  <span className="difficultyText">{quizQuestions[currentQuestion].difficulty}</span>
                </div>
                <div className="questionText">
                  {quizQuestions[currentQuestion].question}
                </div>
                
                <div className="optionsGrid">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(option, index)}
                      disabled={isAnswered}
                      className={getButtonClass(index, option)}
                    >
                      <span className="optionNumber">{index + 1}</span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              {!isAnswered && (
                <div className="helpCard">
                  Tip: Use keyboard <kbd className="keyboardKey">1</kbd>
                  <kbd className="keyboardKey">2</kbd>
                  <kbd className="keyboardKey">3</kbd>
                  <kbd className="keyboardKey">4</kbd> to answer,
                  and <kbd className="keyboardKey">Enter</kbd> for Next.
                </div>
              )}
            </>
          ) : (
            <div className="resultSection">
              <div className="scoreRing" style={{ background: `conic-gradient(#7c3aed ${finalPercentage}%, rgba(255,255,255,.12) 0)` }}>
                <span className="percentageText">{finalPercentage}%</span>
              </div>
              <div className="finalScoreText">
                You scored {score} / {quizQuestions.length}
              </div>
              <div className="messageText">
                {finalPercentage === 100 ? "Perfect! 🔥"
                  : finalPercentage >= 70 ? "Great job! 💯"
                  : finalPercentage >= 40 ? "Not bad — keep practicing! 💪"
                  : "Try again. You've got this! ⭐"}
              </div>
              <div className="restartHint">
                Press <kbd className="keyboardKey">Enter</kbd> to restart
              </div>
            </div>
          )}
        </div>

        <div className="footerSection">
          <div className="feedbackText">
            {isAnswered && !showResult && (
              selectedAnswer !== null && quizQuestions[currentQuestion].options[selectedAnswer] === quizQuestions[currentQuestion].correct
                ? "✅ Correct!"
                : "❌ Wrong. The correct answer is highlighted."
            )}
          </div>
          <div>
            {!showResult ? (
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="actionButton"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleRestart}
                className="actionButton"
              >
                Restart
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizApp;