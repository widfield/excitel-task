import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Details from "../Details/Details";
import Modal from "../Modal/Modal";
import Pagination from "./components/Pagination/Pagination";
import { sortData } from "./TableService";
import styled from "styled-components";
import Input from "../Common/Input";
import { HeaderSortOrder, PropertiesMap } from "./TableConstants";

const TableRow = styled.tr`
  background: rgb(121, 164, 38);
  background: ${(props) => `linear-gradient(
    90deg,
    rgba(121, 164, 38, 1) ${props.progress}%,
    rgba(255, 255, 255, 0) ${props.progress}%
  )`};
  cursor: pointer;
`;

const TableHeaderCell = styled.th`
  padding: 5px;
  vertical-align: baseline;
  cursor: pointer;
`;

const TableCell = styled.td`
  padding: 5px 10px;
`;

const itemsPerPage = 50;

const Table = ({ data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOptions, setSortingOptions] = useState({
    column: "name",
    direction: "desc",
  });
  const [sortedData, setSortedData] = useState(data);
  const [currentPageData, setCurrentPageData] = useState([]);
  const pagination = useMemo(
    () => Math.ceil(sortedData.length / itemsPerPage),
    [sortedData]
  );
  const intervalRef = useRef(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const [currentlyHeldRow, setCurrentlyHeldRow] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const handleDataSlice = useCallback(
    (data) =>
      data.slice(
        itemsPerPage * currentPage - itemsPerPage,
        itemsPerPage * currentPage
      ),
    [currentPage]
  );

  useEffect(() => {
    return () => stopCounter();
  }, []);

  useEffect(() => {
    const sorted = sortData(
      sortingOptions.column,
      sortingOptions.direction,
      sortedData
    );
    setCurrentPageData(handleDataSlice(sorted));
  }, [
    sortedData,
    handleDataSlice,
    sortingOptions.column,
    sortingOptions.direction,
  ]);

  const handleSortColumn = (column) => {
    setSortingOptions((prev) => {
      if (prev.column === column) {
        return {
          ...prev,
          direction: prev.direction === "desc" ? "asc" : "desc",
        };
      }
      return { ...prev, column };
    });
  };

  const handleNameFilter = (value) =>
    setSortedData(
      data.filter((item) => item.name.toLowerCase().includes(value))
    );

  const startCounter = (item) => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setHoldProgress((prevCounter) => prevCounter + 2);
      setCurrentlyHeldRow(item);
    }, 10);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setHoldProgress(0);
      setCurrentlyHeldRow(null);
    }
  };

  useEffect(() => {
    if (holdProgress === 100) {
      setModalContent(currentlyHeldRow);
      setHoldProgress(0);
    }
  }, [holdProgress, currentlyHeldRow]);

  return (
    <>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0])
              .sort(
                (a, b) =>
                  HeaderSortOrder.indexOf(a) - HeaderSortOrder.indexOf(b)
              )
              .map((key) => {
                if (key === "name") {
                  return (
                    <TableHeaderCell key={key}>
                      <span onClick={() => handleSortColumn("name")}>Name</span>
                      {sortingOptions.column === "name" && (
                        <span>
                          {sortingOptions.direction === "asc" ? " ↓" : " ↑"}
                        </span>
                      )}
                      <div>
                        <Input
                          placeholder="Filter"
                          onChange={(e) => handleNameFilter(e.target.value)}
                        />
                      </div>
                    </TableHeaderCell>
                  );
                }
                if (key === "latLng") {
                  return (
                    <>
                      <TableHeaderCell
                        onClick={() => handleSortColumn("latitude")}
                        key={"latitude"}
                      >
                        Latitude
                        {sortingOptions.column === "latitude" && (
                          <span>
                            {sortingOptions.direction === "asc" ? " ↓" : " ↑"}
                          </span>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell
                        onClick={() => handleSortColumn("longitude")}
                        key={"longitude"}
                      >
                        Longitude
                        {sortingOptions.column === "longitude" && (
                          <span>
                            {sortingOptions.direction === "asc" ? " ↓" : " ↑"}
                          </span>
                        )}
                      </TableHeaderCell>
                    </>
                  );
                }
                return (
                  <TableHeaderCell
                    key={key}
                    onClick={() => handleSortColumn(key)}
                  >
                    {PropertiesMap[key]}
                    {sortingOptions.column === key && (
                      <span>
                        {sortingOptions.direction === "asc" ? " ↓" : " ↑"}
                      </span>
                    )}
                  </TableHeaderCell>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            <TableRow
              key={item.code}
              onMouseDown={() => startCounter(item)}
              onMouseUp={stopCounter}
              onMouseLeave={stopCounter}
              progress={currentlyHeldRow?.code === item.code ? holdProgress : 0}
            >
              <TableCell>
                <img
                  width="40"
                  height="20"
                  src={item.flag}
                  alt={`${item.name}_flag`}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.capitalName}</TableCell>

              <TableCell>{item.latLng[0]}</TableCell>
              <TableCell>{item.latLng[1]}</TableCell>

              <TableCell>{item.region}</TableCell>
              <TableCell>{item.subregion}</TableCell>
              <TableCell>{item.population}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </table>
      <Pagination pages={pagination} setPage={setCurrentPage} />
      <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
        <Details data={modalContent} />
      </Modal>
    </>
  );
};

export default Table;
