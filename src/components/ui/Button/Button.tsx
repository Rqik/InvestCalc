import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

const buttonVariantClasses: Record<ButtonVariant, string> = {
  default: 'ui-button--default',
  primary: 'ui-button--primary',
  destructive: 'ui-button--destructive',
  outline: 'ui-button--outline',
  secondary: 'ui-button--secondary',
  ghost: 'ui-button--ghost',
  link: 'ui-button--link',
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  default: 'ui-button--default-size',
  sm: 'ui-button--sm',
  lg: 'ui-button--lg',
  icon: 'ui-button--icon',
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
    'ui-button',
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
