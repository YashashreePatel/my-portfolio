'use client';
import { useEffect, useState } from 'react';
import styles from '@/components/style.module.css';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [springPosition, setSpringPosition] = useState({ x: 0, y: 0 });

  const updatePosition = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const spring = () => {
    const dx = position.x - springPosition.x;
    const dy = position.y - springPosition.y;

    const newX = springPosition.x + dx * 0.2;
    const newY = springPosition.y + dy * 0.2;

    setSpringPosition({ x: newX, y: newY });

    requestAnimationFrame(spring);
  };
  
  useEffect(() => {
    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  useEffect(() => {
    spring();
  }, [position]);

  return (
    <>
      <div
        className={`${styles.inner_cursor}`}
        style={{
          left: `${springPosition.x}px`,
          top: `${springPosition.y}px`,
        }}
      />
      <div
        className={`bg-cursor-gradient ${styles.cursor}`}
        style={{
          left: `${springPosition.x}px`,
          top: `${springPosition.y}px`,
        }}
      />
    </>
  );
};

export default Cursor;
