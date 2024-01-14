import { Card, CardBody, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useUser } from '../hooks/useUser.ts';
import { Video } from '../services/VideosService.ts';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

export const VideoCard = ({ video }: { video: Video }) => {
  const user = useUser();

  return (
    <Card maxW="sm" bg={useColorModeValue('gray.100', 'gray.700')} shadow="md">
      <CardBody>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video src={`${CLOUDFRONT_URL}/${user?.name}/${video.fileName}`} controls />
        <Stack mt="6" spacing="3">
          bg={useColorModeValue('gray.100', 'gray.700')}
          <Heading size="md">{video.title}</Heading>
          <Text>{video.description}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};
