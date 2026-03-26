import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // CREATE - Mesaj gönder
  const handleSubmit = async () => {
    if (!name || !email || !message) return
    setLoading(true)
    const { error } = await supabase
      .from('messages')
      .insert([{ name, email, message }])
    if (!error) {
      setName('')
      setEmail('')
      setMessage('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">İletişim</h1>
        <p className="text-muted-foreground text-center mb-10">
          Benimle iletişime geçmek için formu doldurabilirsiniz.
        </p>

        <div className="bg-card border border-border rounded-xl p-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Ad Soyad</label>
            <input
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground"
              placeholder="Adınız"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">E-posta</label>
            <input
              type="email"
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground"
              placeholder="email@ornek.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Mesaj</label>
            <textarea
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground h-36 resize-none"
              placeholder="Mesajınız..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>

          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-sm">
              Mesajınız başarıyla gönderildi!
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            {loading ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </div>
      </div>
    </div>
  )
}
