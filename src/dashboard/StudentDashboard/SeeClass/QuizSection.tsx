// import { useState } from "react";
// import { Quiz } from "./SeeClass";

// interface QuizSectionProps {
//   data: Quiz[];
//   onBack: () => void;
// }

// const QuizSection: React.FC<QuizSectionProps> = ({ data, onBack }) => {
//   const [selectedAnswers, setSelectedAnswers] = useState<{
//     [key: number]: string;
//   }>({});

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   const currentQuestion = data[currentQuestionIndex];

//   // Handle selecting an answer
//   const handleOptionChange = (questionId: number, selected: string) => {
//     setSelectedAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: selected,
//     }));
//   };

//   // Handle navigating to the next question
//   const handleNext = () => {
//     if (currentQuestionIndex < data.length - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   // Handle navigating to the previous question
//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   // Handle submission of the quiz
//   const handleSubmit = () => {
//     console.log("Quiz submitted", selectedAnswers);
//   };

//   return (
//     <div>
//       <button
//         onClick={onBack}
//         className="bg-gray-500 text-white py-2 px-4 rounded-md mb-4"
//       >
//         Back to Video
//       </button>

//       <div key={currentQuestion.id}>
//         <h3 className="text-lg font-semibold">
//           {currentQuestionIndex + 1}. {currentQuestion?.title}
//         </h3>

//         <ul>
//           {currentQuestion.questions.options.map((option, index) => (
//             <li key={index} className="py-2">
//               <label
//                 className={`flex items-center cursor-pointer p-2 rounded-lg ${
//                   selectedAnswers[currentQuestion.id] === option.text
//                     ? "bg-blue-500 text-white"
//                     : "bg-white text-gray-800 hover:bg-blue-100"
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name={`quiz-${currentQuestion.id}`}
//                   value={option.text}
//                   checked={selectedAnswers[currentQuestion.id] === option.text}
//                   onChange={() =>
//                     handleOptionChange(currentQuestion.id, option.text)
//                   }
//                   className="mr-2"
//                 />
//                 {option.text}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-between mt-4">
//         {/* Show Previous Button if not on the first question */}
//         {currentQuestionIndex > 0 && (
//           <button
//             onClick={handlePrevious}
//             disabled={!selectedAnswers[currentQuestion.id]}
//             className={`px-4 py-2 rounded-lg ${
//               !selectedAnswers[currentQuestion.id]
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-blue-500 text-white"
//             }`}
//           >
//             Previous
//           </button>
//         )}

//         {/* Show Next Button when not on the last question */}
//         {currentQuestionIndex < data.length - 1 && (
//           <button
//             onClick={handleNext}
//             disabled={!selectedAnswers[currentQuestion.id]} // Disable if no option is selected
//             className={`px-4 py-2 rounded-lg ${
//               !selectedAnswers[currentQuestion.id]
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-blue-500 text-white"
//             }`}
//           >
//             Next
//           </button>
//         )}

//         {/* Show Submit Button only on the last question */}
//         {currentQuestionIndex === data.length - 1 && (
//           <button
//             onClick={handleSubmit}
//             disabled={!selectedAnswers[currentQuestion.id]} // Disable if no option is selected
//             className={`px-4 py-2 rounded-lg ${
//               !selectedAnswers[currentQuestion.id]
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-green-500 text-white"
//             }`}
//           >
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizSection;

import { useState } from "react";
import { Quiz } from "./SeeClass";

interface QuizSectionProps {
  data: Quiz[];
  onBack: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ data, onBack }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null); // Track the score

  const currentQuestion = data[currentQuestionIndex];

  // Handle selecting an answer
  const handleOptionChange = (questionId: number, selected: string) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selected,
    }));
  };

  // Handle navigating to the next question
  const handleNext = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Handle navigating to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Handle submission of the quiz
  const handleSubmit = () => {
    let calculatedScore = 0;

    data.forEach((question) => {
      console.log("Correct Answer Key:", question.questions.correctAnswer);
      console.log("Options Array:", question.questions.options);

      // Convert correctAnswer (e.g., "b") to its corresponding index (e.g., 1)
      const correctAnswerIndex =
        question.questions.correctAnswer.charCodeAt(0) - "a".charCodeAt(0);

      // Get the correct option's text
      const correctOption =
        question.questions.options[correctAnswerIndex]?.text;

      console.log("Correct Option Text:", correctOption);

      // Compare the selected answer with the correct option's text
      if (selectedAnswers[question.id] === correctOption) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore); // Update the score
    console.log("Quiz submitted", selectedAnswers, `Score: ${calculatedScore}`);
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="bg-gray-500 text-white py-2 px-4 rounded-md mb-4"
      >
        Back to Video
      </button>

      {score === null ? (
        <>
          <div key={currentQuestion.id}>
            <h3 className="text-lg font-semibold">
              {currentQuestionIndex + 1}. {currentQuestion?.title}
            </h3>

            <ul>
              {currentQuestion.questions.options.map((option, index) => (
                <li key={index} className="py-2">
                  <label
                    className={`flex items-center cursor-pointer p-2 rounded-lg ${
                      selectedAnswers[currentQuestion.id] === option.text
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 hover:bg-blue-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`quiz-${currentQuestion.id}`}
                      value={option.text}
                      checked={
                        selectedAnswers[currentQuestion.id] === option.text
                      }
                      onChange={() =>
                        handleOptionChange(currentQuestion.id, option.text)
                      }
                      className="mr-2"
                    />
                    {option.text}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            {/* Show Previous Button if not on the first question */}
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white"
              >
                Previous
              </button>
            )}

            {/* Show Next Button when not on the last question */}
            {currentQuestionIndex < data.length - 1 && (
              <button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestion.id]} // Disable if no option is selected
                className={`px-4 py-2 rounded-lg ${
                  !selectedAnswers[currentQuestion.id]
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                Next
              </button>
            )}

            {/* Show Submit Button only on the last question */}
            {currentQuestionIndex === data.length - 1 && (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswers[currentQuestion.id]} // Disable if no option is selected
                className={`px-4 py-2 rounded-lg ${
                  !selectedAnswers[currentQuestion.id]
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white"
                }`}
              >
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <div>
          <h3 className="text-lg font-bold">Quiz Completed!</h3>
          <p className="text-md">
            Your Score: {score} / {data.length}
          </p>
          <button
            onClick={onBack}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
          >
            Back to Video
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizSection;
