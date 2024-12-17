/* 
* HOME PAGE COMPONENT
*
* description: Home page component that displays a default list of characters
* @returns {JSX.Element}
*/

import { useState, useEffect } from "react";
import LoadingIndicator from "../components/loading-indicator";
import axios from "axios";
import { CharacterProps } from "../definitions/character";
import Card from "../components/card";
import styled from "styled-components";

// STYLED HOME COMPONENT
const StyledHome = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Home = () => {
  let content = null;
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<CharacterProps[]>([]);
  // FETCH GENERIC LIST OF CHARACTERS FROM API
  useEffect(() => {

    setLoading(true);

    axios({
      method: 'GET',
      url: 'https://api.disneyapi.dev/character',
      params: {
        page: 1,
        pageSize: 8
      }
    }).then(res => {
      setCharacters(res?.data?.data);
      setLoading(false);
    })
  }, []);

  // SET CONTENT BASED ON LOADING STATE (FOR FEATURED COMPONENT)  
  if (loading) {
    content = <LoadingIndicator />;
  }

  // IF CHARACTERS, DISPLAY CHARACTERS
  if (characters?.length) {
    const listItems = characters.map((character: CharacterProps) => {
      return <Card key={character._id} character={character} />
    })

    content = (
      <StyledHome>
        {listItems}
      </StyledHome>
    )
  }

  return content;
}

export default Home;