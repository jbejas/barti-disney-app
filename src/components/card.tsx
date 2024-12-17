import styled from "styled-components";
import { NavLink } from "react-router";
import theme from "../constants/theme";
import { CharacterProps } from "../definitions/character";

// STYLED COMPONENT
const StyledCard = styled.figure`
  background-color: ${theme.light};
  color: ${theme.text};
  height: 416px;
  width: 248px;
  text-align: center;

  @media only screen and (max-width: 960px) {
    width: 300px;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
  }

  img {
    height: 248px;
    width: 248px;
    object-fit: cover;
    object-position: 20% 20%;

    @media only screen and (max-width: 960px) {
      width: 100%;
    }
  }

  figcaption {
    display: block;
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
    height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 16px;
  }
  
  h4 {
    font-size: 15px;
    font-weight: normal;
    margin: 0 16px;
    line-height: 16px;
  }

  p {
    box-sizing: border-box;
    font-size: 12px;
    font-weight: 300;
    line-height: 16px;
    height: 32px;
    padding: 0 16px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  a {
    align-items: center;
    color: ${theme.text};
    border-radius: 8px;
    display: flex;
    font-size: 12px;
    font-weight: bold;
    height: 40px;
    justify-content: center;
    margin: 0 16px;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
    width: calc(100% - 32px);
    &:hover {
      background-color: ${theme.backgroundAlt};
      color: ${theme.accent};
    }
  }
`;

// CARD PROPS
interface CardProps {
  character: CharacterProps;
}

/* 
* CHARACTER CARD COMPONENT
*
* description: Card component for displaying character information
* @returns {JSX.Element}
*/
const Card = ({
  character
}: CardProps) => {

  const isResultsPage = location.pathname.includes("/results");
  let films = "No films found";

  // IF CHARACTER HAS FILMS, JOIN THEM INTO A STRING
  if (character?.films?.length) {
    films = character.films.join(", ");
  }

  return (
    <StyledCard>
      <img src={character?.imageUrl} alt={character?.name} />

      <figcaption>{character?.name}</figcaption>

      <h4>Featured Films</h4>
      <p>{films}</p>
      {/* Adding state to determine previous route path */}
      <NavLink to={`/character/${character?._id}`} state={{ from: isResultsPage ? "/results" : "" }}>View Profile</NavLink>
    </StyledCard>
  )
}

export default Card;