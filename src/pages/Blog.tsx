import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface BlogPost {
  id: number
  title: string
  content: string
  created_at: string
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  // SELECT - Tüm postları getir
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // CREATE - Yeni post ekle
  const handleCreate = async () => {
    if (!title || !content) return
    setLoading(true)
    const { error } = await supabase
      .from('blog_posts')
      .insert([{ title, content }])
    if (!error) {
      setTitle('')
      setContent('')
      fetchPosts()
    }
    setLoading(false)
  }

  // UPDATE - Post güncelle
  const handleUpdate = async () => {
    if (!editingId || !title || !content) return
    setLoading(true)
    const { error } = await supabase
      .from('blog_posts')
      .update({ title, content })
      .eq('id', editingId)
    if (!error) {
      setTitle('')
      setContent('')
      setEditingId(null)
      fetchPosts()
    }
    setLoading(false)
  }

  // DELETE - Post sil
  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    if (!error) fetchPosts()
  }

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id)
    setTitle(post.title)
    setContent(post.content)
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>

        {/* Form */}
        <div className="bg-card border border-border rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}
          </h2>
          <input
            className="w-full bg-background border border-border rounded-lg px-4 py-2 mb-3 text-foreground"
            placeholder="Başlık"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="w-full bg-background border border-border rounded-lg px-4 py-2 mb-3 text-foreground h-32 resize-none"
            placeholder="İçerik"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <div className="flex gap-3">
            <button
              onClick={editingId ? handleUpdate : handleCreate}
              disabled={loading}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              {loading ? 'Kaydediliyor...' : editingId ? 'Güncelle' : 'Ekle'}
            </button>
            {editingId && (
              <button
                onClick={() => { setEditingId(null); setTitle(''); setContent('') }}
                className="border border-border px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
              >
                İptal
              </button>
            )}
          </div>
        </div>

        {/* Post Listesi */}
        <div className="space-y-6">
          {posts.length === 0 && (
            <p className="text-center text-muted-foreground">Henüz yazı yok.</p>
          )}
          {posts.map(post => (
            <div key={post.id} className="bg-card border border-border rounded-xl p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-sm px-3 py-1 border border-border rounded-lg hover:opacity-80 transition"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-sm px-3 py-1 bg-destructive text-destructive-foreground rounded-lg hover:opacity-80 transition"
                  >
                    Sil
                  </button>
                </div>
              </div>
              <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>
              <p className="text-xs text-muted-foreground mt-3">
                {new Date(post.created_at).toLocaleDateString('tr-TR')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
