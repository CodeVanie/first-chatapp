import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { HiPlus } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../assets/logo.png";
import Logout from "./Logout";
import SearchContact from "./SearchContact";
import { addContactRoute, removeContactRoute } from "../utils/APIRoutes";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUserClist, setCurrentUserClist] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchresult, setSearchResult] = useState([]);
  const [searchlength, setSearchLength] = useState(0);
  const [contactRefresh, setContactRefresh] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
        setCurrentUserClist(data.contactList);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (contactRefresh) {

      console.log(contactRefresh);
      console.log(currentUserClist);
      setContactRefresh(false);
    }
  }, [currentUserClist]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const handleSearch = (search) => {
    var match = [];
    setContactRefresh(false);
    setSearchLength(search.length);
    if(searchlength === 2 && search.length === 1) {
      search = "";
      setSearchLength(0);
    }
    console.log(search);
    match = contacts.filter(item => item.username.toLowerCase().includes(search.toLowerCase()));
    setSearchResult(match);
  };

  const addContact = async (e, contactname) => {
    try {
      e.stopPropagation();
      const matched = contacts.some((item) => item.username === contactname);
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
  
      const updatedClist = [...currentUserClist, contactname];
  
      console.log(updatedClist);
      await axios.post(`${addContactRoute}/${user._id}`, {
        clist: updatedClist,
      });
  
      if (matched) {
        setCurrentUserClist(updatedClist);
        setContactRefresh(true);
        changeCurrentChat(undefined, undefined);
        user.contactList = updatedClist;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
      } else {
        toast.error(
          "There's an error adding this person. Please try again.",
          toastOptions
        );
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error(
        "An error occurred while adding the contact. Please try again.",
        toastOptions
      );
    }
  };

  const removeContact = async (e, contactname) => {
    try {
      e.stopPropagation();
      const matched = contacts.some((item) => item.username === contactname);
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
  
      const updatedClist = currentUserClist.filter((contact) => contact !== contactname);
  
      console.log(updatedClist);
      await axios.post(`${removeContactRoute}/${user._id}`, {
        clist: updatedClist,
      });
  
      if (matched) {
        setCurrentUserClist(updatedClist);
        setContactRefresh(true);
        user.contactList = updatedClist;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        changeCurrentChat(undefined, undefined);
      } else {
        toast.error(
          "There's an error adding this person. Please try again.",
          toastOptions
        );
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error(
        "An error occurred while adding the contact. Please try again.",
        toastOptions
      );
    }
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>quahgo</h1>
            <Logout />
          </div>
          <SearchContact handleSearch={handleSearch}/>
          <div className="contacts">
          {searchlength === 0 || contactRefresh ? (
            contacts.map((contact, index) => {
              const match = currentUserClist.includes(contact.username);
              if(match){
                var prevMatchIndex = index;
                return (
                  <div
                    key={contact._id}
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                      <RemoveContact onClick={(e) => removeContact(e, contact.username)}><RxCross2 /></RemoveContact>
                  </div>
                );
              }
            })
            ) : (
              searchresult.map((result, index) => {
                console.log(result);
                const match = currentUserClist.includes(result.username);
                if(match) var prevMatchIndex = index;
                return (
                  <div
                    key={result._id}
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, result)}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${result.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3>{result.username}</h3>
                    </div>
                    {match ? (
                      <RemoveContact onClick={(e) => removeContact(e, result.username)}><RxCross2 /></RemoveContact>
                    ) : (
                      <AddContact onClick={(e) => addContact(e, result.username)}><HiPlus /></AddContact>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 13% 13% 60% 14%;
  overflow: hidden;
  background-color: #CB4335;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #ff865b;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }

`;

const AddContact = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin-left: auto;
  border-radius: 0.5rem;
  background-color: #0d0d30;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

const RemoveContact = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin-left: auto;
  border-radius: 0.5rem;
  background-color: #0d0d30;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
