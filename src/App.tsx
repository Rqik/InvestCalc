import React from 'react';
import { AppMeta } from './components/AppMeta';
import { getHashForPage, getPageFromHash as getRoutePageFromHash } from './constants/routes';
import { CalculatorPage } from './pages/CalculatorPage';
import { RetirementPage } from './pages/RetirementPage';
import type { AppPage } from './types/navigation';

type ThemeMode = 'dark' | 'light';

function getInitialTheme(): ThemeMode {
  const savedTheme = window.localStorage.getItem('investcalc-theme');

  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function App() {
  const [activePage, setActivePage] = React.useState<AppPage>(
    () => getRoutePageFromHash(window.location.hash) ?? 'calculator',
  );
  const [theme, setTheme] = React.useState<ThemeMode>(() => getInitialTheme());

  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';

    const handleLocationChange = () => {
      const pageFromHash = getRoutePageFromHash(window.location.hash);

      if (pageFromHash) {
        setActivePage(pageFromHash);
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('investcalc-theme', theme);
  }, [theme]);

  const handlePageChange = (page: AppPage) => {
    setActivePage(page);
    window.history.pushState(null, '', getHashForPage(page));
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  if (activePage === 'retirement') {
    return (
      <>
        <AppMeta page={activePage} theme={theme} />
        <RetirementPage
          activePage={activePage}
          theme={theme}
          onPageChange={handlePageChange}
          onThemeToggle={handleThemeToggle}
        />
      </>
    );
  }

  return (
    <>
      <AppMeta page={activePage} theme={theme} />
      <CalculatorPage
        activePage={activePage}
        theme={theme}
        onPageChange={handlePageChange}
        onThemeToggle={handleThemeToggle}
      />
    </>
  );
}

export default App;
