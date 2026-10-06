import React, { useState } from 'react'
import './App.css'

export default function ContactFormTest({ endpoint = '/api/contact', className = '' }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function validate() {
    if (name.trim().length < 2) return 'Te rog introdu un nume valid.'
    if (!/^\+?[0-9\s-]{7,15}$/.test(phone)) return 'Te rog introdu un număr de telefon valid.'
    if (!emailRegex.test(email)) return 'Te rog introdu o adresă de email validă.'
    if (message.trim().length < 5) return 'Mesajul trebuie să aibă cel puțin 5 caractere.'
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      const payload = { name, phone, email, message }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Eroare la trimitere. Încearcă din nou.')

      setSuccess('Mesajul a fost trimis cu succes!')
      setName('')
      setPhone('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={`contact-test ${className}`}>
      <h2>Contact</h2>
      <form className="contact-test__fields" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Nume</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="form-field">
          <span>Telefon</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>

        <label className="form-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="form-field">
          <span>Mesaj</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="contact-test__button"
        >
          {loading ? 'Se trimite...' : 'Trimite'}
        </button>

        {error && <p className="contact-test__message contact-test__message--error">{error}</p>}
        {success && <p className="contact-test__message contact-test__message--success">{success}</p>}
      </form>
    </section>
  )
}
