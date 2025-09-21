
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What is TechFest and how does it work?",
    answer: "TechFest is a comprehensive e-learning platform where you can purchase and access high-quality video courses, complete interactive quizzes, and track your learning progress. Our platform offers courses taught by industry experts, hands-on projects, and lifetime access to all materials."
  },
  {
    id: 2,
    question: "How can I purchase and access courses?",
    answer: "You can easily purchase courses directly on our website by selecting the course you're interested in, adding it to your cart, and following our secure checkout process. Once purchased, you'll have immediate access to all course materials, including videos, resources, and quizzes."
  },
  {
    id: 3,
    question: "Do I get a certificate after completing a course?",
    answer: "Yes! After successfully completing a course and passing all required assessments, you'll receive a verified certificate of completion. This certificate can be downloaded, shared on professional networks like LinkedIn, or included in your portfolio to showcase your new skills to employers."
  },
  {
    id: 4,
    question: "How can I track my learning progress?",
    answer: "Our platform provides a comprehensive dashboard where you can monitor your progress through each course. You can see which videos you've watched, quizzes you've completed, your scores, and overall course completion percentage. Progress is automatically saved and synced across all your devices."
  },
  {
    id: 5,
    question: "What if I have questions about the course content?",
    answer: "We offer multiple support channels for learners. You can reach out to instructors through our platform's messaging system, participate in course discussion forums, join our vibrant community of learners, or contact our 24/7 support team for technical assistance."
  },
  {
    id: 6,
    question: "Can I access courses on mobile devices and tablets?",
    answer: "Absolutely! Our platform is fully responsive and optimized for all devices. You can seamlessly access courses, watch videos, take quizzes, and track progress on desktop computers, laptops, tablets, and smartphones. Your progress is automatically synchronized across all devices."
  },
  {
    id: 7,
    question: "What's your refund policy?",
    answer: "We offer a 30-day money-back guarantee on all courses. If you're not satisfied with your purchase within the first 30 days, you can request a full refund. We're confident in the quality of our courses and want to ensure you have a positive learning experience."
  },
  {
    id: 8,
    question: "Are there any prerequisites for the courses?",
    answer: "Prerequisites vary by course and are clearly listed on each course page. We offer courses for all skill levels, from complete beginners to advanced professionals. Each course description includes the recommended background knowledge and skills needed to get the most out of the learning experience."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <HelpCircle size={20} />
            <span className="font-medium">Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to the most common questions about our platform, courses, and learning experience.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <motion.button
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-accent/10 transition-colors duration-300"
                      onClick={() => toggleFAQ(index)}
                      whileHover={{ x: 4 }}
                    >
                      <h3 className="text-lg font-semibold pr-4 group-hover:text-primary transition-colors duration-300">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0"
                      >
                        {openIndex === index ? (
                          <Minus className="h-5 w-5 text-primary" />
                        ) : (
                          <Plus className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
                        )}
                      </motion.div>
                    </motion.button>
                    
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: openIndex === index ? "auto" : 0,
                        opacity: openIndex === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="w-full h-px bg-border/50 mb-4"></div>
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our support team is here to help you 24/7.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
              >
                Contact Support
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}