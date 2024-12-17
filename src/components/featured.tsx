
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import theme  from "../constants/theme";
import Card from "./card";
import LoadingIndicator from "./loading-indicator";
import { CharacterProps } from "../definitions/character";

// STYLED FEATURED COMPONENT
const StyledFeatured = styled.div`
  text-align: center;

  section {
    background-color: ${theme.accent};
    box-sizing: border-box;
    color: ${theme.light};  
    margin: 0 auto;
    padding: 80px;
    max-width: 1200px;

    @media only screen and (max-width: 960px) {
      padding: 40px 24px;
    }

    @media only screen and (max-width: 600px) {
      padding: 40px 24px;
    }

    nav {
      background-color: ${theme.accent};
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;

      @media only screen and (max-width: 600px) {
        gap: 24px;
      }
    }
  }
`;

/* 
* FEATURED CHARACTERS COMPONENT
*
* description: Featured characters component for the application
* @returns {JSX.Element}
*/
const Featured = () => {
  const [characters, setCharacters] = useState<CharacterProps[]>([]);
  const [loading, setLoading] = useState(true);
  let featuredCharacters: React.ReactNode = null;
  
  // FETCH FEATURED CHARACTERS
  useEffect(() => {
      // SET LOADING TO TRUE AND CLEAR RESULTS
      setLoading(true);
      setCharacters([]);

      // GET RESULTS FROM API
      axios.all([
        axios.get('https://api.disneyapi.dev/character/544'),
        axios.get('https://api.disneyapi.dev/character/571'),
        axios.get('https://api.disneyapi.dev/character/4703'),
        axios.get('https://api.disneyapi.dev/character/1947')
      ]).then(axios.spread((res1, res2, res3, res4) => {
        const queryResults = [res1?.data?.data, res2?.data?.data, res3?.data?.data, res4?.data?.data];

        // SET RESULTS AND LOADING TO FALSE
        setCharacters(queryResults as CharacterProps[]);
        setLoading(false);
      })).catch(err => {
        console.log(err);
      })
  }, []);
  
  // IF CHARACTERS, DISPLAY CHARACTERS
  if(characters?.length) {
    featuredCharacters = characters.map((character: CharacterProps) => {
      return <Card key={character._id} character={character} />
    })
  } 

  // IF LOADING, DISPLAY LOADING MESSAGE
  if(loading) {
    featuredCharacters = <LoadingIndicator />
  }

  return (
    <StyledFeatured>
      <section>
        <h3>Featured Characters!</h3>      

        <nav>
          {featuredCharacters}
        </nav>
      </section>
    </StyledFeatured>
  )
}

export default Featured;