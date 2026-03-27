import { FormEvent, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { submitContactMessage } from "@/lib/contact";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage("Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    try {
      await submitContactMessage(form);
      setForm(initialForm);
      setSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Mesaj gönderilirken bir hata oluştu.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="px-4 py-28">
        <div className="mx-auto max-w-xl">
          <h1 className="mb-4 text-center text-4xl font-bold">İletişim</h1>
          <p className="mb-10 text-center text-muted-foreground">
            Benimle iletişime geçmek için formu doldurabilirsiniz.
          </p>

          <div className="mb-8 rounded-xl border border-border bg-card px-6 py-4 text-center">
            <p className="text-sm text-muted-foreground">Telefon</p>
            <a href="tel:+905337429958" className="text-lg font-medium hover:text-primary">
              533 742 99 58
            </a>
            <p className="mt-4 text-sm text-muted-foreground">E-posta</p>
            <a
              href="mailto:yektaasim50@gmail.com"
              className="text-lg font-medium hover:text-primary"
            >
              yektaasim50@gmail.com
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card p-8"
          >
            <div className="mb-4">
              <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">
                Ad soyad
              </label>
              <input
                id="contact-name"
                name="name"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
                placeholder="Ad soyadınızı yazın"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
                E-posta adresi
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
                placeholder="ornek@mail.com"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">
                Mesajınız
              </label>
              <textarea
                id="contact-message"
                name="message"
                className="h-36 w-full resize-none rounded-lg border border-border bg-background px-4 py-2 text-foreground"
                placeholder="Mesajınızı yazın"
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({ ...current, message: event.target.value }))
                }
                required
              />
            </div>

            {success && (
              <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-500">
                Mesajınız başarıyla gönderildi.
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Gönderiliyor..." : "Gönder"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
