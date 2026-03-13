import { motion } from 'framer-motion';
import { ArrowRight, Camera, Image, BookOpen } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Fine Art Photography',
    description: 'Capturing moments with artistic vision and technical excellence.',
  },
  {
    icon: Image,
    title: 'Curated Galleries',
    description: 'Explore carefully curated collections of stunning imagery.',
  },
  {
    icon: BookOpen,
    title: 'Creative Journal',
    description: 'Behind-the-scenes stories and creative insights.',
  },
];

export default function HomePage() {
  return (
    <div className="relative z-10">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="heading-xl text-foreground mb-6">
            Jianchao Wang
          </h1>
          <p className="body-lg text-muted-foreground mb-8">
            A premium photography portfolio showcasing the art of visual storytelling.
            Every frame is a moment frozen in time, crafted with precision and passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/galleries"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Explore Galleries
              <ArrowRight size={18} />
            </a>
            <a
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-accent transition-colors"
            >
              Book a Session
            </a>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glass-card glass-card-hover rounded-lg p-6"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
