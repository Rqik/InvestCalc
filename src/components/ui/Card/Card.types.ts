import type React from 'react';

export type CardElement = 'article' | 'aside' | 'div' | 'footer' | 'nav' | 'section';

export type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: CardElement;
};

