'use client';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, Play } from 'lucide-react';
import { ParticlesBackground } from './ParticlesBackground';
import { Button } from '../../components/ui/button';

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-10"></div>
      </div>
      
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -right-40 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-secondary/20 via-accent/20 to-transparent blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 text-primary px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 backdrop-blur-sm border border-primary/20 shadow-lg"
            >
              <BookOpen size={18} className="animate-bounce" />
              <span className="font-medium">Transform Your Skills Today</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                TechFest
              </span>
              <br />
              <span className="text-foreground">Magic Starts Here</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Explore your favourite courses and register now to showcase your talent and develop your skills with our world-class learning platform.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8 sm:mb-10"
            >
              {[
                { icon: Users, label: '10K+ Students', value: '10,000+' },
                { icon: BookOpen, label: 'Expert Courses', value: '500+' },
                { icon: Award, label: 'Certificates', value: '50K+' }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/50"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <stat.icon size={20} className="text-primary" />
                  <div>
                    <div className="font-semibold text-sm">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center"
            >
              <Button
                size="lg" 
                className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-base lg:text-lg px-8 py-4 shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 w-full sm:w-auto"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="group border-2 border-primary/30 hover:border-primary/50 bg-background/50 backdrop-blur-sm text-base lg:text-lg px-8 py-4 hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Hero Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 h-[400px] sm:h-[500px]">
                {/* Large center image */}
                <motion.div 
                  className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-2xl border border-primary/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent z-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nfGVufDB8fHx8MTczNzM4MDA2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Students learning together"
                    className="w-full h-full object-cover"
                  />
                  <motion.div 
                    className="absolute bottom-4 left-4 bg-card/95 text-card-foreground px-4 py-2 rounded-lg z-20 shadow-lg backdrop-blur-sm"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="font-semibold text-sm">Live Learning Sessions</div>
                    <div className="text-xs text-muted-foreground">Join 1000+ active learners</div>
                  </motion.div>
                </motion.div>

                {/* Side images */}
                <motion.div 
                  className="relative rounded-xl overflow-hidden shadow-lg border border-primary/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZ3xlbnwwfHx8fDE3MzczODAwNjd8MA&ixlib=rb-4.1.0&q=80&w=400"
                    alt="Online learning"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/20"></div>
                </motion.div>

                <motion.div 
                  className="relative rounded-xl overflow-hidden shadow-lg border border-primary/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nfGVufDB8fHx8MTczNzM4MDA2N3ww&ixlib=rb-4.1.0&q=80&w=400"
                    alt="Students studying"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-secondary/20"></div>
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div 
                className="absolute -top-4 -left-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-2 rounded-lg text-sm font-semibold shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                🚀 New Courses Weekly
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -right-4 bg-card/95 text-card-foreground px-3 py-2 rounded-lg text-sm font-semibold shadow-lg backdrop-blur-sm border border-border/50"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                💡 Interactive Learning
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tl from-secondary/20 to-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}