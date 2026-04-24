import { cn } from '@/lib/utils';
import type { CardTitleProps } from './CardTitle.types';
import styles from './CardTitle.module.scss';

export type { CardTitleProps } from './CardTitle.types';

function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn(styles['ui-card__title'], className)}
      {...props}
    />
  );
}

export { CardTitle };
