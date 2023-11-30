import React, { useEffect } from 'react';

export const PreloadVideos = () => {
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetch('/allVideoPaths.json');
        const videoPaths = await response.json();

        videoPaths.forEach((path) => {
          const video = document.createElement('video');
          video.src = (process.env.PUBLIC_URL || '') + path;
          video.preload = 'auto';
          video.load();
          console.log(`Video preloaded: ${path}`);
          console.log(`Video preloaded: ${video.src}`);
        });
      } catch (error) {
        console.error('Error preloading videos:', error);
      }
    };

    loadVideos();
  }, []);

  return null;
};
