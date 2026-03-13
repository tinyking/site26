import '@/assets/styles/globals.css';

const footerLinks = [
  { href: '/galleries', label: 'Galleries' },
  { href: '/journal', label: 'Journal' },
  { href: '/booking', label: 'Booking' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <a href="/" className="text-lg font-semibold">
              Jianchao Wang
            </a>
          </div>

          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jianchao Wang. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
