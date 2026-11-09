import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-text-secondary font-medium">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full bg-bg-input border border-border-default rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200 focus:border-border-focus focus:ring-1 focus:ring-border-focus/30 hover:border-[#333] ${className}`}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
