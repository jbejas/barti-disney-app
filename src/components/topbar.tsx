/* 
* TOPBAR COMPONENT
*
* description: Topbar component for the application
* @returns {JSX.Element}
*/

import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation, useParams } from "react-router";
import styled from "styled-components";
import theme from "../constants/theme";
import DisneyLogo from "../assets/disney-logo.svg";
import ProfileIcon from "../assets/profile-icon.svg";
import Cookies from 'js-cookie'

// STYLED TOPBAR COMPONENT
const StyledTopbar = styled.header`
    background-color: ${theme.background};
    text-align: center;

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      height: 112px;
      max-width: 1200px;
      margin: 0 auto;

      @media only screen and (max-width: 960px) {
        gap: 8px;
        padding: 0 8px;
      }
    }
    
    input {
        background-color: ${theme.backgroundAlt};
        border: none;
        border-radius: 100px;
        width: 100%;
        height: 48px;
        padding: 0 16px;
    }

    .profile-link {
      background-color: ${theme.accent};
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 48px;
      text-decoration: none;
      height: 48px;
      width: 48px;
      border-radius: 100px;
      transition: all 0.3s ease;

      &:hover {
        background-color: ${theme.accent};
        opacity: 0.8;
      }

      img {
        height: 24px;
        width: 24px;
      }
    }
`;

const Topbar = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string | undefined>("");
  const isResultsPage = location.pathname.includes("/results");

  // WATCH FOR CHANGES IN LOCATION, CLEAR SEARCH INPUT IF NOT ON RESULTS PAGE
  useEffect(() => {
    if (!isResultsPage) {
      setSearchQuery("");
      Cookies.remove("searchQuery");
    } else {
      setSearchQuery(query);
    }
  }, [location, isResultsPage, query]);

  // HANDLE SEARCH INPUT & ENTER KEY
  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;

    Cookies.set("searchQuery", query);

    // IF PRESSED ENTER, NAVIGATE TO RESULTS PAGE
    if (e.key === 'Enter') {
      navigate(`/results/${query}`);
    }
  }

  // HANDLE SEARCH INPUT CHANGE
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  return (
    <StyledTopbar>
      <nav>
        <h1>
          <NavLink to="/">
            <img src={DisneyLogo} alt="Disney Logo" />
          </NavLink>
        </h1>

        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={onSearchChange}
          onKeyDown={onSearch}
        />

        <NavLink className="profile-link" to="/profile">
          <img src={ProfileIcon} alt="Profile Icon" />
        </NavLink>
      </nav>
    </StyledTopbar>
  )
}

export default Topbar;