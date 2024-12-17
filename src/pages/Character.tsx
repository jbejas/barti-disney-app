/* 
* CHARACTER PAGE COMPONENT
*
* description: Character page component that displays character details
* @returns {JSX.Element}
*/

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import LoadingIndicator from "../components/loading-indicator";
import { CharacterProps } from "../definitions/character";
import Button from "../components/button";
import axios from "axios";
import dayjs from "dayjs";

// STYLED CHARACTER COMPONENT
const StyledCharacter = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  width: 100%;
  transition: all 0.3s ease-in-out;

  button.tryAgain {
    margin: 0 15px 0 0;
  }

  figure {
    width: 440px;

    img {
      border-radius: 16px;
      box-shadow: 0 2px 8px 0 rgba(5, 69, 83, 0.12), 0 4px 24px 0 rgba(5, 69, 83, 0.12);
      width: 100%;
      height: 528px;
      object-fit: cover;
    }
  }

  article {
    flex: 1;
    text-align: left;
    position: relative;

    h2 {
      font-size: 44px;
    }

    h3 {
      margin: 10px 0;
      font-size: 18px;
      font-weight: bold;
      line-height: 24px;
    }

    h3.error {
      width: 100%;
      text-align: left;
      font-size: 36px;
      font-weight: bold;
      margin: 0 0 25px 0;
    }

    h4 {
      margin-bottom: 8px;
      font-size: 18px;
      font-weight: bold;
      line-height: 24px;
    }

    ul {
      margin: 0 0 15px 0;
      list-style: disc;
      padding-left: 24px;
      line-height: 24px;

      li {
        line-height: 24px;
         font-size: 15px;
      }
    }

    p {
      margin-bottom: 24px;
      font-size: 12px;
      font-weight: normal;
      line-height: 16px;
    }

    p.lastUpdated {
      font-size: 12px;
      color: #222;
      line-height: 16px;
      margin: 25px 0;
    }

    button.back {
      position: absolute;
      top: 0px;
      right: 0px;
    }

  }
`;

// STYLED CHARACTER COMPONENT
const StyledError = styled.div`
  width: 100%;

  button.tryAgain {
    margin: 0 15px 0 0;
  }

  h3 {
    width: 100%;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    margin: 0 0 25px 0;
  }
`;

const Character = () => {

  // Initialize navigation
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.from;

  // Initialize State
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [characterDetails, setCharacterDetails] = useState<CharacterProps | null>(null);

  let content = null;

  // Get ID param from router
  const { id } = useParams();

  useEffect(() => {
    // Indicate loading process has started
    setLoading(true);
    // Reset any previous API errors
    setApiError(null);

    // Fetch character details from the API using the character ID from the URL
    axios({
      method: 'GET',
      url: `https://api.disneyapi.dev/character/${id}`,
      params: {
        page: 1,
        pageSize: 8
      }
    }).then(res => {
      // Update state with the character details from the response
      setCharacterDetails(res?.data?.data);
      // Indicate loading process has ended
      setLoading(false);
    }).catch(err => {
      // Update state with the error message if the API call fails
      setApiError(err.message);
      // Indicate loading process has ended
      setLoading(false);
    });
  }, [id]); // Dependency array: re-run the effect if the ID changes

  // IF LOADING, SHOW LOADING SPINNER
  if (loading) {
    return <LoadingIndicator />;
  }

  // SET CONTENT BASED ON LOADING STATE
  if (characterDetails && !loading && !apiError) {
    content = (
      <StyledCharacter>
        {/* Display character image within a figure tag */}
        <figure>
          {/* Image of the character with a fallback alt text */}
          <img src={characterDetails?.imageUrl} alt={characterDetails?.name || 'Character image'} />
        </figure>
        <article>
          {/* Conditionally render the "Go Back" button if the previous page was the results page */}
          {
            previousPath === '/results' && (
              <Button className="back" onClick={() => navigate(-1)} label="Go Back" />
            )
          }
          <h2>{characterDetails?.name}</h2>
          <p className="lastUpdated">Last Updated: <time>{dayjs(characterDetails?.updatedAt).format("MM/DD/YYYY - hh:mm A")}</time></p>
          {/* Check if the character has any featured films */}
          {
            characterDetails?.films?.length ? (
              <>
                <h3>Featured Films</h3>
                <ul>
                  {/* Map through each film and display it as a list item */}
                  {characterDetails.films.map((film: string) => (
                    <li key={film}>{film}</li>
                  ))}
                </ul>
              </>
            ) : null
          }
          {/* Check if the character has appeared in any TV shows */}
          {
            characterDetails?.tvShows?.length ? (
              <>
                <h3>TV Shows</h3>
                <ul>
                  {/* Map through each TV show and display it as a list item */}
                  {characterDetails.tvShows.map((show: string) => (
                    <li key={show}>{show}</li>
                  ))}
                </ul>
              </>
            ) : null
          }
          // Check if the character has any park attractions associated
          {
            characterDetails?.parkAttractions?.length ? (
              <>
                <h3>Park Attractions</h3>
                <ul>
                  {/* Map through each park attraction and display it as a list item */}
                  {characterDetails.parkAttractions.map((attraction: string) => (
                    <li key={attraction}>{attraction}</li>
                  ))}
                </ul>
              </>
            ) : null
          }
          <Button href={characterDetails?.sourceUrl} label="Explore More Character Details" />
        </article>
      </StyledCharacter>
    )
  } else {
    // Display error message and action buttons when content fails to load
    content = (
      <StyledError>
        {/* Error message indicating something went wrong */}
        <h3 className="error">Oops! Something went wrong on our end. Please try again.</h3>
        {/* Button to retry loading the content */}
        <Button className="tryAgain" onClick={() => window.location.reload()} label="Try Again" />
        {/* Button to navigate back to the previous page */}
        <Button onClick={() => navigate(-1)} label="Go Back" />
      </StyledError>
    )
  }

  return content;
}

export default Character;