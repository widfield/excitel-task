import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import Details from "../Details/Details";
import { getCountries, debounce } from "./AutocompleteService";
import Input from "../Common/Input";
const Wrapper = styled.div`
  position: relative;
`;

const ItemsWrapper = styled.div`
  position: absolute;
  left: 40%;
  top: 40px;
  background: #fff;
  border: 2px solid #000;
  border-radius: 15px;
  padding: 20px;
  min-width: 200px;
`;

const Item = styled.div`
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background: grey;
  }
`;
const Autocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = debounce(getCountries);

  const handleItemClick = (item) => setModalContent(item);

  return (
    <>
      <Wrapper>
        <Input
          placeholder="Search"
          onChange={(e) =>
            handleChange(e.target.value, setSuggestions, setIsLoading)
          }
          isLoadingData={isLoading}
        />
        {suggestions.length > 0 && (
          <ItemsWrapper>
            {suggestions.map((country) => (
              <Item key={country.code} onClick={() => handleItemClick(country)}>
                <span>{country.name}</span>
              </Item>
            ))}
          </ItemsWrapper>
        )}
      </Wrapper>
      <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
        <Details data={modalContent} />
      </Modal>
    </>
  );
};

export default Autocomplete;
