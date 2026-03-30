import { Routes, Route } from 'react-router-dom';
import type { ReactElement } from 'react';

function App(): ReactElement {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">PERN Architecture</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<div className="text-lg">Welcome to PERN Architecture</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;