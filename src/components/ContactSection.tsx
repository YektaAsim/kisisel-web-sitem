import { FormEvent, useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { submitContactMessage } from "@/lib/contact";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    try {
      await submitContactMessage(formData);
      setFormData(initialForm);
      setSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Mesaj gonderilirken bir hata olustu.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-background py-24">
      <div className="container mx-auto px-6">
        <h2 className="mb-6 text-center text-3xl font-bold md:text-4xl">Bana Ulasin</h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-muted-foreground">
          Projeniz icin teklif almak, bir soru sormak ya da sadece merhaba demek
          icin formu doldurabilirsiniz. En kisa surede geri donerim.
        </p>

        <div
          className={`mx-auto grid max-w-5xl gap-12 transition-all duration-700 md:grid-cols-2 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold">Telefon</h4>
                <a
                  href="tel:+905337429958"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  +90 533 742 99 58
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold">Konum</h4>
                <p className="text-muted-foreground">
                  Bursa
                  <br />
                  Osmangazi, 35433
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold">E-posta</h4>
                <a
                  href="mailto:yektaasim50@gmail.com"
                  className="block text-muted-foreground transition-colors hover:text-primary"
                >
                  yektaasim50@gmail.com
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Adiniz
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, name: event.target.value }))
                }
                className="w-full rounded-lg border border-border bg-card px-4 py-3 transition-colors focus:border-primary focus:outline-none"
                placeholder="Adinizi girin"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, email: event.target.value }))
                }
                className="w-full rounded-lg border border-border bg-card px-4 py-3 transition-colors focus:border-primary focus:outline-none"
                placeholder="E-posta adresinizi girin"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Mesajiniz
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, message: event.target.value }))
                }
                rows={5}
                className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 transition-colors focus:border-primary focus:outline-none"
                placeholder="Mesajinizi yazin"
                required
              />
            </div>

            {success && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-500">
                Mesajiniz basariyla gonderildi.
              </div>
            )}

            {errorMessage && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send size={18} />
              {loading ? "Gonderiliyor..." : "Gonder"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
