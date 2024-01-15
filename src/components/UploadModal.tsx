import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Stack,
  Text,
  Textarea,
  UseDisclosureReturn,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { VideoFormValues, videosService } from '../services/VideosService.ts';

export const UploadModal = ({ isOpen, onClose }: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    reset,
    resetField,
    setError,
  } = useForm<VideoFormValues>();
  const toast = useToast();
  const [progress, setProgress] = useState(0);
  const [title, video] = getValues(['title', 'video']);

  const onCloseModal = () => {
    reset();
    onClose();
  };

  const onSubmit = (values: VideoFormValues) => {
    if (!video?.name) {
      setError('video', { message: 'Video is required', type: 'required' });
      return;
    }
    // eslint-disable-next-line consistent-return
    return videosService
      .uploadVideo(values, setProgress)
      .then(() => {
        toast({
          title: 'Video uploaded',
          description: 'The video is processing. Check back in a bit.',
          status: 'success',
          duration: 3000,
        });
        onCloseModal();
      })
      .catch((e) => {
        console.error(e);
        toast({
          title: 'Something went wrong',
          description: 'Check console or come back later.',
          status: 'error',
          duration: 3000,
        });
      })
      .finally(() => {
        setProgress(0);
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'video/mp4': ['.mp4'],
      'video/webm': ['.webm'],
    },
    onDropAccepted: (files) => {
      setValue('video', files[0]);
      if (!title) {
        setValue('title', files[0].name);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload video</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormControl isRequired isInvalid={!!errors.title}>
                <Input
                  id="title"
                  placeholder="Title"
                  type="text"
                  {...register('title', {
                    required: 'Title is required',
                    minLength: { value: 6, message: 'Minimum length should be 6' },
                  })}
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                <Text
                  fontSize="sm"
                  mt={2}
                  lineHeight="normal"
                  display={{ base: errors.title?.message ? 'none' : 'inherit' }}
                >
                  &nbsp;
                </Text>
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
                <InputGroup>
                  <Textarea
                    id="description"
                    placeholder="Description"
                    {...register('description')}
                    rows={3}
                    resize="none"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                <Text
                  fontSize="sm"
                  mt={2}
                  lineHeight="normal"
                  display={{ base: errors.description?.message ? 'none' : 'inherit' }}
                >
                  &nbsp;
                </Text>
              </FormControl>
              <FormControl isInvalid={!!errors.video}>
                <InputGroup>
                  <Box
                    {...getRootProps({ className: 'dropzone' })}
                    border="2px dashed"
                    cursor="pointer"
                    w="100%"
                    p={8}
                    rounded={4}
                    display={video?.name ? 'none' : 'initial'}
                  >
                    {/* @ts-expect-error */}
                    <Input {...getInputProps()} {...register('video')} />
                    <Text align="center">
                      {isDragActive ? 'Drop the files here...' : 'Drop some files here, or click to select files'}
                    </Text>
                  </Box>
                  {video?.name && (
                    <HStack justify="space-between" align="center" w="100%">
                      <Text fontSize={18}>{video.name}</Text>
                      <Icon
                        as={MdClose}
                        color="red.500"
                        cursor="pointer"
                        onClick={() => {
                          resetField('video');
                        }}
                      />
                    </HStack>
                  )}
                </InputGroup>
                <FormErrorMessage>{errors.video?.message}</FormErrorMessage>
                <Text
                  fontSize="sm"
                  mt={2}
                  lineHeight="normal"
                  display={{ base: errors.video?.message ? 'none' : 'inherit' }}
                >
                  &nbsp;
                </Text>
              </FormControl>

              {progress ? <Progress value={progress} mb={2} rounded="md" size="sm" /> : null}

              <Button
                loadingText="Uploading"
                size="lg"
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                mb={2}
              >
                Upload
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
