import styled from "styled-components";
import theme  from "../constants/theme";
import DisneyLogo from "../assets/disney-logo.svg";

// STYLED FOOTER COMPONENT
const StyledFooter = styled.div`
  text-align: center;

  footer {
    background-color: ${theme.background};
    color: ${theme.text};
    margin: 0 auto;
    padding: 40px;
    max-width: 1200px;
  }

  img {
    margin-bottom: 8px;
  }

  p {
    color: ${theme.text};
    font-size: 11px;
    font-weight: 300;
    line-height: 24px;
  }
`;

/**
 * FOOTER COMPONENT
 * 
 * description: Footer displays copyright information for the application
 * @returns {JSX.Element}
 */
const Footer = () => {
    return (
      <StyledFooter>
        <footer>
          <img src={DisneyLogo} alt="Disney Logo" />
          <p>
          For educational use only. All characters and content are the property of Disney. 
          This test is for private use and development testing only and should not be 
          distributed for public consumption           
          </p>
        </footer>
      </StyledFooter>
    )
}

export default Footer;