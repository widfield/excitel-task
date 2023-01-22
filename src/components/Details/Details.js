import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  z-index: 1;
  background: #fff;
  border-radius: 15px;
`;

const Title = styled.span`
  font-weight: bold;
`;

const InfoWrapper = styled.div`
  display: flex;
  padding: 5px;
  justify-content: space-between;
`;

const Details = ({ data }) => {
  return (
    <Wrapper>
      <img src={data.flag} width="400" height="200" alt={`${data.name}_flag`} />
      <InfoWrapper>
        <Title>Name</Title>
        <span>{data.name}</span>
      </InfoWrapper>
      <InfoWrapper>
        <Title>Code</Title>
        <span>{data.code}</span>
      </InfoWrapper>
      <InfoWrapper>
        <Title>Capital</Title>
        <span>{data.capitalName}</span>
      </InfoWrapper>
      <InfoWrapper>
        <Title>Latitude / Longitude</Title>
        <span>{data.latLng.join(" / ")}</span>
      </InfoWrapper>
      <InfoWrapper>
        <Title>Region</Title>
        <span>{data.region}</span>
      </InfoWrapper>
      <InfoWrapper>
        <Title>Subregion</Title>
        <span>{data.subregion}</span>
      </InfoWrapper>
      <InfoWrapper>
        <Title>Population</Title>
        <span>{data.population}</span>
      </InfoWrapper>
    </Wrapper>
  );
};

export default Details;
