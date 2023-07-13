import React, { FC, useState, useEffect } from "react";
import Notiflix from "notiflix";
import ImagesLoadService from "../services/ReguestService";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { LoadMoreBtn } from "../components/Button/Button";
import { ImageGallery } from "../components/ImageGallery/ImageGallery";
import { Loader } from "../components/Loader/Loader";
import { AppContainer } from "./App.styled";
import { ImageItem, ImagesData } from "../types/imagesTypes";

const imagesLoader = new ImagesLoadService();

const App: FC = (): JSX.Element => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("idle");
  const [userRequest, setUserRequest] = useState<string>("");
  const [totalImages, setTotalImages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (userRequest === "" || imagesLoader.page !== page) return;

    (async () => {
      try {
        setStatus("pending");
        imagesLoader.query = userRequest;
        const obtainedImages: ImagesData = await imagesLoader.requestImages();
        setImages([...images, ...obtainedImages.hits]);
        setTotalImages(obtainedImages.total);
        setStatus("resolved");
      } catch (err: any) {
        setError(err.message);
        setPage(1);
        setStatus("rejected");
      }
    })();
  }, [images, userRequest, page]);

  const setUserInputToState = (userInput: string) => {
    if (userInput === "") {
      return Notiflix.Notify.warning("Please, enter your request!", {
        width: "500px",
        fontSize: "20px",
      });
    }
    imagesLoader.resetPage();
    setUserRequest(userInput);
    setImages([]);
    setPage(imagesLoader.page);
  };

  return (
    <AppContainer>
      <SearchBar onSubmit={setUserInputToState} />
      {totalImages !== 0 && <ImageGallery images={images} />}
      {status === "pending" && <Loader />}
      {status === "resolved" && totalImages > images.length && (
        <LoadMoreBtn onBtnClick={() => setPage(imagesLoader.page)} />
      )}
      {status === "rejected" && <h1>{error}</h1>}
    </AppContainer>
  );
};

export default App;
