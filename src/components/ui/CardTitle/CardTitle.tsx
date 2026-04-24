import { cn } from '@/lib/utils';
import type { CardTitleProps } from './CardTitle.types';

export type { CardTitleProps } from './CardTitle.types';

function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn('section-header__title ui-card__title', className)}
      {...props}
    />
  );
}

export { CardTitle };


