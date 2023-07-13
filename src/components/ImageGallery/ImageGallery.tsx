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

  const toggleModal = () => setShowedModal(!showedModal);

  const getImageIdByClick = (id: number) => {
    setImageId(id);
    toggleModal();
  };

  const getLargeImgUrlForModal = (): string => {
    const selectedImg = images.find(({ id }) => id === imageId);
    if (selectedImg) return selectedImg.largeImageURL;
    return "";
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
