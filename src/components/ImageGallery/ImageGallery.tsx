import React, { FC, useEffect, useState } from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Modal } from "../Modal/Modal";
import { Gallery, Image, LeftArrow, RightArrow } from "./ImageGallery.styled";
import { ImageItem } from "../../types/imagesTypes";

interface ImageGalleryProps {
  images: ImageItem[];
}

export const ImageGallery: FC<ImageGalleryProps> = ({
  images,
}): JSX.Element => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  let [imageIndex, setImageIndex] = useState<number | null>(null);

  useEffect(() => {
    window.addEventListener("keydown", changeImageByKeydown);
    return () => window.removeEventListener("keydown", changeImageByKeydown);
  }, []);

  useEffect(() => {
    if (!isModalOpened && imageIndex !== null) setImageIndex(null);
  }, [isModalOpened, imageIndex]);

  const getImageIndex = (index: number): void => {
    setImageIndex(index);
    setIsModalOpened(true);
  };

  const changeImageByKeydown = (e: KeyboardEvent): void => {
    if (e.code === "ArrowRight") {
      setImageIndex((prevIndex) =>
        prevIndex !== null && prevIndex < images.length - 1
          ? (prevIndex += 1)
          : images.length - 1
      );
    } else {
      setImageIndex((prevIndex) =>
        prevIndex !== null && prevIndex > 0 ? (prevIndex -= 1) : 0
      );
    }
  };

  const changeImageByClick = (e: React.MouseEvent<SVGSVGElement>): void => {
    if (e.currentTarget && e.currentTarget.id === "nextImage") {
      setImageIndex((prevIndex) =>
        prevIndex !== null && prevIndex < images.length - 1
          ? (prevIndex += 1)
          : images.length - 1
      );
    } else {
      setImageIndex((prevIndex) =>
        prevIndex !== null && prevIndex > 0 ? (prevIndex -= 1) : 0
      );
    }
  };

  const getLargeImgUrl = (): string => {
    if (imageIndex === null) return "";
    const selectedImg = images[imageIndex];
    return selectedImg ? selectedImg.largeImageURL : "";
  };

  return (
    <Gallery>
      <ImageGalleryItem images={images} getImageIndex={getImageIndex} />
      {isModalOpened && (
        <Modal onClose={(): void => setIsModalOpened(false)}>
          <LeftArrow id="prevImage" onClick={changeImageByClick} />
          <Image src={getLargeImgUrl()} alt="Big image" />
          <RightArrow id="nextImage" onClick={changeImageByClick} />
        </Modal>
      )}
    </Gallery>
  );
};
