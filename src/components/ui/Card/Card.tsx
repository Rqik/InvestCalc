import * as React from 'react';
import { cn } from '@/lib/utils';
import type { CardProps } from './Card.types';
import styles from './Card.module.scss';

export type { CardProps } from './Card.types';

function Card({ as: Component = 'div', className, ...props }: CardProps) {
  return React.createElement(Component, {
    ...(props as React.HTMLAttributes<HTMLElement>),
    'data-slot': 'card',
    className: cn(styles['ui-card'], className),
  });
}

export { Card };
