import styled from "styled-components";

const Loader = styled.div`
  display: inline-block;
  width: ${(props) => (props.size === "small" ? "30px" : "55px")};
  height: ${(props) => (props.size === "small" ? "30px" : "55px")};

  &:after {
    content: " ";
    display: block;
    width: ${(props) => (props.size === "small" ? "10px" : "32px")};
    height: ${(props) => (props.size === "small" ? "10px" : "32px")};
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #000;
    border-color: #000 transparent #fff transparent;
    animation: lds-dual-ring 0.6s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
