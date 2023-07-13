export interface ImageItem {
  id: number;
  largeImageURL: string;
  tags: string;
  webformatURL: string;
}

export interface ImagesData {
  hits: ImageItem[];
  total: number;
}

export interface FullImageItem extends ImageItem {
  collections: number;
  comments: number;
  downloads: number;
  imageHeight: number;
  imageSize: number;
  imageWidth: number;
  likes: number;
  pageURL: string;
  previewHeight: number;
  previewURL: string;
  previewWidth: number;
  type: string;
  user: string;
  userImageURL: string;
  user_id: number;
  views: number;
  webformatHeight: number;
  webformatWidth: number;
}

export interface FullImagesData extends ImagesData {
  hits: FullImageItem[];
  totalHits: number;
}
