'use client';

import useCount from '@/hooks/useCount';
import { useEffect, useState, useRef } from 'react';

interface TypingEffectProps {
  strings: string[];
  speed?: number;
  delay?: number;
  className?: string;
}

const TypingEffect = ({
  strings,
  speed = 100,
  delay = 1000,
  className = '',
}: TypingEffectProps) => {
  const { count: stringIndex, increment: nextString } = useCount({
    max: strings.length - 1,
    cycle: true,
  });

  const {
    count: charIndex,
    increment: typeChar,
    decrement: deleteChar,
    isAtMax: isAtLastChar,
    isAtMin: isAtFirstChar,
  } = useCount({ max: strings[stringIndex].length });
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = isDeleting ? speed / 2 : speed;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTyping = () => {
      if (isDeleting) {
        deleteChar();
      } else {
        typeChar();
      }

      if (!isDeleting && isAtLastChar) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && isAtFirstChar) {
        setIsDeleting(false);
        nextString();
      }
    };

    timeoutRef.current = setTimeout(handleTyping, typingSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    charIndex,
    isDeleting,
    speed,
    delay,
    strings,
    stringIndex,
    deleteChar,
    isAtFirstChar,
    isAtLastChar,
    nextString,
    typeChar,
    typingSpeed,
  ]);

  return (
    <span className={className}>
      {strings[stringIndex].substring(0, charIndex)}
      <span className='animate-blink border-r-dark border-r-2'></span>
    </span>
  );
};

export default TypingEffect;
