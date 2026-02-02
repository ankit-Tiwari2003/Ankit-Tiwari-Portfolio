import dynamic from 'next/dynamic';

/**
 * Lazy load 3D components only on client, with fallback
 */
export const LazyCanvas = dynamic(
  () => import('@react-three/fiber').then(mod => mod.Canvas),
  {
    loading: () => <div className="w-full h-full bg-black-300 animate-pulse rounded-lg" />,
    ssr: false,
  }
);

export const LazyGlobe = dynamic(
  () => import('react-globe.gl'),
  {
    loading: () => <div className="w-full h-[326px] bg-black-300 animate-pulse rounded-lg" />,
    ssr: false,
  }
);

export const LazyDeveloper = dynamic(
  () => import('./DemoComputer.jsx'),
  {
    loading: () => <div className="w-full h-full bg-black-300 animate-pulse rounded-lg" />,
    ssr: false,
  }
);
