import { cn } from '@/lib/utils';
import type { BadgeProps, BadgeVariant } from './Badge.types';
import styles from './Badge.module.scss';

const badgeVariantClasses: Record<BadgeVariant, string> = {
  default: styles['ui-badge--default'],
  secondary: styles['ui-badge--secondary'],
  destructive: styles['ui-badge--destructive'],
  outline: styles['ui-badge--outline'],
};

function badgeVariants({
  variant = 'default',
  className,
}: {
  variant?: BadgeVariant | null;
  className?: string;
}) {
  return cn(styles['ui-badge'], badgeVariantClasses[variant ?? 'default'], className);
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div data-slot="badge" className={badgeVariants({ variant, className })} {...props} />
  );
}

export { Badge, badgeVariants };
