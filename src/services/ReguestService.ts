import axios, { AxiosResponse } from "axios";
import { ImageItem, ImagesData, FullImagesData } from "../types/imagesTypes";

interface RequestParams {
  key: string;
  q: string;
  image_type: string;
  orientation: string;
  safesearch: string;
  per_page: number;
  page: number;
}

const BASE_URL = "https://pixabay.com/api/?";

class ImagesLoadService {
  searchImages: string;
  page: number;
  imagesAmount: number;

  constructor() {
    this.searchImages = "";
    this.page = 1;
    this.imagesAmount = 12;
  }

  normalizeResponse(response: FullImagesData): ImagesData {
    const filteredHits: ImageItem[] = response.hits.map(
      ({ id, largeImageURL, tags, webformatURL }) => {
        return { id, largeImageURL, tags, webformatURL };
      }
    );
    return { total: response.total, hits: filteredHits };
  }

  async requestImages(): Promise<ImagesData> {
    const params: RequestParams = {
      key: "29684807-93441b9500ca74c45f98c22c3",
      q: this.searchImages,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
      per_page: this.imagesAmount,
      page: this.page,
    };

    const response: AxiosResponse = await axios(`${BASE_URL}`, { params });

    if (response.data.total === 0) {
      return Promise.reject(
        new Error(`There are no images for query '${this.searchImages}'!`)
      );
    }

    const normalizedResponse: ImagesData = this.normalizeResponse(
      response.data
    );
    this.incrementPage();
    return normalizedResponse;
  }

  incrementPage(): void {
    this.page += 1;
  }

  resetPage(): void {
    this.page = 1;
  }

  get query(): string {
    return this.searchImages;
  }

  set query(newImages: string) {
    this.searchImages = newImages;
  }
}

export default ImagesLoadService;
