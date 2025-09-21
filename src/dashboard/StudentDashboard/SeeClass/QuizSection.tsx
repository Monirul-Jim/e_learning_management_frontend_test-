
// import { useState } from "react";
// import {type Quiz } from "./SeeClass";

// interface QuizSectionProps {
//   data: Quiz[];
//   onBack: () => void;
// }

// const QuizSection: React.FC<QuizSectionProps> = ({ data, onBack }) => {
//   const [selectedAnswers, setSelectedAnswers] = useState<{
//     [key: number]: string;
//   }>({});
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState<number | null>(null);

//   const currentQuestion = data[currentQuestionIndex];

//   const handleOptionChange = (questionId: number, selected: string) => {
//     setSelectedAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: selected,
//     }));
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < data.length - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   const handleSubmit = () => {
//     let calculatedScore = 0;

//     data.forEach((question) => {
//       console.log("Correct Answer Key:", question.questions.correctAnswer);
//       console.log("Options Array:", question.questions.options);

//       const correctAnswerIndex =
//         question.questions.correctAnswer.charCodeAt(0) - "a".charCodeAt(0);

//       const correctOption =
//         question.questions.options[correctAnswerIndex]?.text;

//       console.log("Correct Option Text:", correctOption);

//       if (selectedAnswers[question.id] === correctOption) {
//         calculatedScore += 1;
//       }
//     });

//     setScore(calculatedScore);
//     console.log("Quiz submitted", selectedAnswers, `Score: ${calculatedScore}`);
//   };

//   return (
//     <div>
//       <button
//         onClick={onBack}
//         className="bg-gray-500 text-white py-2 px-4 rounded-md mb-4"
//       >
//         Back to Video
//       </button>

//       {score === null ? (
//         <>
//           <div key={currentQuestion.id}>
//             <h3 className="text-lg font-semibold">
//               {currentQuestionIndex + 1}. {currentQuestion?.title}
//             </h3>

//             <ul>
//               {currentQuestion.questions.options.map((option, index) => (
//                 <li key={index} className="py-2">
//                   <label
//                     className={`flex items-center cursor-pointer p-2 rounded-lg ${
//                       selectedAnswers[currentQuestion.id] === option.text
//                         ? "bg-blue-500 text-white"
//                         : "bg-white text-gray-800 hover:bg-blue-100"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name={`quiz-${currentQuestion.id}`}
//                       value={option.text}
//                       checked={
//                         selectedAnswers[currentQuestion.id] === option.text
//                       }
//                       onChange={() =>
//                         handleOptionChange(currentQuestion.id, option.text)
//                       }
//                       className="mr-2"
//                     />
//                     {option.text}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-4">
//             {/* Show Previous Button if not on the first question */}
//             {currentQuestionIndex > 0 && (
//               <button
//                 onClick={handlePrevious}
//                 className="px-4 py-2 rounded-lg bg-blue-500 text-white"
//               >
//                 Previous
//               </button>
//             )}

//             {/* Show Next Button when not on the last question */}
//             {currentQuestionIndex < data.length - 1 && (
//               <button
//                 onClick={handleNext}
//                 disabled={!selectedAnswers[currentQuestion.id]} // Disable if no option is selected
//                 className={`px-4 py-2 rounded-lg ${
//                   !selectedAnswers[currentQuestion.id]
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-500 text-white"
//                 }`}
//               >
//                 Next
//               </button>
//             )}

//             {/* Show Submit Button only on the last question */}
//             {currentQuestionIndex === data.length - 1 && (
//               <button
//                 onClick={handleSubmit}
//                 disabled={!selectedAnswers[currentQuestion.id]} // Disable if no option is selected
//                 className={`px-4 py-2 rounded-lg ${
//                   !selectedAnswers[currentQuestion.id]
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-green-500 text-white"
//                 }`}
//               >
//                 Submit
//               </button>
//             )}
//           </div>
//         </>
//       ) : (
//         <div>
//           <h3 className="text-lg font-bold">Quiz Completed!</h3>
//           <p className="text-md">
//             Your Score: {score} / {data.length}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizSection;

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw,
  Trophy,
  Target
} from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import { Button } from '../../../components/ui/button';

export interface Quiz {
  id: number;
  module: number;
  module_title: string;
  title: string;
  questions: {
    options: { text: string }[];
    correctAnswer: string;
  };
}

interface QuizSectionProps {
  data: Quiz[];
  onBack: () => void;
}

export function QuizSection({ data, onBack }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuiz = data[currentQuestionIndex];
  const totalQuestions = data.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    data.forEach((quiz, index) => {
      if (selectedAnswers[index] === quiz.questions.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100)
    };
  };

  const score = showResults ? calculateScore() : { correct: 0, total: 0, percentage: 0 };

  if (showResults) {
    const isPassed = score.percentage >= 70;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Results Header */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              {isPassed ? (
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="h-10 w-10 text-green-500" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-10 w-10 text-orange-500" />
                </div>
              )}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl font-bold mb-2"
            >
              {isPassed ? 'Congratulations!' : 'Quiz Complete!'}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-muted-foreground mb-6"
            >
              {isPassed 
                ? 'You passed the quiz! Great job on your learning progress.'
                : 'You completed the quiz. Review the questions and try again to improve your score.'
              }
            </motion.p>

            {/* Score Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{score.correct}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">{score.total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${isPassed ? 'text-green-500' : 'text-orange-500'}`}>
                  {score.percentage}%
                </div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={handleRetakeQuiz}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Retake Quiz
              </Button>
              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Course
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Quiz Review
            </h3>
            <div className="space-y-4">
              {data.map((quiz, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === quiz.questions.correctAnswer;
                
                return (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      isCorrect 
                        ? 'bg-green-500/5 border-green-500/20' 
                        : 'bg-red-500/5 border-red-500/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-2">
                          Question {index + 1}: {quiz.title}
                        </h4>
                        <div className="text-sm space-y-1">
                          <p className="text-muted-foreground">
                            Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{userAnswer}</span>
                          </p>
                          {!isCorrect && (
                            <p className="text-muted-foreground">
                              Correct answer: <span className="text-green-600">{quiz.questions.correctAnswer}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Quiz Header */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Quiz Time!</h2>
                <p className="text-sm text-muted-foreground">{currentQuiz?.module_title}</p>
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary">
              {currentQuestionIndex + 1} of {totalQuestions}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-primary font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              {currentQuiz?.title}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {currentQuiz?.questions.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(option.text)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                    selectedAnswers[currentQuestionIndex] === option.text
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-muted/5 border-border/50 text-foreground hover:bg-muted/10 hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestionIndex] === option.text
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}>
                      {selectedAnswers[currentQuestionIndex] === option.text && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                      )}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <Button
                onClick={onBack}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                Back to Course
              </Button>

              <Button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestionIndex]}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 flex items-center gap-2"
              >
                {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}