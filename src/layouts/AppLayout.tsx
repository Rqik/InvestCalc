import type { ReactNode } from 'react';

type AppLayoutProps = {
  hero: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
};

export function AppLayout({ hero, sidebar, content }: AppLayoutProps) {
  return (
    <main className="app">
      {hero}

      <section className="app__layout">
        <div className="app__sidebar">{sidebar}</div>
        <div className="app__content">{content}</div>
      </section>
    </main>
  );
}
