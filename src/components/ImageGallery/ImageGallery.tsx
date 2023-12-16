import React, { FC, useState } from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Modal } from "../Modal/Modal";
import { Gallery } from "./ImageGallery.styled";
import { ImageItem } from "../../types/imagesTypes";

interface ImageGalleryProps {
  images: ImageItem[];
}

export const ImageGallery: FC<ImageGalleryProps> = ({
  images,
}): JSX.Element => {
  const [showedModal, setShowedModal] = useState<boolean>(false);
  const [imageId, setImageId] = useState<number>(0);

  const toggleModal = (): void => setShowedModal(!showedModal);

  const getImageIdByClick = (id: number): void => {
    setImageId(id);
    toggleModal();
  };

  const getLargeImgUrlForModal = (): string => {
    const selectedImg = images.filter(({ id }) => id === imageId)[0];
    return selectedImg ? selectedImg.largeImageURL : "";
  };

  return (
    <Gallery>
      <ImageGalleryItem images={images} onSelectImage={getImageIdByClick} />
      {showedModal && (
        <Modal onClose={toggleModal}>
          <img src={getLargeImgUrlForModal()} width="1000" alt="" />
        </Modal>
      )}
    </Gallery>
  );
};
