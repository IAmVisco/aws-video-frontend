import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/LoginForm.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { BaseLayout } from './layouts/BaseLayout.tsx';
import { Home } from './pages/Home.tsx';
import { Videos } from './pages/Videos.tsx';
import { theme } from './theme.ts';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<LoginForm mode="signup" />} />
            <Route path="/login" element={<LoginForm mode="login" />} />
            <Route
              path="/videos"
              element={
                <ProtectedRoute>
                  <Videos />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BaseLayout>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
