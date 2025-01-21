import { useState, useEffect } from 'react';

const AudioPlayer = () => {
  const [audio] = useState(new Audio());

  useEffect(() => {
    audio.autoplay = true;
    audio.loop = true;
    audio.src = '/background-theme.mp3';
    audio.load();

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audio]);

  const handleUserInteraction = () => {
    audio.play().catch((err) => {
      console.error('Error playing audio:', err);
    });
  };

  useEffect(() => {
    window.addEventListener('click', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
    };
  });

  return <></>;
};

export default AudioPlayer;