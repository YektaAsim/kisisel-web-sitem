import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

const experiences = [
  {
    company: 'Despatch Cloud UK',
    website: 'https://despatchcloud.com/',
    role: 'Backend Developer',
    type: 'Freelance',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    company: 'Musiconline',
    website: 'https://musiconline.co/',
    role: 'Full-Stack Dev. | Proje Yöneticisi',
    type: 'Freelance',
    color: 'from-purple-500 to-pink-500',
  },
  {
    company: 'Askıda Ne Var',
    website: 'https://askidanevar.com/',
    role: 'Frontend Dev. | Grafiker',
    type: 'Freelance',
    color: 'from-green-500 to-emerald-500',
  },
  {
    company: 'Smokin Ajans',
    website: 'https://smokinajans.com/',
    role: 'Yazılımcı | Grafiker',
    type: 'Freelance',
    color: 'from-orange-500 to-red-500',
  },
];

const clients = [
  'İrem Altuğ', 'Pamukkale Üniversitesi', 'Dahidükkan', 'Hammer Digital',
  'Garden Hotel & Cafe', 'Sianji Residences', 'Kilitbahir Tepe', 'Nano Dövme',
  'Espark Eskişehir', 'Bağdat Psikiyatri', 'Nazende Öksüz Özdemir', 'Tazekutu Eskişehir',
  'Gönüllü Psikolog',
];

const ExperienceSection = () => {
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
    <section id="experience" ref={sectionRef} className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Deneyimlerim</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className={`group relative bg-background rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold">{exp.company}</h3>
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
                <p className="text-primary font-medium mb-2">{exp.role}</p>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {exp.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Freelancer Section */}
        <div
          className={`bg-background rounded-xl p-8 border border-border transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-bold mb-2">Freelancer</h3>
              <p className="text-sm text-muted-foreground mb-4">Şubat 2015 - Halen</p>
              <p className="text-primary font-medium">Tasarım & Yazılım & Yönetim</p>
            </div>
            <div className="md:w-2/3">
              <p className="text-muted-foreground mb-6">
                Birçok özel/kurumsal şirket ve girişime yazılım geliştirme; sosyal medya yönetimi; 
                sosyal medya, baskı ve web tasarımı konularında hizmet verdim/veriyorum.
              </p>
              <h4 className="text-sm font-semibold text-primary mb-4">Hizmet Verdiğim Bazı Kurum/Kişiler:</h4>
              <div className="flex flex-wrap gap-2">
                {clients.map((client) => (
                  <span
                    key={client}
                    className="px-3 py-1 bg-card text-xs text-muted-foreground rounded-full border border-border"
                  >
                    {client}
                  </span>
                ))}
                <span className="px-3 py-1 bg-primary/10 text-xs text-primary rounded-full">
                  ...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
