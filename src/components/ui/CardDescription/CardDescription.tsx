import { cn } from '@/lib/utils';
import type { CardDescriptionProps } from './CardDescription.types';

export type { CardDescriptionProps } from './CardDescription.types';

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn('section-header__description ui-card__description', className)}
      {...props}
    />
  );
}

export { CardDescription };


