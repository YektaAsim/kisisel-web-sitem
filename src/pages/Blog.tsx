import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const emptyForm = {
  title: "",
  content: "",
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setPosts([]);
      setErrorMessage(error.message);
    } else {
      setPosts(data ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setErrorMessage("Başlık ve içerik alanlarını doldurun.");
      return;
    }

    setSaving(true);
    setErrorMessage("");

    const query = editingId
      ? supabase.from("blog_posts").update(form).eq("id", editingId)
      : supabase.from("blog_posts").insert([form]);

    const { error } = await query;

    if (error) {
      setErrorMessage(error.message);
    } else {
      resetForm();
      await fetchPosts();
    }

    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    setErrorMessage("");

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    await fetchPosts();
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      content: post.content,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="px-4 py-28">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-center text-4xl font-bold">Blog</h1>
          <p className="mb-10 text-center text-muted-foreground">
            Blog içeriklerini buradan yönetebilir ve yayınlanan yazıları listeleyebilirsiniz.
          </p>

          <section className="mb-10 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">
              {editingId ? "Yazıyı Düzenle" : "Yeni Yazı Ekle"}
            </h2>

            <input
              className="mb-3 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
              placeholder="Başlık"
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
            />

            <textarea
              className="mb-3 h-32 w-full resize-none rounded-lg border border-border bg-background px-4 py-2 text-foreground"
              placeholder="İçerik"
              value={form.content}
              onChange={(event) =>
                setForm((current) => ({ ...current, content: event.target.value }))
              }
            />

            {errorMessage && (
              <div className="mb-3 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {errorMessage}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Kaydediliyor..." : editingId ? "Güncelle" : "Ekle"}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  className="rounded-lg border border-border px-6 py-2 font-medium transition hover:opacity-90"
                >
                  İptal
                </button>
              )}
            </div>
          </section>

          <section className="space-y-6">
            {loading && (
              <div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
                Yazılar yükleniyor...
              </div>
            )}

            {!loading && posts.length === 0 && (
              <div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
                Henüz blog yazısı bulunmuyor.
              </div>
            )}

            {!loading &&
              posts.map((post) => (
                <article key={post.id} className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold">{post.title}</h3>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="rounded-lg border border-border px-3 py-1 text-sm transition hover:opacity-80"
                      >
                        Düzenle
                      </button>

                      <button
                        onClick={() => handleDelete(post.id)}
                        className="rounded-lg bg-destructive px-3 py-1 text-sm text-destructive-foreground transition hover:opacity-80"
                      >
                        Sil
                      </button>
                    </div>
                  </div>

                  <p className="whitespace-pre-wrap text-muted-foreground">{post.content}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString("tr-TR")}
                  </p>
                </article>
              ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
