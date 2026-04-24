import * as React from 'react';
import { cn } from '@/lib/utils';
import type { InputProps } from './Input.types';
import styles from './Input.module.scss';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        data-slot="input"
        type={type}
        className={cn(styles['ui-input'], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
