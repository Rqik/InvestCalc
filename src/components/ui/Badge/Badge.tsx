import { cn } from '@/lib/utils';
import type { BadgeProps, BadgeVariant } from './Badge.types';

const badgeVariantClasses: Record<BadgeVariant, string> = {
  default: 'ui-badge--default',
  secondary: 'ui-badge--secondary',
  destructive: 'ui-badge--destructive',
  outline: 'ui-badge--outline',
};

function badgeVariants({
  variant = 'default',
  className,
}: {
  variant?: BadgeVariant | null;
  className?: string;
}) {
  return cn('ui-badge', badgeVariantClasses[variant ?? 'default'], className);
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div data-slot="badge" className={badgeVariants({ variant, className })} {...props} />
  );
}

export { Badge, badgeVariants };
