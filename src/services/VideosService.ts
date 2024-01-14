import axios, { Axios } from 'axios';

export interface Video {
  id: string;
  title: string;
  fileName: string;
  description?: string;
  createdAt: string;
  authorId: string;
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
}

export const videosService = new VideosService();
