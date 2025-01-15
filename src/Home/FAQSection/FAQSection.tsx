import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {/* Question 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(0)}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                What is this platform about?
              </h3>
              <button className="text-gray-600 text-lg">
                {openIndex === 0 ? "-" : "+"}
              </button>
            </div>
            {openIndex === 0 && (
              <p className="mt-4 text-start text-gray-600">
                This is an e-learning platform where you can purchase and watch
                high-quality video courses, complete quizzes, and track your
                learning progress.
              </p>
            )}
          </div>

          {/* Question 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(1)}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                How can I purchase a course?
              </h3>
              <button className="text-gray-600 text-lg">
                {openIndex === 1 ? "-" : "+"}
              </button>
            </div>
            {openIndex === 1 && (
              <p className="mt-4 text-start text-gray-600">
                You can purchase a course directly on our website by selecting
                the course you're interested in and following the checkout
                process.
              </p>
            )}
          </div>

          {/* Question 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(2)}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                Can I get a certificate after completing a course?
              </h3>
              <button className="text-gray-600 text-lg">
                {openIndex === 2 ? "-" : "+"}
              </button>
            </div>
            {openIndex === 2 && (
              <p className="mt-4 text-start text-gray-600">
                Yes, after completing a course, you will receive a certificate
                that you can download or share on your professional profiles.
              </p>
            )}
          </div>

          {/* Question 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(3)}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                How can I track my progress?
              </h3>
              <button className="text-gray-600 text-lg">
                {openIndex === 3 ? "-" : "+"}
              </button>
            </div>
            {openIndex === 3 && (
              <p className="mt-4 text-start text-gray-600">
                You can track your progress through the course dashboard, where
                you can see the videos you've watched and the quizzes you've
                completed.
              </p>
            )}
          </div>

          {/* Question 5 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(4)}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                What if I have questions about the course?
              </h3>
              <button className="text-gray-600 text-lg">
                {openIndex === 4 ? "-" : "+"}
              </button>
            </div>
            {openIndex === 4 && (
              <p className="mt-4 text-start text-gray-600">
                If you have questions, you can reach out to the instructor
                through the platform's messaging system or join the community
                discussion.
              </p>
            )}
          </div>

          {/* Question 6 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(5)}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                Can I access courses on mobile devices?
              </h3>
              <button className="text-gray-600 text-lg">
                {openIndex === 5 ? "-" : "+"}
              </button>
            </div>
            {openIndex === 5 && (
              <p className="mt-4 text-start text-gray-600">
                Yes, our platform is fully responsive, and you can access
                courses and quizzes on both mobile devices and tablets.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
