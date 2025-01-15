const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        {/* Left Column - Text */}
        <div className="lg:w-1/2 lg:mr-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Our e-learning platform offers a comprehensive and engaging learning
            experience. Whether you're looking to enhance your skills or dive
            into new subjects, we have a variety of video courses designed by
            experts to help you succeed.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li className="mb-2">
              High-quality video tutorials from industry experts
            </li>
            <li className="mb-2">Interactive quizzes to test your knowledge</li>
            <li className="mb-2">
              Flexible learning schedule to suit your pace
            </li>
            <li className="mb-2">
              Access to a wide range of courses on various topics
            </li>
          </ul>
        </div>

        {/* Right Column - Images */}
        <div className="lg:w-1/2 ">
          {/* First image */}
          <div className="w-full mb-8">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ANZYFpADlz4?si=V5T0vKpG6P9h-gKQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
