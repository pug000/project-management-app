import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from 'pages/HomePage/HomePage';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Footer from 'components/Footer/Footer';

function App() {
  return (
    <>
      <header>Header</header>
      <ErrorBoundary>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="signin" element={<main>SignIn</main>} />
          <Route path="signup" element={<main>SignUp</main>} />
          <Route path="board" element={<main>Board</main>} />
          <Route path="*" element={<main>NotFound</main>} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default App;
