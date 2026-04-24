import { cn } from '@/lib/utils';
import type { AlertProps, AlertVariant } from './Alert.types';

const alertVariantClasses: Record<AlertVariant, string> = {
  default: 'ui-alert--default',
  warning: 'ui-alert--warning',
  destructive: 'ui-alert--destructive',
};

function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn('ui-alert', alertVariantClasses[variant ?? 'default'], className)}
      {...props}
    />
  );
}

export { Alert };

