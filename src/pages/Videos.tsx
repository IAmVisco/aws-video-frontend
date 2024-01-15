import { Box, Button, Grid, Heading, Icon, Spinner, Text, VStack } from '@chakra-ui/react';
import { MdReplay } from 'react-icons/md';
import { VideoCard } from '../components/VideoCard.tsx';
import { useVideos } from '../hooks/useVideos.ts';

export const Videos = () => {
  const { videos, isLoading, error } = useVideos();

  if (error) return <Text color="red.300">{error}</Text>;
  if (isLoading)
    return (
      <VStack>
        <Spinner color="teal.500" size="xl" thickness="4px" mt={10} />
      </VStack>
    );
  if (!isLoading && !videos.length) {
    return (
      <VStack>
        <Text fontSize="2xl" my={10}>
          No videos :(
        </Text>
        <Button colorScheme="teal" onClick={() => window.location.reload()}>
          Reload <Icon ml={1} as={MdReplay} />
        </Button>
      </VStack>
    );
  }

  return (
    <Box m={5}>
      <Heading mb={7}>My videos</Heading>
      <Grid gap={5} templateColumns={['auto', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </Grid>
    </Box>
  );
};
