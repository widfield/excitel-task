import React from "react";
import styled from "styled-components";
import Loader from "./Loader";

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 10px;
  border: 0.5px solid black;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  right: 40%;
  top: 5px;
`;

const Input = ({ isLoadingData = false, ...props }) => {
  return (
    <Wrapper>
      <StyledInput {...props} />
      {isLoadingData && (
        <LoaderWrapper>
          <Loader size="small" />
        </LoaderWrapper>
      )}
    </Wrapper>
  );
};

export default Input;
