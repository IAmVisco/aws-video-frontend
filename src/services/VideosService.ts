import axios, { Axios } from 'axios';
import { Dispatch, SetStateAction } from 'react';

export interface Video {
  id: string;
  title: string;
  fileName: string;
  description?: string;
  createdAt: string;
  authorId: string;
}

export interface VideoFormValues {
  title: string;
  description: string;
  video: File;
}

class VideosService {
  private readonly axios: Axios;

  constructor() {
    this.axios = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/videos`,
    });
  }

  async getVideos(): Promise<{ videos: Video[]; count: number }> {
    const { data } = await this.axios.get<{ videos: Video[]; count: number }>('/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return data;
  }

  async uploadVideo(
    { title, description, video }: VideoFormValues,
    setProgress: Dispatch<SetStateAction<number>>,
  ): Promise<void> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', video);

    await this.axios.post('/upload', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress(progressEvent) {
        if (progressEvent.total) setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
      },
    });
  }
}

export const videosService = new VideosService();
