import { cn } from '@/lib/utils';
import type { AlertTitleProps } from './AlertTitle.types';
import styles from './AlertTitle.module.scss';

export type { AlertTitleProps } from './AlertTitle.types';

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <h5
      data-slot="alert-title"
      className={cn(styles['ui-alert__title'], className)}
      {...props}
    />
  );
}

export { AlertTitle };
