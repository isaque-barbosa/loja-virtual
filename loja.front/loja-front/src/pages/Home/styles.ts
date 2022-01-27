import styled from "styled-components";

export const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 60%;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
    img {
        width:100%;
    }
`;

export const Container = styled.div`
    padding: 2px 16px;
`;

export const Column = styled.div`
    float: left;
    width: 25%;
    padding: 5vh 0 0 5vw;
    @media screen and (max-width: 600px) {
          width: 100%;
          display: block;
          margin-bottom: 20px;
      }
`;

export const Toastr = styled.div`
    z-index: 11;
`;

export const Row = styled.div`
    margin: 0 -5px;
    &:after {
        content: "";
        display: table;
        clear: both;
    }
`;