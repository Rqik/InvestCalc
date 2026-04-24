import { cn } from '@/lib/utils';
import type { CardContentProps } from './CardContent.types';
import styles from './CardContent.module.scss';

export type { CardContentProps } from './CardContent.types';

function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn(styles['ui-card__content'], className)}
      {...props}
    />
  );
}

export { CardContent };
