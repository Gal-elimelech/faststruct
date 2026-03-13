import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

/**
 * FormattedText Component
 *
 * Parses text with ** markers and renders bold text.
 * Text between ** markers will be rendered as <strong> elements.
 *
 * Example:
 * "This is **bold text** and this is normal."
 * Renders: "This is <strong>bold text</strong> and this is normal."
 */
const FormattedText = ({ text, className = '' }: FormattedTextProps) => {
  // Split text by ** markers
  const parts = text.split('**');

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Odd indices are bold (between ** markers)
        // Even indices are normal text
        if (index % 2 === 1) {
          return <strong key={index}>{part}</strong>;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};

export default FormattedText;
