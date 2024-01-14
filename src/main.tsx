import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Hero } from './components/Hero.tsx';
import { BaseLayout } from './layouts/BaseLayout.tsx';
import { theme } from './theme.ts';

const Home = () => (
  <BaseLayout>
    <Hero />
  </BaseLayout>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
