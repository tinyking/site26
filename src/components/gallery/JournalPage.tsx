import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface Post {
  slug: string;
  data: {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    image: string;
    category: string;
  };
}

interface JournalPageProps {
  posts: Post[];
}

export default function JournalPage({ posts }: JournalPageProps) {
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
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
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
                    src={post.data.image}
                    alt={post.data.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="label text-xs text-muted-foreground">{post.data.category}</span>
                  <h2 className="text-xl font-semibold mt-2 mb-3 group-hover:text-primary transition-colors">
                    {post.data.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{post.data.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.data.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.data.readTime}
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
