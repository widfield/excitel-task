import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import styled from "styled-components";
import Autocomplete from "../Autocomplete/Autocomplete";
import { api } from "../../api/api";
import Loader from "../Common/Loader";

const TableWrapper = styled.div`
  padding: 20px; ;
`;

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${api}/countries`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(JSON.parse(data.contents));
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Autocomplete />
      {isLoading && <Loader />}
      <TableWrapper>
        {countries.length > 0 && <Table data={countries} />}
      </TableWrapper>
    </div>
  );
};

export default Home;
