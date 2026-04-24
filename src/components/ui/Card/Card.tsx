import * as React from 'react';
import { cn } from '@/lib/utils';
import type { CardProps } from './Card.types';

export type { CardProps } from './Card.types';

function Card({ as: Component = 'div', className, ...props }: CardProps) {
  return React.createElement(Component, {
    ...(props as React.HTMLAttributes<HTMLElement>),
    'data-slot': 'card',
    className: cn('panel ui-card', className),
  });
}

export { Card };


