import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const HeroCamera = ({ isMobile, children }) => {
  const group = useRef();
  const lastUpdateRef = useRef(0);

  useFrame((state, delta) => {
    // Cap frame rate for better consistency (60fps max)
    const clampedDelta = Math.min(delta, 0.0166);
    
    // Reduce pointer tracking updates on mobile for performance
    if (isMobile) {
      easing.damp3(state.camera.position, [0, 0, 20], 0.2, clampedDelta);
    } else {
      // Desktop with smooth pointer following
      easing.damp3(state.camera.position, [0, 0, 20], 0.25, clampedDelta);
      
      if (group.current) {
        // Throttle pointer updates for better performance
        lastUpdateRef.current += delta;
        if (lastUpdateRef.current > 0.016) { // ~60fps update cap
          easing.dampE(
            group.current.rotation, 
            [-state.pointer.y / 3, state.pointer.x / 5, 0], 
            0.22, 
            clampedDelta
          );
          lastUpdateRef.current = 0;
        }
      }
    }
  });

  return <group ref={group}>{children}</group>;
};

export default HeroCamera;