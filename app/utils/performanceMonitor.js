/**
 * Performance monitoring and diagnostics
 * Track page load, rendering, and interaction performance
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    if (typeof window !== 'undefined') {
      this.measurePageLoad();
      this.monitorCoreWebVitals();
    }
  }

  measurePageLoad() {
    if (!('performance' in window)) return;

    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      
      this.metrics.pageLoadTime = pageLoadTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 Page Load Time: ${pageLoadTime}ms`);
      }
    });
  }

  monitorCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported
      }

      // Cumulative Layout Shift (CLS)
      try {
        let cls = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          }
          this.metrics.cls = cls;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // CLS not supported
      }

      // First Input Delay (FID) / Interaction to Next Paint (INP)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            this.metrics.fid = entry.processingDuration;
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID not supported
      }
    }
  }

  getMetrics() {
    return this.metrics;
  }

  logMetrics() {
    if (process.env.NODE_ENV === 'development') {
      console.group('⚡ Performance Metrics');
      console.table(this.metrics);
      console.groupEnd();
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();

export const getPerformanceReport = () => {
  return performanceMonitor.getMetrics();
};
