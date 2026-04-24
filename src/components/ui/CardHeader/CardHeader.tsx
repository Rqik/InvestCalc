import { cn } from '@/lib/utils';
import type { CardHeaderProps } from './CardHeader.types';

export type { CardHeaderProps } from './CardHeader.types';

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn('section-header ui-card__header', className)}
      {...props}
    />
  );
}

export { CardHeader };


