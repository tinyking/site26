import { motion } from 'framer-motion';
import { useState } from 'react';

const galleries = [
  {
    id: 1,
    title: 'Urban Landscapes',
    description: 'City skylines and architectural marvels',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600',
    count: 24,
  },
  {
    id: 2,
    title: 'Nature\'s Canvas',
    description: 'Breathtaking natural scenery',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
    count: 18,
  },
  {
    id: 3,
    title: 'Portrait Stories',
    description: 'Intimate character studies',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    count: 32,
  },
  {
    id: 4,
    title: 'Abstract Forms',
    description: 'Shapes, textures, and patterns',
    image: 'https://images.unsplash.com/photo-1551913902-c92207136625?w=600',
    count: 15,
  },
  {
    id: 5,
    title: 'Street Moments',
    description: 'Candid urban life captured',
    image: 'https://images.unsplash.com/photo-1517242810446-cc8951b2be40?w=600',
    count: 28,
  },
  {
    id: 6,
    title: 'Light & Shadow',
    description: 'Exploring contrast and form',
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600',
    count: 20,
  },
];

export default function GalleriesPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="relative z-10">
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="heading-lg text-foreground mb-4">Galleries</h1>
          <p className="body-md text-muted-foreground max-w-2xl mx-auto">
            Explore curated collections of fine art photography, each telling a unique visual story.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery, index) => (
            <motion.div
              key={gallery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onMouseEnter={() => setHoveredId(gallery.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={gallery.image}
                  alt={gallery.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-1">{gallery.title}</h3>
                <p className="text-sm text-white/80 mb-2">{gallery.description}</p>
                <span className="text-xs text-white/60">{gallery.count} photos</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
