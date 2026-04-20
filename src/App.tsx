import React, { useState } from 'react';
// import WeeklyStats from './components/WeeklyStats';
import SelloQuestionnaires from './components/SelloQuestionnaires';

// type View = 'weekly' | 'questionnaires';
type View = 'questionnaires';

const App: React.FC = () => {
  // const [currentView, setCurrentView] = useState<View>('weekly');
  const [currentView, setCurrentView] = useState<View>('questionnaires');

  const renderView = () => {
    switch (currentView) {
      // case 'weekly':
      //   return <WeeklyStats />;
      case 'questionnaires':
        return <SelloQuestionnaires />;
      default:
        return <SelloQuestionnaires />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: '#2c3e50',
        padding: '1rem 20px',
        display: 'flex',
        gap: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* <button
          onClick={() => setCurrentView('weekly')}
          style={{
            backgroundColor: currentView === 'weekly' ? '#3498db' : 'transparent',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            letterSpacing: '0.01em'
          }}
          onMouseEnter={(e) => {
            if (currentView !== 'weekly') {
              (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(52, 152, 219, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentView !== 'weekly') {
              (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
            }
          }}
        >
          📊 Weekly Statistics
        </button> */}
        <button
          onClick={() => setCurrentView('questionnaires')}
          style={{
            backgroundColor: currentView === 'questionnaires' ? '#3498db' : 'transparent',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            letterSpacing: '0.01em'
          }}
          onMouseEnter={(e) => {
            if (currentView !== 'questionnaires') {
              (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(52, 152, 219, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentView !== 'questionnaires') {
              (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
            }
          }}
        >
          📝 Sello Questionnaires
        </button>
      </nav>

      {/* Main Content */}
      <main>
        {renderView()}
      </main>
    </div>
  );
};

export default App;