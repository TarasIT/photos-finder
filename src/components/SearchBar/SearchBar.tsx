import React, { FC, useState, FormEvent, ChangeEvent } from "react";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import {
  SearchBarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from "./SearchBar.styled";

interface SearchBarProps {
  onSubmit: (userInput: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onSubmit }): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputValue.toLowerCase().trim());
    setInputValue("");
  };

  return (
    <SearchBarContainer>
      <SearchForm onSubmit={handleFormSubmit}>
        <SearchFormInput
          name="input"
          type="text"
          value={inputValue}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
        <IconContext.Provider value={{ size: "20px" }}>
          <SearchFormButton type="submit">
            <BsSearch />
          </SearchFormButton>
        </IconContext.Provider>
      </SearchForm>
    </SearchBarContainer>
  );
};
