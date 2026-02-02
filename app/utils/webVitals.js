/**
 * Web Vitals monitoring for performance analytics
 * Tracks Core Web Vitals: LCP, FID/INP, CLS
 */

export function onCLS(metric) {
  console.debug('CLS:', metric);
  // Send to analytics endpoint
  reportMetric('CLS', metric);
}

export function onFID(metric) {
  console.debug('FID:', metric);
  reportMetric('FID', metric);
}

export function onFCP(metric) {
  console.debug('FCP:', metric);
  reportMetric('FCP', metric);
}

export function onLCP(metric) {
  console.debug('LCP:', metric);
  reportMetric('LCP', metric);
}

export function onTTFB(metric) {
  console.debug('TTFB:', metric);
  reportMetric('TTFB', metric);
}

export function onINP(metric) {
  console.debug('INP:', metric);
  reportMetric('INP', metric);
}

/**
 * Report metrics to your analytics service
 */
function reportMetric(name, metric) {
  // Only send in production
  if (process.env.NODE_ENV === 'production') {
    try {
      // Example: send to your analytics endpoint
      const url = '/api/metrics';
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, JSON.stringify({
          name,
          value: metric.value,
          delta: metric.delta,
          id: metric.id,
          timestamp: new Date().toISOString(),
        }));
      } else {
        fetch(url, {
          method: 'POST',
          keepalive: true,
          body: JSON.stringify({
            name,
            value: metric.value,
            delta: metric.delta,
            id: metric.id,
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {
          // Silently fail if metrics endpoint is unavailable
        });
      }
    } catch (error) {
      // Metrics should not break the app
      console.error('Failed to report metric:', error);
    }
  }
}
