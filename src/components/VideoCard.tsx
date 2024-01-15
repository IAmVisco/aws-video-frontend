import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Icon,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { MdDelete, MdLaunch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser.ts';
import { Video, videosService } from '../services/VideosService.ts';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const convertToMMSS = (seconds: number) => new Date(seconds * 1000).toISOString().slice(14, 19);

export const VideoCard = ({ video }: { video: Video }) => {
  const user = useUser();

  const onDeleteClick = () => {
    // eslint-disable-next-line no-alert,no-restricted-globals
    const confirmed = confirm(`Delete "${video.title}"?`);
    if (confirmed)
      videosService.deleteVideo(video.id).then(() => {
        window.location.reload();
      });
  };

  return (
    <Card
      maxW="sm"
      bg={useColorModeValue('gray.200', 'gray.700')}
      shadow="md"
      transition="all 0.1s ease-in-out"
      willChange="transform"
      _hover={{
        transform: 'scale(1.02)',
      }}
    >
      <CardBody p={3}>
        <Box position="relative">
          <AspectRatio ratio={16 / 9}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video src={`${CLOUDFRONT_URL}/${user?.name}/${video.fileName}`} style={{ objectFit: 'contain' }} />
          </AspectRatio>
          {video.duration ? (
            <Tag position="absolute" right={1} bottom={1}>
              {convertToMMSS(video.duration)}
            </Tag>
          ) : null}
        </Box>
        <Link to={`${CLOUDFRONT_URL}/${user?.name}/${video.fileName}`} target="_blank" rel="noopener noreferrer">
          <Stack
            mt="6"
            spacing="3"
            _hover={{
              textDecoration: 'underline',
            }}
          >
            <Heading size="md">
              {video.title} <Icon as={MdLaunch} pt={1} />
            </Heading>
            {video.description ? (
              <Text
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  lineClamp: 2,
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {video.description}
              </Text>
            ) : null}
          </Stack>
        </Link>
        <VStack align="flex-end">
          <Button colorScheme="red" size="sm" onClick={onDeleteClick}>
            <Icon as={MdDelete} />
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};
