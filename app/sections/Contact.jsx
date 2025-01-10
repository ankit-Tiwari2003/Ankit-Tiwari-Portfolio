import { useState } from 'react';
import { sendEmail } from '@/app/actions/send-email.js';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const { alert, showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await sendEmail(new FormData(e.target));
      if (result.success) {
        showAlert({
          show: true,
          text: 'Thank you for your message 😃',
          type: 'success',
        });
        setForm({ name: '', email: '', message: '' })
      } else {
        showAlert({
          show: true,
          text: "I didn't receive your message 😢",
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert({
        show: true,
        text: 'Something went wrong 😢',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section className="c-space my-10 mb-5" id="contact">
      {alert.show && <Alert {...alert} />}
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <div className="absolute top-0 left-0 right-0 h-[100%] sm:h-[100%]">
          <img 
            src="/assets/terminal.png" 
            alt="terminal-bg" 
            className="w-full h-full object-fill" 
          />
        </div>
        <div className="contact-container lg:py-8 py-7">
          <h3 className="head-text">Let's talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you're looking to build a new website, improve your existing platform, or bring a unique project to
            life, I'm here to help.
          </p>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
          <label className="space-y-3">
            <span className="field-label">Full Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="field-input"
              placeholder="ex., John Doe"
            />
          </label>

          <label className="space-y-3">
            <span className="field-label">Email address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="field-input"
              placeholder="ex., johndoe@gmail.com"
            />
          </label>

          <label className="space-y-3">
            <span className="field-label">Your message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="field-input"
              placeholder="Share your thoughts or inquiries..."
            />
          </label>

          <button className="field-btn" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}

            <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
          </button>
        </form>
      </div>
    </div>
  </section>
  );
};

export default Contact;
