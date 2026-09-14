import type { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// Native controls for the imported viewer; match this site's existing styles.
export function Button({ variant = 'outline', size = 'sm', className = '', type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'outline' | 'default' | 'destructive' | 'ghost';
  size?: 'sm' | 'icon' | 'default';
}) {
  const color = variant === 'destructive' ? 'bg-red-600 text-white' : variant === 'default' ? 'bg-sn-green text-white' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50';
  return <button type={type} {...props} className={`inline-flex items-center justify-center rounded-md text-sm font-medium disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sn-green ${size === 'icon' ? 'h-9 w-9' : 'px-3 py-2'} ${color} ${className}`} />;
}

export function Checkbox({ onCheckedChange, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { onCheckedChange?: (checked: boolean) => void }) {
  return <input {...props} type="checkbox" onChange={event => onCheckedChange?.(event.target.checked)} className="h-4 w-4 accent-sn-green" />;
}
