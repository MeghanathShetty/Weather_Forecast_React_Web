import React, { useEffect } from 'react';

export const PreloadVideos = () => {
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetch('/allVideoPaths.json');
        const videoPaths = await response.json();

        videoPaths.forEach((path) => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'video';
          link.href = (process.env.PUBLIC_URL || '') + path;
          document.head.appendChild(link);
          console.log(`Video preloaded: ${path}`);
          console.log(`Video preloaded: ${link.href}`);
        });
      } catch (error) {
        console.error('Error preloading videos:', error);
      }
    };

    loadVideos();
  }, []);

  return null;
};
