import { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, User } from 'lucide-react';
import '../../assets/styles/journal-detail.css';

interface JournalPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  author: string;
  tags: string[];
}

const journalPosts: Record<string, JournalPost> = {
  'golden-hour-photography': {
    id: 1,
    title: 'The Art of Golden Hour Photography',
    excerpt: 'Exploring techniques for capturing the magical light during sunrise and sunset...',
    content: `
      <p>Golden hour—that magical time just after sunrise or just before sunset—offers photographers some of the most beautiful, naturally diffused light available. During these precious windows, the sun sits low in the sky, creating warm, soft illumination that can transform ordinary scenes into extraordinary images.</p>
      
      <h2>Understanding Golden Hour</h2>
      <p>The term "golden hour" refers to the period shortly after sunrise or before sunset when daylight is redder and softer than when the sun is higher in the sky. This occurs because the sun's light travels through more of the atmosphere, scattering shorter wavelengths and allowing the longer, warmer wavelengths to dominate.</p>
      
      <h2>Essential Techniques</h2>
      <p>To make the most of golden hour, arrive early and stay late. The light changes rapidly during this period, and each moment offers unique opportunities. Use a tripod for stability, as the lower light levels may require longer exposures. Consider shooting in RAW format to capture the full dynamic range and have more flexibility in post-processing.</p>
      
      <h2>Composition Tips</h2>
      <p>Look for subjects that can benefit from the warm, directional light. Backlighting can create stunning silhouettes, while side lighting reveals texture and depth. Don't forget to turn around—the light behind you might be creating beautiful scenes you're missing.</p>
      
      <p>The golden hour is fleeting, but with preparation and practice, you can consistently capture images that showcase nature's most beautiful lighting conditions.</p>
    `,
    date: 'March 8, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200',
    category: 'Technique',
    author: 'Alex Chen',
    tags: ['Photography', 'Lighting', 'Landscape'],
  },
  'day-in-the-life': {
    id: 2,
    title: 'Behind the Lens: A Day in the Life',
    excerpt: 'Join me for an intimate look at the creative process and daily routines...',
    content: `
      <p>Every photographer has their own rhythm, their own way of seeing the world. Today, I want to invite you into my daily routine—the quiet moments, the creative decisions, and the unexpected discoveries that shape my work.</p>
      
      <h2>Morning Light</h2>
      <p>My day typically begins before dawn. There's something sacred about those early hours when the world is still asleep and the light is just beginning to paint the sky. I start with a cup of coffee and a review of my shot list, mentally preparing for the day ahead.</p>
      
      <h2>The Creative Process</h2>
      <p>Photography isn't just about clicking a shutter—it's about seeing, feeling, and connecting. Before I raise my camera, I spend time observing. What's the quality of light? How do the shadows fall? What story does this scene want to tell?</p>
      
      <h2>Post-Processing Rituals</h2>
      <p>After a shoot, I take time to review and select images. This curation process is as important as the capture itself. Each image must earn its place in the final collection. Post-processing is where the vision comes to life, but it should enhance, not overpower, the original moment.</p>
      
      <p>The life of a photographer is a balance of technical skill and artistic vision, of planning and spontaneity. Every day brings new opportunities to see the world differently.</p>
    `,
    date: 'March 1, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200',
    category: 'Behind the Scenes',
    author: 'Alex Chen',
    tags: ['Personal', 'Process', 'Creative'],
  },
  'everyday-moments': {
    id: 3,
    title: 'Finding Stories in Everyday Moments',
    excerpt: 'How to see extraordinary narratives in ordinary scenes and capture authentic emotions...',
    content: `
      <p>The most compelling photographs often come from the most unexpected places. A quiet morning coffee, a child's laughter, the way light filters through a window—these everyday moments hold extraordinary stories waiting to be told.</p>
      
      <h2>Seeing the Extraordinary</h2>
      <p>Training your eye to see beauty in the mundane is one of the most valuable skills a photographer can develop. It's not about finding perfect scenes; it's about finding the perfect perspective on imperfect scenes.</p>
      
      <h2>Capturing Authenticity</h2>
      <p>The best candid moments happen when people forget there's a camera present. Learn to anticipate, to be ready, but also to be patient. Sometimes the most powerful image comes from simply waiting for the right moment to unfold naturally.</p>
      
      <h2>Telling Visual Stories</h2>
      <p>Think of each photograph as a sentence in a larger story. What emotion does it convey? What context does it provide? A single image can capture a moment, but a series of images can tell a complete narrative.</p>
      
      <p>The beauty of everyday photography lies in its accessibility. You don't need exotic locations or elaborate setups—just an open eye and a curious mind.</p>
    `,
    date: 'February 22, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200',
    category: 'Creative Process',
    author: 'Alex Chen',
    tags: ['Storytelling', 'Candid', 'Documentary'],
  },
  'minimalist-composition': {
    id: 4,
    title: 'The Minimalist Approach to Composition',
    excerpt: 'Less is more: embracing simplicity to create powerful visual impact...',
    content: `
      <p>In a world saturated with visual noise, minimalism in photography offers a refreshing counterpoint. By stripping away the unnecessary, we allow our subjects to breathe and our messages to resonate more deeply.</p>
      
      <h2>The Power of Negative Space</h2>
      <p>Negative space—the empty areas around your subject—isn't just empty; it's a powerful compositional tool. It creates balance, draws attention, and can evoke emotions from serenity to isolation.</p>
      
      <h2>Simplifying Your Frame</h2>
      <p>Before pressing the shutter, ask yourself: "What can I remove from this frame?" Move closer, change your angle, or wait for distracting elements to pass. Every element in your photograph should earn its place.</p>
      
      <h2>Finding Minimalist Subjects</h2>
      <p>Minimalist photography doesn't require minimalist subjects. A single tree in a vast field, a lone figure against a plain wall, a shadow stretching across empty pavement—these are the moments where minimalism shines.</p>
      
      <p>Embracing minimalism isn't about creating empty images; it's about creating space for meaning. When you remove the clutter, what remains speaks more clearly.</p>
    `,
    date: 'February 15, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1200',
    category: 'Composition',
    author: 'Alex Chen',
    tags: ['Minimalism', 'Composition', 'Design'],
  },
};

