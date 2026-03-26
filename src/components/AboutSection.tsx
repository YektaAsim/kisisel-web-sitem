import { useEffect, useRef, useState } from 'react';
import profileImg from '@/assets/profile.jpg';

const skills = {
  'Grafik Tasarım': [
    { name: 'Photoshop', level: 98 },
    { name: 'Illustrator', level: 85 },
    { name: 'Premiere', level: 75 },
    { name: 'After Effects', level: 60 },
  ],
  'Yazılım': [
    { name: 'PHP/HTML/CSS/JS/WordPress', level: 90 },
    { name: 'MySQL/MSSQL', level: 85 },
    { name: 'C++/Python', level: 70 },
  ],
  'Sistem Bilgisi': [
    { name: 'Siber Güvenlik/Network', level: 70 },
    { name: 'Linux Sistem Yönetimi', level: 60 },
    { name: 'Gömülü Yazılım/IoT', level: 75 },
    { name: 'Yapay Zeka', level: 55 },
  ],
};

const ProgressBar = ({ name, level, animate }: { name: string; level: number; animate: boolean }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-2">
      <span className="text-sm text-muted-foreground uppercase tracking-wider">{name}</span>
      <span className="text-sm text-primary">{level}%</span>
    </div>
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: animate ? `${level}%` : '0%' }}
      />
    </div>
  </div>
);

const AboutSection = () => {
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
    <section id="about" ref={sectionRef} className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Hakkımda</h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Profile Image & Info */}
          <div className={`flex flex-col items-center lg:items-start transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative mb-8">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-primary/20">
                <img
                  src={profileImg}
                  alt="Yekta Asım ELLİ"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-primary/30 -z-10" />
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-primary">Yeni Nesil Bilgisayar Mühendisi</h3>
            
            <div className="text-muted-foreground space-y-4 text-sm md:text-base leading-relaxed">
              <p>
                11 Aralık 2007'de Bursa'nın Osmangazi ilçesinde doğdum. İlköğretim dönemimi burada tamamlamamın ardından Demirtaşpaşa Mesleki ve Teknik Anadolu Lisesi kazanarak lise hayatıma başladım.
              </p>
              <p>
                Lisede bulunduğum Bilişim Teknolojileri bölümünde derslerin yanısıra başlangıç seviyesi C ve Java programlama ardından fotoğraf ve video edit uygulamalarına başladım.
              </p>
              <p>
                Özel olarak web ve grafik tasarımı, mobil uygulama geliştirme (Flutter), gömülü programlama / robotik ve siber güvenlik uygulamalarıyla ilgileniyorum.
              </p>
              <p className="text-primary font-medium">
                İlgili konular üzerine freelancer olarak hizmet veriyorum.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                CV'Mİ GÖRÜNTÜLE
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                İLETİŞİME GEÇELİM
              </a>
            </div>
          </div>

          {/* Skills */}
          <div className={`space-y-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {Object.entries(skills).map(([category, categorySkills]) => (
              <div key={category}>
                <h4 className="text-lg font-semibold mb-4 text-primary">{category}</h4>
                {categorySkills.map((skill) => (
                  <ProgressBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    animate={isVisible}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
