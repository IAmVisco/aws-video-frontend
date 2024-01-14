import { Spinner, Text } from '@chakra-ui/react';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser.ts';
import { useVideos } from '../hooks/useVideos.ts';
import { BaseLayout } from '../layouts/BaseLayout.tsx';

export const Videos = () => {
  const user = useUser();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!user) navigate('/');
  }, [navigate, user]);

  const { videos, isLoading, error } = useVideos();

  return (
    <BaseLayout>
      {error ? <Text color="red.300">{error}</Text> : null}
      {isLoading ? <Spinner color="teal.500" size="xl" thickness="4px" /> : null}
      {!isLoading && !videos.length ? <Text fontSize="2xl">No videos :(</Text> : null}
      {videos.map((video) => (
        <div key={video.id}>{video.title}</div>
      ))}
    </BaseLayout>
  );
};
