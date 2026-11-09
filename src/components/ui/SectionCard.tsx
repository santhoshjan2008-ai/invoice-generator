import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  delay?: number;
}

export default function SectionCard({ title, icon, children, delay = 0 }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-bg-card border border-border-default rounded-2xl p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2.5 mb-5">
        {icon && (
          <div className="text-accent">
            {icon}
          </div>
        )}
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}
