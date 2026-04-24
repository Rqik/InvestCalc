import { cn } from '@/lib/utils';
import type { CardContentProps } from './CardContent.types';

export type { CardContentProps } from './CardContent.types';

function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn('ui-card__content', className)}
      {...props}
    />
  );
}

export { CardContent };


