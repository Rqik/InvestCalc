import { cn } from '@/lib/utils';
import type { CardFooterProps } from './CardFooter.types';
import styles from './CardFooter.module.scss';

export type { CardFooterProps } from './CardFooter.types';

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(styles['ui-card__footer'], className)}
      {...props}
    />
  );
}

export { CardFooter };
