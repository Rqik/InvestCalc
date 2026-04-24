import { cn } from '@/lib/utils';
import type { AlertProps, AlertVariant } from './Alert.types';
import styles from './Alert.module.scss';

const alertVariantClasses: Record<AlertVariant, string> = {
  default: styles['ui-alert--default'],
  warning: styles['ui-alert--warning'],
  destructive: styles['ui-alert--destructive'],
};

function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(styles['ui-alert'], alertVariantClasses[variant ?? 'default'], className)}
      {...props}
    />
  );
}

export { Alert };
