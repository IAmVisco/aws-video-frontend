import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero.tsx';
import { useUser } from '../hooks/useUser.ts';
import { BaseLayout } from '../layouts/BaseLayout.tsx';

export const Home = () => {
  const user = useUser();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (user) navigate('/videos');
  }, [navigate, user]);

  return (
    <BaseLayout>
      <Hero />
    </BaseLayout>
  );
};
