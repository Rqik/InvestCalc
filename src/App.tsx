import React from 'react';
import { CalculatorPage } from './pages/CalculatorPage';
import { RetirementPage } from './pages/RetirementPage';
import type { AppPage } from './types/navigation';

function getPageFromHash(): AppPage {
  return window.location.hash === '#retirement' ? 'retirement' : 'calculator';
}

function App() {
  const [activePage, setActivePage] = React.useState<AppPage>(() => getPageFromHash());

  React.useEffect(() => {
    const handleHashChange = () => setActivePage(getPageFromHash());

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: AppPage) => {
    setActivePage(page);
    window.location.hash = page === 'retirement' ? 'retirement' : 'calculator';
  };

  if (activePage === 'retirement') {
    return <RetirementPage activePage={activePage} onPageChange={handlePageChange} />;
  }

  return <CalculatorPage activePage={activePage} onPageChange={handlePageChange} />;
}

export default App;
