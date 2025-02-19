import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SwaggerToRestAssuredPage from './components/SwaggerToRestAssuredPage';
import SeleniumToPlaywrightPage from './components/SeleniumToPlaywrightPage';
import GenerateManualTestCases from './components/GenerateManualTestCases';
import ConfigPage from './components/ConfigPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/generate" element={<SwaggerToRestAssuredPage />} />
            <Route path="/selenium-to-playwright" element={<SeleniumToPlaywrightPage />} />
            <Route path="/generate-manual-testcases" element={<GenerateManualTestCases />} />
            <Route path="/config" element={<ConfigPage />} />
    
            {/* Default route */}
            <Route path="/" element={<SwaggerToRestAssuredPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
