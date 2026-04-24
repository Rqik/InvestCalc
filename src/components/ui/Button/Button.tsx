import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';
import styles from './Button.module.scss';

const buttonVariantClasses: Record<ButtonVariant, string> = {
  default: styles['ui-button--default'],
  primary: styles['ui-button--primary'],
  destructive: styles['ui-button--destructive'],
  outline: styles['ui-button--outline'],
  secondary: styles['ui-button--secondary'],
  ghost: styles['ui-button--ghost'],
  link: styles['ui-button--link'],
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  default: styles['ui-button--default-size'],
  sm: styles['ui-button--sm'],
  lg: styles['ui-button--lg'],
  icon: styles['ui-button--icon'],
};

function buttonVariants({
  variant = 'default',
  size = 'default',
  className,
}: {
  variant?: ButtonVariant | null;
  size?: ButtonSize | null;
  className?: string;
}) {
  return cn(
    styles['ui-button'],
    buttonVariantClasses[variant ?? 'default'],
    buttonSizeClasses[size ?? 'default'],
    className
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        data-slot="button"
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
