import { cn } from '@/lib/utils';
import type { AlertDescriptionProps } from './AlertDescription.types';
import styles from './AlertDescription.module.scss';

export type { AlertDescriptionProps } from './AlertDescription.types';

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={cn(styles['ui-alert__description'], className)}
      {...props}
    />
  );
}

export { AlertDescription };
