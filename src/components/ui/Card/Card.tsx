import * as React from 'react';
import { cn } from '@/lib/utils';
import type { CardProps } from './Card.types';
import styles from './Card.module.scss';

export type { CardProps } from './Card.types';

const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  { as: Component = 'div', className, ...props },
  ref,
) {
  return React.createElement(Component, {
    ...(props as React.HTMLAttributes<HTMLElement>),
    ref,
    'data-slot': 'card',
    className: cn(styles['ui-card'], className),
  });
});

Card.displayName = 'Card';

export { Card };
