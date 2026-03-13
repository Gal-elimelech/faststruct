import { motion } from 'motion/react';

interface FormMessageProps {
  type: 'success' | 'error';
  text: string;
}

const FormMessage = ({ type, text }: FormMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg p-4 ${
        type === 'success'
          ? 'bg-accent/20 text-accent border-accent/30 border'
          : 'border border-red-500/30 bg-red-500/20 text-red-400'
      }`}>
      <p className='text-sm font-medium'>{text}</p>
    </motion.div>
  );
};

export default FormMessage;
