import type React from 'react';

export type AlertVariant = 'default' | 'warning' | 'destructive';

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
};

