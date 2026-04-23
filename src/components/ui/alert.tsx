import * as React from 'react';
import { cn } from '@/lib/utils';

type AlertVariant = 'default' | 'warning' | 'destructive';

const alertVariantClasses: Record<AlertVariant, string> = {
  default: 'ui-alert--default',
  warning: 'ui-alert--warning',
  destructive: 'ui-alert--destructive',
};

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: AlertVariant }
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert"
    role="alert"
    className={cn('ui-alert', alertVariantClasses[variant ?? 'default'], className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    data-slot="alert-title"
    className={cn('ui-alert__title', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-description"
    className={cn('ui-alert__description', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
