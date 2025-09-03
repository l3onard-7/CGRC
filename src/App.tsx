import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { FrameworkSelection } from './pages/FrameworkSelection';
import { ProcessMapping } from './pages/ProcessMapping';
import { DPIAManagement } from './pages/DPIAManagement';
import { RiskScoring } from './pages/RiskScoring';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing');

  const handleGetStarted = () => {
    setCurrentPage('frameworks');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'frameworks':
        return <FrameworkSelection onContinue={() => setCurrentPage('process')} />;
      case 'process':
        return <ProcessMapping />;
      case 'dpia':
        return <DPIAManagement />;
      case 'risk':
        return <RiskScoring />;
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' ? (
        renderPage()
      ) : (
        <div className="flex">
          <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
          <div className="flex-1">
            {renderPage()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;