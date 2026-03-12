import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const journalPosts = [
  {
    id: 1,
    slug: 'golden-hour-photography',
    title: 'The Art of Golden Hour Photography',
    excerpt: 'Exploring techniques for capturing the magical light during sunrise and sunset...',
    date: 'March 8, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600',
    category: 'Technique',
  },
  {
    id: 2,
    slug: 'day-in-the-life',
    title: 'Behind the Lens: A Day in the Life',
    excerpt: 'Join me for an intimate look at the creative process and daily routines...',
    date: 'March 1, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
    category: 'Behind the Scenes',
  },
  {
    id: 3,
    slug: 'everyday-moments',
    title: 'Finding Stories in Everyday Moments',
    excerpt: 'How to see extraordinary narratives in ordinary scenes and capture authentic emotions...',
    date: 'February 22, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600',
    category: 'Creative Process',
  },
  {
    id: 4,
    slug: 'minimalist-composition',
    title: 'The Minimalist Approach to Composition',
    excerpt: 'Less is more: embracing simplicity to create powerful visual impact...',
    date: 'February 15, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600',
    category: 'Composition',
  },
];

export default function JournalPage() {
  return (
    <div className="relative z-10">
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="heading-lg text-foreground mb-4">Journal</h1>
          <p className="body-md text-muted-foreground max-w-2xl mx-auto">
            Thoughts, stories, and insights from behind the lens.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {journalPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <a
                href={`/journal/${post.slug}`}
                className="group glass-card rounded-lg overflow-hidden block"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="label text-xs text-muted-foreground">{post.category}</span>
                  <h2 className="text-xl font-semibold mt-2 mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
