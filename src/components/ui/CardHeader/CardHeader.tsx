import { cn } from '@/lib/utils';
import type { CardHeaderProps } from './CardHeader.types';
import styles from './CardHeader.module.scss';

export type { CardHeaderProps } from './CardHeader.types';

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(styles['ui-card__header'], className)}
      {...props}
    />
  );
}

export { CardHeader };
