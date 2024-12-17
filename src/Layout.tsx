import { Outlet } from "react-router";
import styled from "styled-components";
import Topbar from "./components/topbar";
import Featured from "./components/featured";
import Footer from "./components/footer";
import theme  from "./constants/theme";

// STYLED LAYOUT COMPONENT
const StyledLayout = styled.div`
  text-align: center;

  main {
    background-color: ${theme.backgroundAlt};  
    box-sizing: border-box;
    margin: 0 auto;
    padding: 80px;
    max-width: 1200px;

    @media (max-width: 960px) {
      padding: 40px;
    }
  }

  h3 {
    font-size: 40px;
    font-weight: normal;
    margin-bottom: 40px;
  }
`;

/* 
* LAYOUT COMPONENT
*
* description: Layout component that wraps the application
* @returns {JSX.Element}
*/
const Layout = () => {
    return (
      <StyledLayout>
        <Topbar />
        <main>
          <Outlet />
        </main>
        <Featured />
        <Footer />
      </StyledLayout>
    )
}

export default Layout;