import { cn } from '@/lib/utils';
import type { AlertTitleProps } from './AlertTitle.types';

export type { AlertTitleProps } from './AlertTitle.types';

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <h5
      data-slot="alert-title"
      className={cn('ui-alert__title', className)}
      {...props}
    />
  );
}

export { AlertTitle };


