import React, { FC, useEffect, useState } from "react";
import { GalleryItem, Image } from "./ImageGalleryItem.styled";
import { ImageItem } from "../../types/imagesTypes";

interface ImageGalleryItemProps {
  images: ImageItem[];
  getImageIndex: (index: number) => void;
}

export const ImageGalleryItem: FC<ImageGalleryItemProps> = ({
  images,
  getImageIndex,
}): JSX.Element[] => {
  const selectImage = (e: React.MouseEvent<HTMLLIElement>): void => {
    const index = images.findIndex(
      ({ id }) => Number(e.currentTarget.id) === id
    );
    getImageIndex(index);
  };

  return images.map(({ id, webformatURL, tags }) => (
    <GalleryItem key={id.toString()} id={id.toString()} onClick={selectImage}>
      <Image src={webformatURL} alt={tags} />
    </GalleryItem>
  ));
};
