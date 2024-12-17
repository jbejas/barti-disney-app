/* 
* PROFILE PAGE COMPONENT
*
* description: Profile page component that displays user profile information and allows for editing
* @returns {JSX.Element}
*/

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import Cookies from 'js-cookie'
import styled from "styled-components";

import Button from "../../components/button";

import dayjs from "dayjs";

// STYLED PROFILE USER NAME
const StyledProfileUserName = styled.div`
  font-size: 40px;
  color: #222;
  line-height: 48px;
`;

// STYLED PROFILE WRAPPER
const StyledProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  p.lastUpdated {
    font-size: 12px;
    color: #222;
    line-height: 16px;
    margin-top: 10px; 
  }  

  dl {
     div {
      display: inline-block;
      width: 100%; 
      dt {
        float: left;
        margin: 25px 10px 0 0;
        font-size: 18px;
        color: #222;
        line-height: 24px;
        font-weight: bold;
      }
      dd {
        float: left;
        margin: 25px 0 0 0;
        font-size: 18px;
        color: #222;
        line-height: 24px;
        font-weight: bold;
      }
    } 
  }
`;

const Profile = () => {

  const navigate = useNavigate();

  // Initialize State
  const [userFirstName, setUserFirstName] = useState<string>("")
  const [userLastName, setUserLastName] = useState<string>("")
  const [userLastUpdated, setUserLastUpdated] = useState<string>("")
  const [userBirthDate, setUserBirthDate] = useState<string>("")
  const [userCity, setUserCity] = useState<string>("")
  const [userState, setUserState] = useState<string>("")
  const [userFavoriteCharacter, setUserFavoriteCharacter] = useState<string>("")
  const [userFavoriteRide, setUserFavoriteRide] = useState<string>("")
  const [userFavoriteMovie, setUserFavoriteMovie] = useState<string>("")
  const [userFavoritePark, setUserFavoritePark] = useState<string>("")

  useEffect(() => { // Get user data on load and set state.
    const userFirstName = Cookies.get('userFirstName');
    const userLastName = Cookies.get('userLastName');
    const userLastUpdated = Cookies.get('userLastUpdated');
    const userBirthDate = Cookies.get('userBirthDate');
    const userCity = Cookies.get('userCity');
    const userState = Cookies.get('userState');
    const userFavoriteCharacter = Cookies.get('userFavoriteCharacter');
    const userFavoriteRide = Cookies.get('userFavoriteRide');
    const userFavoriteMovie = Cookies.get('userFavoriteMovie');
    const userFavoritePark = Cookies.get('userFavoritePark');
    setUserFirstName(userFirstName ? userFirstName : "John")
    setUserLastName(userLastName ? userLastName : "Doe")
    setUserLastUpdated(userLastUpdated ? userLastUpdated : "")
    setUserBirthDate(userBirthDate ? userBirthDate : "--")
    setUserCity(userCity ? userCity : "--")
    setUserState(userState ? userState : "--")
    setUserFavoriteCharacter(userFavoriteCharacter ? userFavoriteCharacter : "--")
    setUserFavoriteRide(userFavoriteRide ? userFavoriteRide : "--")
    setUserFavoriteMovie(userFavoriteMovie ? userFavoriteMovie : "--")
    setUserFavoritePark(userFavoritePark ? userFavoritePark : "--")
  }, [])

  const handleEditProfile = () => {
    // Handling redirection to profile edition via onClick as button has an issue rendering whe using HREF.
    navigate("/profile/edit");
  }

  return (
    <StyledProfileWrapper>
      <StyledProfileUserName>{userFirstName} {userLastName}</StyledProfileUserName>
      {
        userLastUpdated !== "" ? (
          <p className="lastUpdated">Last Updated <time>{dayjs(Number(userLastUpdated)).format("ddd, MMM D, YYYY")}</time></p>
        ) : null
      }
      <dl>
        <div>
          <dt>Age:</dt>
          <dd>{dayjs().diff(userBirthDate, "year")}</dd>
        </div>
        <div>
          <dt>Location:</dt>
          <dd>{userCity} {userState}</dd>
        </div>
        <div>
          <dt>Favorite Character:</dt>
          <dd>{userFavoriteCharacter}</dd>
        </div>
        <div>
          <dt>Favorite Ride:</dt>
          <dd>{userFavoriteRide}</dd>
        </div>
        <div>
          <dt>Favorite Movie:</dt>
          <dd>{userFavoriteMovie}</dd>
        </div>
        <div>
          <dt>Favorite Disney Theme Park:</dt>
          <dd>{userFavoritePark}</dd>
        </div>
      </dl>
      <Button onClick={() => handleEditProfile()} margin="30px 0 0 0" label="Edit Profile" />
    </StyledProfileWrapper>

  );
}

export default Profile;