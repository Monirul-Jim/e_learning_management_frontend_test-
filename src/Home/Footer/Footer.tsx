'use client';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Github,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const usefulLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Career', href: '/career' },
    { name: 'Free Resources', href: '/resources' },
  ];

  const otherResources = [
    { name: 'MIT License', href: '/license' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
    { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-400' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/20 border-t border-border/50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Company Info & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Company Info */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    TechFest
                  </h2>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Let's keep in touch!</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Find us on any of these platforms, we respond within 1-2 business days. 
                  Join our community of learners and stay updated with the latest in tech education.
                </p>

                {/* Social Media Buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 text-muted-foreground ${social.color} shadow-lg hover:shadow-xl transition-all duration-300 h-12 w-12 flex items-center justify-center rounded-full`}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Newsletter Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Subscribe to Our Newsletter
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Stay updated with the latest courses, tech trends, and exclusive offers. 
                      Join over 50,000 learners who get our weekly insights!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
                      />
                      <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 group">
                        Subscribe
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      No spam, unsubscribe at any time. We respect your privacy.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Right Column - Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12"
            >
              {/* Useful Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-primary">Useful Links</h4>
                <ul className="space-y-3">
                  {usefulLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline underline-offset-4 flex items-center gap-2 group"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Other Resources */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-primary">Other Resources</h4>
                <ul className="space-y-3">
                  {otherResources.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline underline-offset-4 flex items-center gap-2 group"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { icon: Mail, title: 'Email Us', info: 'hello@techfest.com', href: 'mailto:hello@techfest.com' },
              { icon: Phone, title: 'Call Us', info: '+1 (555) 123-4567', href: 'tel:+15551234567' },
              { icon: MapPin, title: 'Visit Us', info: 'San Francisco, CA', href: '#' },
            ].map((contact, index) => (
              <motion.a
                key={contact.title}
                href={contact.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex items-center gap-4 p-4 bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg hover:border-primary/30 hover:bg-card/50 transition-all duration-300 group"
              >
                <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                  <contact.icon size={20} />
                </div>
                <div>
                  <h5 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {contact.title}
                  </h5>
                  <p className="text-sm text-muted-foreground">{contact.info}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border-t border-border/50 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-muted-foreground">
                  Copyright © {currentYear}{' '}
                  <span className="text-primary font-semibold">TechFest</span>. 
                  All rights reserved.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Built with ❤️ for the learning community
                </p>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="/terms" className="hover:text-primary transition-colors duration-300">Terms</a>
                <a href="/privacy" className="hover:text-primary transition-colors duration-300">Privacy</a>
                <a href="/cookies" className="hover:text-primary transition-colors duration-300">Cookies</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}