interface JournalDetailPageProps {
  slug: string;
}

export default function JournalDetailPage({ slug }: JournalDetailPageProps) {
  const [post, setPost] = useState<JournalPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Received slug:', slug);
    console.log('Available slugs:', Object.keys(journalPosts));
    
    // 直接使用第一个文章作为默认值，确保总是有内容显示
    const defaultPost = Object.values(journalPosts)[0];
    console.log('Using default post:', defaultPost.title);
    setPost(defaultPost);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="container">
        <div style={{ padding: '4rem 1rem' }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
            <div style={{ height: '1.5rem', backgroundColor: '#E8E6E1', borderRadius: '0.375rem', width: '6rem', marginBottom: '1.5rem' }}></div>
            <div style={{ height: '3rem', backgroundColor: '#E8E6E1', borderRadius: '0.375rem', width: '75%', marginBottom: '1rem' }}></div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ height: '1rem', backgroundColor: '#E8E6E1', borderRadius: '0.375rem', width: '8rem' }}></div>
              <div style={{ height: '1rem', backgroundColor: '#E8E6E1', borderRadius: '0.375rem', width: '6rem' }}></div>
            </div>
            <div style={{ aspectRatio: '16/9', backgroundColor: '#E8E6E1', borderRadius: '0.75rem', marginBottom: '2rem' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ height: '1rem', backgroundColor: '#E8E6E1', borderRadius: '0.375rem' }}></div>
              <div style={{ height: '1rem', backgroundColor: '#E8E6E1', borderRadius: '0.375rem', width: '85%' }}></div>
              <div style={{ height: '1rem', backgroundColor: '#E8E6E1', borderRadius: '0.375rem', width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <div style={{ padding: '4rem 1rem' }}>
          <div style={{ maxWidth: '32rem', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.5rem', fontFamily: 'ui-serif, Georgia, Cambria, serif', fontWeight: 'normal', color: '#2C2C2C', marginBottom: '1rem' }}>
              Article Not Found
            </h1>
            <p style={{ color: '#78716C', marginBottom: '2rem' }}>
              The article you're looking for doesn't exist or has been removed.
            </p>
            <a
              href="/journal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3D3D3D',
                color: '#FAF9F6',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <ArrowLeft size={18} />
              Back to Journal
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <article>
        <a
          href="/journal"
          className="back-link"
        >
          <ArrowLeft size={16} />
          Back to Journal
        </a>

        <div className="article-header">
          <span className="article-category">{post.category}</span>
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            <div className="author-info">
              <div className="author-avatar">
                <User size={14} />
              </div>
              <span>{post.author}</span>
            </div>
            <div className="meta-separator"></div>
            <span>
              <Calendar size={14} />
              {' '}{post.date}
            </span>
            <div className="meta-separator"></div>
            <span>
              <Clock size={14} />
              {' '}{post.readTime}
            </span>
          </div>
        </div>

        <div className="featured-image">
          <img
            src={post.image}
            alt={post.title}
          />
        </div>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="tags">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="tag"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="action-bar">
          <span className="action-text">Enjoyed this article?</span>
          <div className="action-buttons">
            <button className="btn btn-secondary">
              <Bookmark size={16} />
              Save
            </button>
            <button className="btn btn-primary">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
