import { cn } from '@/lib/utils';
import type { CardFooterProps } from './CardFooter.types';

export type { CardFooterProps } from './CardFooter.types';

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn('ui-card__footer', className)}
      {...props}
    />
  );
}

export { CardFooter };


