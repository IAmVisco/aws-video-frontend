import { Button, Icon, Spinner, Text, VStack } from '@chakra-ui/react';
import { MdReplay } from 'react-icons/md';
import { useVideos } from '../hooks/useVideos.ts';

export const Videos = () => {
  const { videos, isLoading, error } = useVideos();

  if (error) return <Text color="red.300">{error}</Text>;
  if (isLoading) return <Spinner color="teal.500" size="xl" thickness="4px" />;
  if (!isLoading && !videos.length) {
    return (
      <VStack>
        <Text fontSize="2xl">No videos :(</Text>
        <Button colorScheme="teal" onClick={() => window.location.reload()}>
          Reload <Icon ml={1} as={MdReplay} />
        </Button>
      </VStack>
    );
  }

  return (
    <>
      {videos.map((video) => (
        <div key={video.id}>{video.title}</div>
      ))}
    </>
  );
};
