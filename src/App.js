import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:segment" element={<Home />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
