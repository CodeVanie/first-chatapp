import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";

export default function SearchContact({ handleSearch }) {
  const [searchvalue, setSearchValue] = useState("");

  const searchContact = (e) => {
    e.preventDefault();
    
    handleSearch(searchvalue);
  };

  return (
    <Container>
      <form className="input-container" onSubmit={(e) => searchContact(e)}>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {setSearchValue(e.target.value); searchContact(e);}}
        />
        <button type="submit">
        <AiOutlineSearch />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 98% 2%;
  background-color: #080420;
  padding: 0.5rem;
  margin-bottom: 1rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 70%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ff865b;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
