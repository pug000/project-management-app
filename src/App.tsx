import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from 'pages/HomePage/HomePage';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <>
      <div>Header</div>
      <Routes>
        <Route
          index
          path="/"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route path="signin" element={<div>SignIn</div>} />
        <Route path="signup" element={<div>SignUp</div>} />
        <Route path="board" element={<div>Board</div>} />
        <Route path="*" element={<div>NotFound</div>} />
      </Routes>
      <div>Footer</div>
    </>
  );
}

export default App;
