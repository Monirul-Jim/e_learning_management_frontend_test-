"use client";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Users,
  Award,
  BookOpen,
  Headphones,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Content",
    description:
      "Learn from industry professionals with years of real-world experience",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description:
      "Study at your own pace with lifetime access to all course materials",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Users,
    title: "Interactive Community",
    description:
      "Connect with fellow learners and get support from our vibrant community",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Award,
    title: "Industry Certificates",
    description:
      "Earn recognized certifications that employers value and trust",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: CheckCircle,
    title: "Hands-On Projects",
    description:
      "Build real-world projects to showcase in your professional portfolio",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Get help whenever you need it with our dedicated support team",
    color: "from-teal-500 to-teal-600",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  TechFest?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Our e-learning platform offers a comprehensive and engaging
                learning experience. Whether you're looking to enhance your
                skills or dive into new subjects, we have everything you need to
                succeed in your tech career.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <feature.icon size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Video/Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Video Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/20 group">
                <div className="aspect-video bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center">
                  {/* YouTube Video Embed */}
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/ANZYFpADlz4?si=V5T0vKpG6P9h-gKQ"
                    title="TechFest Learning Platform Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-card/95 backdrop-blur-sm p-4 rounded-xl border border-border/50 shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Students
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -top-6 -right-6 bg-primary/90 backdrop-blur-sm p-4 rounded-xl text-primary-foreground shadow-lg"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse"></div>
              <div
                className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-tl from-secondary/20 to-accent/20 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              number: "500+",
              label: "Expert Courses",
              description:
                "Comprehensive curriculum designed by industry experts",
              icon: "📚",
            },
            {
              number: "24/7",
              label: "Learning Support",
              description: "Get help anytime with our dedicated support team",
              icon: "🛟",
            },
            {
              number: "∞",
              label: "Lifetime Access",
              description:
                "Learn at your own pace with unlimited course access",
              icon: "🚀",
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="text-center group cursor-pointer"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {item.number}
              </div>
              <div className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                {item.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {item.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
