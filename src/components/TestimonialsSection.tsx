import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    text: 'Hidayet, font izlencelerinin, grafik ve web tasarımın eğlenceli yüzü. Nice projelere, sevgilerimle...',
    author: 'Sevcan Keskin',
    role: 'SOLEDAD Danışmanlık Grubu',
  },
  {
    text: "Hidayet'le birlikte amigdala.agency, pedagojiakademisi.com ve merhabapastacilikokulu.com'u hayata geçirdik. Süreç boyunca tüm nezaketi ve özverisi ile bize yardımcı oldu. Her zaman ulaşılabilir olması, deadline'ları aksatmaması ve iş disiplini sebebiyle ajans olarak kesinlikle her zaman çalışmayı isteyeceğimiz bir arkadaşımız.",
    author: 'Pınar Canbaz',
    role: 'Amigdala Agency - Founder / CEO',
  },
  {
    text: "Kısa zamanda, tam da hayal ettiğim ve ihtiyaç duyduğum tarzda bir site yarattığı için Hidayet'e çok teşekkür ederim. Kesinlikle profesyonel, yenilikçi, vizyonu geniş, samimi ve pratik bir arkadaşımız. Tasarım konusunda da oldukça yaratıcı ve yetenekli.",
    author: 'İrem Altuğ',
    role: 'Aktör - Yazar - Çevirmen',
  },
  {
    text: "I had the opportunity to work with Hidayet during a website development project. His capabilities of quick implementing what he has just learnt does not stop him eager to keep going learning. Hidayet is hardworking and brought positive energy into the project.",
    author: 'Berkant Sülüşoğlu',
    role: 'Banqo A.Ş. - CEO & COFOUNDER',
  },
  {
    text: 'Mükemmel hayat enerjisiyle ve yeni şeyler öğrenme aşkıyla yanan, şu güne kadar gördüğüm en azimli girişimcilerden olan Hidayet kardeşime kariyerinde başarılar diliyorum...',
    author: 'Serkan Taşkanı',
    role: 'CEO / TasDesign',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Onlar Ne Dedi</h2>

        <div
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative bg-background rounded-2xl p-8 md:p-12 border border-border">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />
            
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">
                    {testimonials[currentIndex].author[0]}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonials[currentIndex].author}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={goToPrev}
                className="p-2 rounded-full bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-8 bg-primary' : 'bg-muted hover:bg-muted-foreground'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
