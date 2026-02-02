/**
 * Lightweight analytics tracking
 * Tracks user interactions without external dependencies
 */

class Analytics {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.init();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  init() {
    if (typeof window === 'undefined') return;

    // Track page views
    this.trackPageView();

    // Track button clicks
    this.trackInteractions();

    // Track scroll depth
    this.trackScrollDepth();
  }

  trackPageView() {
    const data = {
      type: 'pageview',
      url: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
    };

    this.events.push(data);

    if (process.env.NODE_ENV === 'development') {
      console.log('📍 Page View:', data);
    }
  }

  trackInteractions() {
    const interactions = ['a', 'button', '.social-icon', '.project-link'];

    document.addEventListener('click', (e) => {
      const target = e.target.closest(interactions.join(','));
      
      if (target) {
        const data = {
          type: 'click',
          element: target.tagName,
          text: target.textContent?.substring(0, 50),
          url: target.href || target.getAttribute('data-url'),
          timestamp: new Date().toISOString(),
          sessionId: this.sessionId,
        };

        this.events.push(data);

        if (process.env.NODE_ENV === 'development') {
          console.log('🖱️ Click:', data);
        }
      }
    });
  }

  trackScrollDepth() {
    let maxDepth = 0;
    const trackScroll = () => {
      const depth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      
      if (depth > maxDepth && depth % 25 === 0) {
        maxDepth = depth;
        const data = {
          type: 'scroll',
          depth: depth,
          timestamp: new Date().toISOString(),
          sessionId: this.sessionId,
        };

        this.events.push(data);

        if (process.env.NODE_ENV === 'development') {
          console.log('📜 Scroll Depth:', depth + '%');
        }
      }
    };

    window.addEventListener('scroll', trackScroll, { passive: true });
  }

  trackFormSubmit(formName) {
    const data = {
      type: 'form_submit',
      form: formName,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
    };

    this.events.push(data);

    if (process.env.NODE_ENV === 'development') {
      console.log('📝 Form Submit:', data);
    }
  }

  trackCustomEvent(eventName, data = {}) {
    const event = {
      type: 'custom',
      name: eventName,
      data,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
    };

    this.events.push(event);
  }

  getEvents() {
    return this.events;
  }
}

export const analytics = new Analytics();
