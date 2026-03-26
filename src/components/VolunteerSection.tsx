import { useEffect, useRef, useState } from 'react';

const volunteerWork = [
  {
    logo: '🍋',
    title: 'Stajerlik',
    organization: 'Uludağ İçecek A.Ş.',
    description: 'Uludağ İçecek kapsamında, stajerlik olarak çalışmalarıma devam ediyorum.',
  }
];

const VolunteerSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Çalışmalarım</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {volunteerWork.map((work, index) => (
            <div
              key={work.title}
              className={`bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{work.logo}</div>
              <h4 className="text-lg font-semibold text-primary mb-1">{work.title}</h4>
              <p className="text-xs text-muted-foreground mb-3">{work.organization}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{work.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
