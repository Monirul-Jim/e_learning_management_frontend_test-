
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Briefcase, GraduationCap,} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog';

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

export function HiredStudents() {
  const images: Image[] = [
    {
      src: "https://media.istockphoto.com/id/2135466578/photo/male-college-students-are-working-on-laptops-and-searching-for-books-to-study-make-reports.jpg?s=2048x2048&w=is&k=20&c=y3k0VvTIP0gvtDV_xnYqiC0oD8BpAv1GK0EVpjj-VrA=",
      alt: "Image 1",
      company: "Google",
      position: "Software Developer",
      course: "Computer Science",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1663051241451-709fa4de55bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Image 2",
      company: "Microsoft",
      position: "Data Analyst",
      course: "Statistics",
    },
    {
      src: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Image 3",
      company: "Apple",
      position: "Python Developer",
      course: "Full Stack Development With Python",
    },
    {
      src: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 4",
      company: "Amazon",
      position: "Django Developer",
      course: "Backend Development",
    },
    {
      src: "https://images.unsplash.com/photo-1473492201326-7c01dd2e596b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 5",
      company: "Meta",
      position: "Game Developer",
      course: "Game Development with C#",
    },
    {
      src: "https://images.unsplash.com/photo-1598981457915-aea220950616?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 6",
      company: "Tesla",
      position: "Software Engineer",
      course: "Computer Science Fundamentals",
    },
    {
      src: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 7",
      company: "Netflix",
      position: "Frontend Developer",
      course: "Web Development with React",
    },
    {
      src: "https://media.istockphoto.com/id/1691437841/photo/african-american-student-wearing-eyeglasses-holding-finger-near-face-looking-for-creative.webp?a=1&b=1&s=612x612&w=0&k=20&c=GWcZNpUbK6qyfH1rvKlSSE8rxx5LEMC6Ni8UYR2z3ec=",
      alt: "Image 8",
      company: "Spotify",
      position: "Data Scientist",
      course: "Data Science with Python",
    },
    {
      src: "https://media.istockphoto.com/id/1479824277/photo/young-university-student-using-mobile-phone-on-stairs-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=Q7OQ1lQp2g2Wq8t6ZNvNCNmEB4HDB6UoNh5pY-IfghU=",
      alt: "Image 9",
      company: "Uber",
      position: "Game Developer",
      course: "Game Development with C#",
    },
    {
      src: "https://media.istockphoto.com/id/1318876406/photo/portrait-of-happy-casual-asian-girl-student-with-backpack-and-laptop-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=tJNoqlzTsTtlvBBuT6GhADqeoxm81DENjcKJti2pWGg=",
      alt: "Image 10",
      company: "Airbnb",
      position: "Mobile Developer",
      course: "Mobile App Development with React Native",
    },
    {
      src: "https://images.unsplash.com/photo-1598981457915-aea220950616?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 11",
      company: "Slack",
      position: "Backend Developer",
      course: "Backend Development with Node.js",
    },
    {
      src: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 12",
      company: "Shopify",
      position: "Full Stack Developer",
      course: "Full Stack Web Development with MERN",
    },
    {
      src: "https://media.istockphoto.com/id/1691437841/photo/african-american-student-wearing-eyeglasses-holding-finger-near-face-looking-for-creative.webp?a=1&b=1&s=612x612&w=0&k=20&c=GWcZNpUbK6qyfH1rvKlSSE8rxx5LEMC6Ni8UYR2z3ec=",
      alt: "Image 13",
      company: "DocuSign",
      position: "Cloud Engineer",
      course: "Cloud Computing with AWS",
    },
    {
      src: "https://media.istockphoto.com/id/2135466578/photo/male-college-students-are-working-on-laptops-and-searching-for-books-to-study-make-reports.jpg?s=2048x2048&w=is&k=20&c=y3k0VvTIP0gvtDV_xnYqiC0oD8BpAv1GK0EVpjj-VrA=",
      alt: "Image 14",
      company: "Zoom",
      position: "Data Analyst",
      course: "Data Analysis with Excel",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1663051241451-709fa4de55bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Image 15",
      company: "Adobe",
      position: "Cybersecurity Specialist",
      course: "Cybersecurity with Python",
    },
    {
      src: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Image 15",
      company: "Coinbase",
      position: "Blockchain Developer",
      course: "Blockchain Development with Solidity",
    },
    {
      src: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 16",
      company: "OpenAI",
      position: "AI Engineer",
      course: "AI and Machine Learning with TensorFlow",
    },
    {
      src: "https://images.unsplash.com/photo-1473492201326-7c01dd2e596b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 17",
      company: "GitHub",
      position: "DevOps Engineer",
      course: "DevOps with Jenkins",
    },
    {
      src: "https://images.unsplash.com/photo-1598981457915-aea220950616?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 18",
      company: "Stripe",
      position: "Product Manager",
      course: "Product Management Fundamentals",
    },
    {
      src: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 19",
      company: "Figma",
      position: "Product Designer",
      course: "Product Design with Adobe XD",
    },
    {
      src: "https://media.istockphoto.com/id/1691437841/photo/african-american-student-wearing-eyeglasses-holding-finger-near-face-looking-for-creative.webp?a=1&b=1&s=612x612&w=0&k=20&c=GWcZNpUbK6qyfH1rvKlSSE8rxx5LEMC6Ni8UYR2z3ec=",
      alt: "Image 20",
      company: "Discord",
      position: "Software Developer",
      course: "Software Engineering with Java",
    },
    {
      src: "https://media.istockphoto.com/id/1479824277/photo/young-university-student-using-mobile-phone-on-stairs-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=Q7OQ1lQp2g2Wq8t6ZNvNCNmEB4HDB6UoNh5pY-IfghU=",
      alt: "Image 21",
      company: "Twitch",
      position: "Systems Analyst",
      course: "Systems Analysis and Design",
    },
    {
      src: "https://media.istockphoto.com/id/1318876406/photo/portrait-of-happy-casual-asian-girl-student-with-backpack-and-laptop-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=tJNoqlzTsTtlvBBuT6GhADqeoxm81DENjcKJti2pWGg=",
      alt: "Image 22",
      company: "Reddit",
      position: "Web Developer",
      course: "Web Development with Django",
    },
    {
      src: "https://images.unsplash.com/photo-1598981457915-aea220950616?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 23",
      company: "Pinterest",
      position: "Frontend Developer",
      course: "Frontend Development with Angular",
    },
    {
      src: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbmdsZSUyMHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      alt: "Image 24",
      company: "Dropbox",
      position: "DevOps Engineer",
      course: "Cloud Infrastructure and Automation",
    },
    {
      src: "https://media.istockphoto.com/id/1691437841/photo/african-american-student-wearing-eyeglasses-holding-finger-near-face-looking-for-creative.webp?a=1&b=1&s=612x612&w=0&k=20&c=GWcZNpUbK6qyfH1rvKlSSE8rxx5LEMC6Ni8UYR2z3ec=",
      alt: "Image 25",
      company: "NVIDIA",
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

  const handleImageClick = (company: string, position: string, course: string) => {
    setModalContent({ company, position, course });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const nextSlide = () => {
    setScrollIndex((prev) => (prev + 1) % Math.max(1, images.length - 11));
  };

  const prevSlide = () => {
    setScrollIndex((prev) => (prev - 1 + Math.max(1, images.length - 11)) % Math.max(1, images.length - 11));
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background"></div>
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Heroes in <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Top Companies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our successful graduates who transformed their careers and landed their dream jobs 
            at world's leading tech companies.
          </p>
        </motion.div>

        {/* Success Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: 'Students Hired', value: '10,000+', icon: '👥' },
            { label: 'Average Salary', value: '$120K', icon: '💰' },
            { label: 'Partner Companies', value: '500+', icon: '🏢' },
            { label: 'Success Rate', value: '94%', icon: '📈' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="overflow-hidden rounded-3xl bg-card/20 backdrop-blur-sm border border-border/50 p-8"
          >
            {/* Carousel Inner */}
            <div
              className="grid grid-rows-2 grid-flow-col gap-6 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${scrollIndex * 12}%)`,
              }}
            >
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleImageClick(image.company, image.position, image.course)}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="rounded-full w-full h-full object-cover border-4 border-primary/20 shadow-lg group-hover:border-primary/40 transition-all duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent text-center p-2 rounded-b-full">
                    <div className="text-xs md:text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {image.company}
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-primary font-semibold text-xs md:text-sm text-center">
                      Click to view
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:bg-primary/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Progress Dots */}
            <div className="flex gap-2">
              {Array.from({ length: Math.max(1, images.length - 11) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setScrollIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === scrollIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:bg-primary/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Student Details Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-md bg-card/95 backdrop-blur-sm border-border/50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary mb-2">
                {modalContent.company}
              </DialogTitle>
              <DialogDescription className="text-base">
                Success Story Details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Briefcase className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Position</h4>
                  <p className="text-muted-foreground">{modalContent.position}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                <GraduationCap className="h-5 w-5 text-secondary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Course Completed</h4>
                  <p className="text-muted-foreground">{modalContent.course}</p>
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border/50">
                <div className="text-2xl mb-2">🎉</div>
                <p className="text-sm text-muted-foreground">
                  Another success story from our TechFest community! Ready to start your journey?
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}