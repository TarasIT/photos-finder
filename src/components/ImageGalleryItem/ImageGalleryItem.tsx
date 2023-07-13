import React, { FC } from "react";
import { GalleryItem, Image } from "./ImageGalleryItem.styled";
import { ImageItem } from "../../types/imagesTypes";

interface ImageGalleryItemProps {
  images: ImageItem[];
  onSelectImage: (id: number) => void;
}

export const ImageGalleryItem: FC<ImageGalleryItemProps> = ({
  onSelectImage,
  images,
}): JSX.Element[] => {
  const selectImage = (e: React.MouseEvent<HTMLLIElement>) =>
    onSelectImage(Number(e.currentTarget.id));

  return images.map(({ id, webformatURL, tags }) => {
    return (
      <GalleryItem key={id.toString()} id={id.toString()} onClick={selectImage}>
        <Image src={webformatURL} alt={tags} />
      </GalleryItem>
    );
  });
};
