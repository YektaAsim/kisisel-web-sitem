import { useEffect, useRef, useState } from 'react';

const categories = ['Tümü', 'Web Tasarım', 'Dijital Tasarım'];

const portfolioItems = [
  {
    title: 'İrem Altuğ',
    description: 'Kişisel Web Sitesi Tasarımı ve Programlama',
    category: 'Web Tasarım',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  },
  {
    title: 'Musiconline',
    description: 'Etkinlik/Resital Afiş Tasarımı',
    category: 'Dijital Tasarım',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop',
  },
  {
    title: 'Amigdala Agency',
    description: 'Kreatif Web Site Tasarımı ve Programlama',
    category: 'Web Tasarım',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
  },
  {
    title: 'Garden Hotel',
    description: 'Menü Tasarımı',
    category: 'Dijital Tasarım',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
  },
  {
    title: 'Merhaba Pastacılık',
    description: 'Dinamik Web Sitesi Tasarımı ve Programlama',
    category: 'Web Tasarım',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
  },
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredItems = activeCategory === 'Tümü'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Portfolyo</h2>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs rounded-full w-fit">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
            TÜMÜNÜ GÖRÜNTÜLE
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
