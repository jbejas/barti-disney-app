/* 
* RESULTS PAGE COMPONENT
*
* description: Results page component that displays search results
* @returns {JSX.Element}
*/

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import LoadingIndicator from "../components/loading-indicator";
import Card from "../components/card";
import { CharacterProps } from "../definitions/character";
import styled from "styled-components";
import axios from "axios";
import Button from "../components/button";

// STYLED HOME COMPONENT
const StyledHome = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

// STYLED H3
const StyledH3 = styled.h3`
  width: 100%;
  text-align: left;
  font-size: 36px;
  font-weight: bold;
  margin: 0 0 25px 0;
`;

const Results = () => {

  // Initialize State
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [characters, setCharacters] = useState<CharacterProps[]>([]);

  const { query } = useParams();

  useEffect(() => {
    // Initialize loading state and reset characters and error state
    setLoading(true);
    setCharacters([]);
    setApiError(null);

    // Perform API request to fetch characters based on the search query
    axios({
      method: 'GET',
      url: `https://api.disneyapi.dev/character?name=${query}`,
      params: {
        page: 1,        // Specify which page of results to fetch
        pageSize: 8     // Limit the number of results per page
      }
    }).then(res => {
      // Update characters state with the data from the response
      setCharacters(res?.data?.data);
      setLoading(false); // Set loading to false after data is received
    }).catch(err => {
      // Update error state with the error message and stop loading
      setApiError(err.message);
      setLoading(false);
    });
  }, [query]); // Re-run effect when the search query changes

  return (
    <>
      {
        // Display loading indicator while data is being fetched
        loading ? (
          <LoadingIndicator />
        ) : (
          // Check if there are characters to display
          characters.length ? (
            <>
              <StyledH3>Results for: <span style={{ fontStyle: "italic" }}>"{query}"</span></StyledH3>
              <StyledHome>
                {/* Map through characters and display each one in a card */}
                {characters.map((character: CharacterProps) => (
                  <Card key={character._id} character={character} />
                ))}
              </StyledHome>
            </>
          ) : (
            // Check if there was an API error
            apiError ? (
              <>
                <StyledH3>Oops! Something went wrong on our end. Please try again.</StyledH3>
                {/* Button to reload the page and retry fetching data */}
                <Button onClick={() => window.location.reload()} label="Try Again" />
              </>
            ) : (
              // Display message if no characters were found
              <StyledH3>No results found for <span style={{ fontStyle: "italic" }}>"{query}"</span></StyledH3>
            )
          )
        )
      }
    </>
  )
}

export default Results;