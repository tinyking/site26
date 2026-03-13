import { useState } from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, User } from 'lucide-react';
import '../../assets/styles/journal-detail.css';

interface PostData {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  author: string;
  tags: string[];
}

interface RenderedContent {
  html: string;
}

interface JournalDetailPageProps {
  post: PostData | undefined;
  content: RenderedContent | undefined;
}

export default function JournalDetailPage({ post, content }: JournalDetailPageProps) {
  const [loading, setLoading] = useState(false);

  if (!post || !content) {
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
          dangerouslySetInnerHTML={{ __html: content.html }}
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
