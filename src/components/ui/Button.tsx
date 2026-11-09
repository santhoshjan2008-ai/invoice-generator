import type { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', icon, children, className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20',
    secondary: 'bg-bg-input border border-border-default hover:border-[#333] text-text-primary',
    danger: 'bg-danger/10 hover:bg-danger/20 text-danger border border-danger/20',
    ghost: 'hover:bg-bg-input text-text-secondary hover:text-text-primary',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...(props as any)}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
