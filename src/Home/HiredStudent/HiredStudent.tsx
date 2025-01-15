import { useState } from "react";
interface Image {
  src: string;
  alt: string;
  company: string;
  position: string;
  course: string;
}
interface ModalContent {
  company: string;
  position: string;
  course: string;
}
const HiredStudent = () => {
  const images: Image[] = [
    {
      src: "https://media.istockphoto.com/id/2135466578/photo/male-college-students-are-working-on-laptops-and-searching-for-books-to-study-make-reports.jpg?s=2048x2048&w=is&k=20&c=y3k0VvTIP0gvtDV_xnYqiC0oD8BpAv1GK0EVpjj-VrA=",
      alt: "Image 1",
      company: "Company A",
      position: "Software Developer",
      course: "Computer Science",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1663051241451-709fa4de55bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Image 2",
      company: "Company B",
      position: "Data Analyst",
      course: "Statistics",
    },
    {
      src: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Image 3",
      company: "Company C",
      position: "Python Developer",
      course: "Full Stack Development With Python",
    },
    {
      src: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 4",
      company: "Company D",
      position: "Django Developer",
      course: "Backend Development",
    },
    {
      src: "https://images.unsplash.com/photo-1473492201326-7c01dd2e596b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 5",
      company: "Company E",
      position: "Game Developer",
      course: "Game Development with C#",
    },
    {
      src: "https://images.unsplash.com/photo-1598981457915-aea220950616?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 6",
      company: "Company A",
      position: "Software Engineer",
      course: "Computer Science Fundamentals",
    },
    {
      src: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 7",
      company: "Company B",
      position: "Frontend Developer",
      course: "Web Development with React",
    },
    {
      src: "https://media.istockphoto.com/id/1691437841/photo/african-american-student-wearing-eyeglasses-holding-finger-near-face-looking-for-creative.webp?a=1&b=1&s=612x612&w=0&k=20&c=GWcZNpUbK6qyfH1rvKlSSE8rxx5LEMC6Ni8UYR2z3ec=",
      alt: "Image 8",
      company: "Company C",
      position: "Data Scientist",
      course: "Data Science with Python",
    },
    {
      src: "https://media.istockphoto.com/id/1479824277/photo/young-university-student-using-mobile-phone-on-stairs-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=Q7OQ1lQp2g2Wq8t6ZNvNCNmEB4HDB6UoNh5pY-IfghU=",
      alt: "Image 9",
      company: "Company E",
      position: "Game Developer",
      course: "Game Development with C#",
    },
    {
      src: "https://media.istockphoto.com/id/1318876406/photo/portrait-of-happy-casual-asian-girl-student-with-backpack-and-laptop-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=tJNoqlzTsTtlvBBuT6GhADqeoxm81DENjcKJti2pWGg=",
      alt: "Image 10",
      company: "Company F",
      position: "Mobile Developer",
      course: "Mobile App Development with React Native",
    },
    {
      src: "https://images.unsplash.com/photo-1598981457915-aea220950616?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 11",
      company: "Company G",
      position: "Backend Developer",
      course: "Backend Development with Node.js",
    },
    {
      src: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 12",
      company: "Company H",
      position: "Full Stack Developer",
      course: "Full Stack Web Development with MERN",
    },
    {
      src: "https://media.istockphoto.com/id/1691437841/photo/african-american-student-wearing-eyeglasses-holding-finger-near-face-looking-for-creative.webp?a=1&b=1&s=612x612&w=0&k=20&c=GWcZNpUbK6qyfH1rvKlSSE8rxx5LEMC6Ni8UYR2z3ec=",
      alt: "Image 13",
      company: "Company I",
      position: "Cloud Engineer",
      course: "Cloud Computing with AWS",
    },
    {
      src: "https://media.istockphoto.com/id/2135466578/photo/male-college-students-are-working-on-laptops-and-searching-for-books-to-study-make-reports.jpg?s=2048x2048&w=is&k=20&c=y3k0VvTIP0gvtDV_xnYqiC0oD8BpAv1GK0EVpjj-VrA=",
      alt: "Image 14",
      company: "Company J",
      position: "Data Analyst",
      course: "Data Analysis with Excel",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1663051241451-709fa4de55bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Image 15",
      company: "Company K",
      position: "Cybersecurity Specialist",
      course: "Cybersecurity with Python",
    },
    {
      src: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Image 15",
      company: "Company L",
      position: "Blockchain Developer",
      course: "Blockchain Development with Solidity",
    },
    {
      src: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 16",
      company: "Company M",
      position: "AI Engineer",
      course: "AI and Machine Learning with TensorFlow",
    },
    {
      src: "https://images.unsplash.com/photo-1473492201326-7c01dd2e596b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 17",
      company: "Company N",
      position: "DevOps Engineer",
      course: "DevOps with Jenkins",
    },
    {
      src: "https://images.unsplash.com/photo-1598981457915-aea220950616?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 18",
      company: "Company O",
      position: "Product Manager",
      course: "Product Management Fundamentals",
    },
    {
      src: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 19",
      company: "Company P",
      position: "Product Designer",
      course: "Product Design with Adobe XD",
    },
    {
      src: "https://media.istockphoto.com/id/1691437841/photo/african-american-student-wearing-eyeglasses-holding-finger-near-face-looking-for-creative.webp?a=1&b=1&s=612x612&w=0&k=20&c=GWcZNpUbK6qyfH1rvKlSSE8rxx5LEMC6Ni8UYR2z3ec=",
      alt: "Image 20",
      company: "Company Q",
      position: "Software Developer",
      course: "Software Engineering with Java",
    },
    {
      src: "https://media.istockphoto.com/id/1479824277/photo/young-university-student-using-mobile-phone-on-stairs-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=Q7OQ1lQp2g2Wq8t6ZNvNCNmEB4HDB6UoNh5pY-IfghU=",
      alt: "Image 21",
      company: "Company R",
      position: "Systems Analyst",
      course: "Systems Analysis and Design",
    },
    {
      src: "https://media.istockphoto.com/id/1318876406/photo/portrait-of-happy-casual-asian-girl-student-with-backpack-and-laptop-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=tJNoqlzTsTtlvBBuT6GhADqeoxm81DENjcKJti2pWGg=",
      alt: "Image 22",
      company: "Company S",
      position: "Web Developer",
      course: "Web Development with Django",
    },
    {
      src: "https://images.unsplash.com/photo-1598981457915-aea220950616?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 23",
      company: "Company T",
      position: "Frontend Developer",
      course: "Frontend Development with Angular",
    },
    {
      src: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 24",
      company: "Company U",
      position: "DevOps Engineer",
      course: "Cloud Infrastructure and Automation",
    },
    {
      src: "https://media.istockphoto.com/id/1691437841/photo/african-american-student-wearing-eyeglasses-holding-finger-near-face-looking-for-creative.webp?a=1&b=1&s=612x612&w=0&k=20&c=GWcZNpUbK6qyfH1rvKlSSE8rxx5LEMC6Ni8UYR2z3ec=",
      alt: "Image 25",
      company: "Company V",
      position: "AI Researcher",
      course: "Artificial Intelligence with Deep Learning",
    },
  ];

  const [scrollIndex, setScrollIndex] = useState(0);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    company: "",
    position: "",
    course: "",
  });

  const handleImageClick = (
    company: string,
    position: string,
    course: string
  ) => {
    setModalContent({ company, position, course });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="relative w-full mx-auto overflow-hidden p-4 rounded-lg mt-10 mb-8">
      <h1 className="text-2xl text-center font-semibold mb-8">
        Our Heroes In Top Company
      </h1>
      {/* Carousel Inner */}
      <div
        className="grid grid-rows-2 grid-flow-col gap-4 transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${scrollIndex * 10}%)`, // Smoothly move images
        }}
      >
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className={`relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transition-all duration-300 cursor-pointer`}
              onClick={() =>
                handleImageClick(image.company, image.position, image.course)
              }
            >
              <img
                src={image.src}
                alt={image.alt}
                className="rounded-full w-full h-full object-cover border-4 border-gray-700 shadow-lg "
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center p-1 rounded-lg">
                {image.company}
              </div>
            </div>
          );
        })}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold">{modalContent.company}</h2>
            <p className="mt-2">Position: {modalContent.position}</p>
            <p className="mt-2">Course: {modalContent.course}</p>
            <button
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-full"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        onClick={() =>
          setScrollIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
        }
      >
        &#8592;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        onClick={() => setScrollIndex((prev) => (prev + 1) % images.length)}
      >
        &#8594;
      </button>
    </div>
  );
};

export default HiredStudent;
