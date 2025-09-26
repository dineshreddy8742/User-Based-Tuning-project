import { useEffect } from 'react';
import './animations.css';

function Stars() {
  useEffect(() => {
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
      // Clear any existing stars
      starsContainer.innerHTML = '';
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        star.style.animationDuration = `${Math.random() * 2 + 3}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
      }
    }

    return () => {
      if (starsContainer) {
        starsContainer.innerHTML = '';
      }
    };
  }, []);

  return <div className="stars"></div>;
}

export default Stars;
