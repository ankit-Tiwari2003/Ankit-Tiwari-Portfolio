import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sendEmail } from '@/app/actions/send-email.js';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';
import { addCardHoverEffect } from '../utils/hoverEffects.js';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { alert, showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    // Animate contact heading
    gsap.set('.contact-heading', { opacity: 0, y: 30 });
    gsap.to('.contact-heading', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-heading',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Animate form with faster stagger
    gsap.set('.field-input, .field-label, .field-btn', { opacity: 0, y: 20 });
    gsap.to('.field-input, .field-label, .field-btn', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-container',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    // Add input focus effects with proper cleanup
    const inputs = document.querySelectorAll('.field-input');
    const focusHandlers = [];

    inputs.forEach((input) => {
      const handleFocus = () => {
        gsap.to(input, {
          boxShadow: '0 0 18px rgba(100, 255, 218, 0.25)',
          borderColor: '#64ffda',
          duration: 0.15,
        });
      };

      const handleBlur = () => {
        gsap.to(input, {
          boxShadow: 'none',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          duration: 0.15,
        });
      };

      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      
      focusHandlers.push({ input, handleFocus, handleBlur });
    });

    // Cleanup event listeners on unmount
    return () => {
      focusHandlers.forEach(({ input, handleFocus, handleBlur }) => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
      
      // Kill all GSAP animations for this component
      gsap.killTweensOf('.contact-heading, .field-input, .field-label, .field-btn');
    };
  }, []);

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
          <h3 className="head-text contact-heading">Let's talk</h3>
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
