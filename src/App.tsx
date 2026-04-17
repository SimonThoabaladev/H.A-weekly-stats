import React from 'react';
import WeeklyStats from './components/WeeklyStats';

const App: React.FC = () => {

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>

      {/* Main Content */}
      <main>
        <WeeklyStats />
      </main>
    </div>
  );
};

export default App;