import { cn } from '@/lib/utils';
import type { CardDescriptionProps } from './CardDescription.types';
import styles from './CardDescription.module.scss';

export type { CardDescriptionProps } from './CardDescription.types';

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn(styles['ui-card__description'], className)}
      {...props}
    />
  );
}

export { CardDescription };
