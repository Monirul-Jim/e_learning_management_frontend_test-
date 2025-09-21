import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { BookOpen, Award, Users, ShoppingCart, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/button";

const features = [
  {
    icon: ShoppingCart,
    title: "Purchase Courses",
    description: "Explore our curated catalog and select courses tailored to your career goals and interests.",
    color: "from-blue-500 to-blue-600",
    step: "01"
  },
  {
    icon: BookOpen,
    title: "Watch & Learn",
    description: "Access high-quality, on-demand video lessons created by industry experts and professionals.",
    color: "from-green-500 to-green-600",
    step: "02"
  },
  {
    icon: Users,
    title: "Practice & Apply",
    description: "Reinforce your learning with interactive quizzes, hands-on projects, and real-world applications.",
    color: "from-purple-500 to-purple-600",
    step: "03"
  },
  {
    icon: Award,
    title: "Get Certified",
    description: "Receive industry-recognized certificates and showcase your achievements to potential employers.",
    color: "from-orange-500 to-orange-600",
    step: "04"
  }
];

const stats = [
  { number: "50K+", label: "Active Students", description: "Learning and growing every day" },
  { number: "500+", label: "Expert Courses", description: "Across various tech domains" },
  { number: "10K+", label: "Graduates Hired", description: "In top tech companies worldwide" },
  { number: "94%", label: "Success Rate", description: "Students achieving their goals" }
];

export function AboutSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">TechFest</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Welcome to <span className="font-semibold text-primary">TechFest</span>, your ultimate destination for premium online education. 
            Empower yourself with cutting-edge knowledge through our interactive and engaging tech courses designed by industry experts.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="text-center group cursor-pointer"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 p-6">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start your learning journey in just four simple steps and transform your career with our comprehensive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -12 }}
                className="group relative"
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 h-full overflow-hidden">
                  <CardContent className="p-6 relative">
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors duration-300">
                      {feature.step}
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                      <feature.icon size={32} className="text-white" />
                    </div>

                    {/* Content */}
                    <h4 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed relative z-10">
                      {feature.description}
                    </p>

                    {/* Arrow for connection (hidden on last item) */}
                    {index < features.length - 1 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-20">
                        <ArrowRight className="h-6 w-6 text-primary/30" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center">
              <TrendingUp className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                At TechFest, we believe that quality education should be accessible to everyone, everywhere. 
                Our mission is to democratize learning by providing world-class tech education that empowers 
                individuals to achieve their career goals and drive innovation in the digital world.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {["🌟 Excellence", "🚀 Innovation", "🤝 Community", "💡 Growth"].map((value, index) => (
                  <motion.span
                    key={value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="bg-primary/20 text-primary px-4 py-2 rounded-full font-medium"
                  >
                    {value}
                  </motion.span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 border border-primary/20">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of successful learners who have transformed their careers with TechFest. 
              Your future in tech starts today.
            </p>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-4 shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300"
              asChild
            >
              <a href="#courses">
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
// export function About() {
//   const values = [
//     {
//       icon: BookOpen,
//       title: "Interactive Courses",
//       description: "Engage with dynamic, hands-on lessons designed for effective learning."
//     },
//     {
//       icon: Video,
//       title: "Video Lessons",
//       description: "High-quality video content to help you learn at your own pace."
//     },
//     {
//       icon: ClipboardCheck,
//       title: "Quizzes & Assessments",
//       description: "Test your knowledge and reinforce your learning effectively."
//     },
//     {
//       icon: Award,
//       title: "Certificates",
//       description: "Earn certificates after completing courses to showcase your skills."
//     },
//     {
//       icon: Users,
//       title: "Expert Tutors",
//       description: "Learn from experienced instructors with real-world expertise."
//     },
//     {
//       icon: Globe,
//       title: "Learn Anywhere",
//       description: "Access courses from desktop, tablet, or mobile anytime."
//     }
//   ];

//   const stats = [
//     { number: "2025", label: "Founded" },
//     { number: "100+", label: "Courses" },
//     { number: "50+", label: "Tutors" },
//     { number: "10k+", label: "Students" }
//   ];

//   const techStack = [
//     "React", "Next.js", "TypeScript", "Node.js", "Python", 
//     "Flutter", "React Native", "Docker", "AWS", "Firebase", 
//     "MongoDB", "PostgreSQL", "Tailwind CSS", "Figma"
//   ];

//   return (
//     <section id="about" className="py-24 bg-gradient-to-b from-accent/10 to-background">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
//             About <span className="text-primary">Our LMS</span>
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
//             Our e-learning platform empowers learners worldwide with interactive courses, expert tutors, and practical skills. Learn at your pace and achieve your goals efficiently.
//           </p>
//         </motion.div>

//         {/* Story & Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="grid lg:grid-cols-2 gap-12 items-center mb-20"
//         >
//           <div>
//             <h3 className="text-2xl font-bold mb-6">Our Story</h3>
//             <div className="space-y-4 text-muted-foreground">
//               <p>
//                 Founded with a mission to make quality education accessible, our LMS connects learners with world-class courses and experienced instructors.
//               </p>
//               <p>
//                 Our platform covers a wide range of subjects, blending interactive lessons, quizzes, and certifications to provide a complete learning experience.
//               </p>
//               <p>
//                 We strive to empower learners with practical knowledge and skills, supporting them in achieving both personal and professional growth.
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6, delay: 0.1 * index }}
//                 viewport={{ once: true }}
//                 className="text-center p-6 bg-card border border-border rounded-lg"
//               >
//                 <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
//                 <div className="text-sm text-muted-foreground">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Values Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           viewport={{ once: true }}
//           className="mb-16"
//         >
//           <h3 className="text-2xl font-bold text-center mb-12">Our Features</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {values.map((value, index) => {
//               const IconComponent = value.icon;
//               return (
//                 <motion.div
//                   key={value.title}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   whileHover={{ y: -5 }}
//                 >
//                   <Card className="h-full border-border/50 hover:border-primary/20 transition-all duration-300">
//                     <CardContent className="p-6">
//                       <div className="flex items-start space-x-4">
//                         <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
//                           <IconComponent className="h-5 w-5 text-primary" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold mb-2">{value.title}</h4>
//                           <p className="text-sm text-muted-foreground">{value.description}</p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* Technology Stack */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center"
//         >
//           <h3 className="text-2xl font-bold mb-8">Technologies We Use</h3>
//           <div className="flex flex-wrap justify-center gap-3">
//             {techStack.map((tech) => (
//               <Badge key={tech} variant="outline" className="px-3 py-1">
//                 {tech}
//               </Badge>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
