import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Anasayfa", href: "/#home" },
  { label: "Hakkımda", href: "/#about" },
  { label: "Deneyimlerim", href: "/#experience" },
  { label: "Portfolyo", href: "/#portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 shadow-lg backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card">
            <span className="text-xl font-bold text-primary">Y</span>
          </div>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="p-2 text-foreground md:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full border-b border-border bg-background/98 backdrop-blur-md md:hidden">
            <ul className="container mx-auto flex flex-col gap-4 px-6 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
