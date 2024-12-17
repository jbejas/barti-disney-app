/* 
* PROFILE PAGE COMPONENT
*
* description: Profile page component that displays user profile information and allows for editing
* @returns {JSX.Element}
*/

import { useNavigate } from "react-router";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import Cookies from 'js-cookie'
import styled from "styled-components";

import Button from "../../components/button";
import CustomSelect from "../../components/CustomSelect";

import dayjs from "dayjs";

// STYLED PROFILE WRAPPER
const StyledProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  h2 {
    font-size: 40px;
    color: #222;
    line-height: 48px;
    margin: 0 0 15px 0;
  }
  div.row {
    display: flex;
    width: 100%;
    margin: 0 0 15px 0;
  }
  fieldset {
    display: flex;
    width: 320px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    float: left;
    margin: 0 10px 0 0;
    label {
      width: 100%;
      text-align: left;
      font-size: 16px;
      color: #5B6873;
      line-height: 24px;
    }
    div {
      font-size: 12px;
      color: #FF0000;
      margin: 5px 0 0 0;
    }
  }
`;

const Input = styled.input`
  padding: 0.5em;
  background: white;
  border: 1px solid #C2CCDA;
  border-radius: 4px;
  outline: none;
  width: 300px;
`;

const InputLarge = styled.input`
  padding: 0.5em;
  background: white;
  border: 1px solid #C2CCDA;
  border-radius: 4px;
  outline: none;
  width: 630px;
`;

type Inputs = {
  userFirstName: string
  userLastName: string
  userBirthDate: string
  userCity: string
  userState: string
  userFavoriteCharacter: string
  userFavoriteRide: string
  userFavoriteMovie: string
  userFavoritePark: string
}

const ProfileEdit = () => {

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  // US States to populate form
  const stateOptions = [
    { value: "", label: "Select your state" },
    { value: "Alabama", label: "Alabama" },
    { value: "Alaska", label: "Alaska" },
    { value: "Arizona", label: "Arizona" },
    { value: "Arkansas", label: "Arkansas" },
    { value: "California", label: "California" },
    { value: "Colorado", label: "Colorado" },
    { value: "Connecticut", label: "Connecticut" },
    { value: "Delaware", label: "Delaware" },
    { value: "Florida", label: "Florida" },
    { value: "Georgia", label: "Georgia" },
    { value: "Hawaii", label: "Hawaii" },
    { value: "Idaho", label: "Idaho" },
    { value: "Illinois", label: "Illinois" },
    { value: "Indiana", label: "Indiana" },
    { value: "Iowa", label: "Iowa" },
    { value: "Kansas", label: "Kansas" },
    { value: "Kentucky", label: "Kentucky" },
    { value: "Louisiana", label: "Louisiana" },
    { value: "Maine", label: "Maine" },
    { value: "Maryland", label: "Maryland" },
    { value: "Massachusetts", label: "Massachusetts" },
    { value: "Michigan", label: "Michigan" },
    { value: "Minnesota", label: "Minnesota" },
    { value: "Mississippi", label: "Mississippi" },
    { value: "Missouri", label: "Missouri" },
    { value: "Montana", label: "Montana" },
    { value: "Nebraska", label: "Nebraska" },
    { value: "Nevada", label: "Nevada" },
    { value: "New Hampshire", label: "New Hampshire" },
    { value: "New Jersey", label: "New Jersey" },
    { value: "New Mexico", label: "New Mexico" },
    { value: "New York", label: "New York" },
    { value: "North Carolina", label: "North Carolina" },
    { value: "North Dakota", label: "North Dakota" },
    { value: "Ohio", label: "Ohio" },
    { value: "Oklahoma", label: "Oklahoma" },
    { value: "Oregon", label: "Oregon" },
    { value: "Pennsylvania", label: "Pennsylvania" },
    { value: "Rhode Island", label: "Rhode Island" },
    { value: "South Carolina", label: "South Carolina" },
    { value: "South Dakota", label: "South Dakota" },
    { value: "Tennessee", label: "Tennessee" },
    { value: "Texas", label: "Texas" },
    { value: "Utah", label: "Utah" },
    { value: "Vermont", label: "Vermont" },
    { value: "Virginia", label: "Virginia" },
    { value: "Washington", label: "Washington" },
    { value: "West Virginia", label: "West Virginia" },
    { value: "Wisconsin", label: "Wisconsin" },
    { value: "Wyoming", label: "Wyoming" },
  ];

  // Disney Parks to populate form
  const disneyParks = [
    { value: "", label: "Select your favorite Disney Park" },
    { value: "Magic Kingdom Park", label: "Magic Kingdom Park" },
    { value: "EPCOT", label: "EPCOT" },
    { value: "Disney's Hollywood Studios", label: "Disney's Hollywood Studios" },
    { value: "Disney's Animal Kingdom Theme Park", label: "Disney's Animal Kingdom Theme Park" },
    { value: "Disney's Typhoon Lagoon", label: "Disney's Typhoon Lagoon" },
    { value: "Disney's Blizzard Beach", label: "Disney's Blizzard Beach" },
  ];

  const handleCancelEditProfile = () => {
    navigate("/profile")
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Iterate over each form field and store its value in a cookie
    Object.entries(data).forEach(([key, value]) => {
      /*
      No need to check if the form field has a value before setting the cookie as the
      should be allowed to delete data from its profile.
      */
      // Set the cookie for the current form field
      Cookies.set(key, value.toString());
    });
    // Update the 'userLastUpdated' cookie with the current timestamp to show in profile main view
    Cookies.set("userLastUpdated", dayjs().valueOf().toString());
    // Navigate the user back to the profile page after submitting the form
    navigate("/profile");
  }

  return (
    <StyledProfileWrapper>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <fieldset>
            <label>First Name <span style={{ color: "red" }}>*</span></label>
            <Controller
              defaultValue={Cookies.get('userFirstName') ? Cookies.get('userFirstName') : "John"}
              name="userFirstName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.userFirstName && <div role="alert">This field is required</div>}
          </fieldset>
          <fieldset>
            <label>Last Name <span style={{ color: "red" }}>*</span></label>
            <Controller
              defaultValue={Cookies.get('userLastName') ? Cookies.get('userLastName') : "Doe"}
              name="userLastName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.userLastName && <div role="alert">This field is required</div>}
          </fieldset>
        </div>
        <div className="row">
          <fieldset>
            <label>Birth Date <span style={{ color: "red" }}>*</span></label>
            <Controller
              defaultValue={dayjs(Cookies.get('userBirthDate')).format('YYYY-MM-DD')}
              name="userBirthDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input type="date" {...field} />}
            />
            {errors.userBirthDate && <div role="alert">This field is required</div>}
          </fieldset>
        </div>
        <div className="row">
          <fieldset>
            <label>City</label>
            <Controller
              defaultValue={Cookies.get('userCity')}
              name="userCity"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </fieldset>
          <fieldset>
            <label>State</label>
            <Controller
              defaultValue={Cookies.get('userState')}
              name="userState"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={stateOptions}
                />
              )}
            />
          </fieldset>
        </div>
        <div className="row">
          <fieldset>
            <label>Favorite Character</label>
            <Controller
              defaultValue={Cookies.get('userFavoriteCharacter')}
              name="userFavoriteCharacter"
              control={control}
              render={({ field }) => <InputLarge {...field} />}
            />
          </fieldset>
        </div>
        <div className="row">
          <fieldset>
            <label>Favorite Ride</label>
            <Controller
              defaultValue={Cookies.get('userFavoriteRide')}
              name="userFavoriteRide"
              control={control}
              render={({ field }) => <InputLarge {...field} />}
            />
          </fieldset>
        </div>
        <div className="row">
          <fieldset>
            <label>Favorite Movie</label>
            <Controller
              defaultValue={Cookies.get('UserFavoriteMovie')}
              name="userFavoriteMovie"
              control={control}
              render={({ field }) => <InputLarge {...field} />}
            />
          </fieldset>
        </div>
        <div className="row">
          <fieldset>
            <label>Favorite Disney Theme Park</label>
            <Controller
              defaultValue={Cookies.get('userFavoritePark')}
              name="userFavoritePark"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={disneyParks}
                />
              )}
            />
          </fieldset>
        </div>
        <div className="row">
          <Button buttonType="submit" margin="30px 10px 0 0" label="Update Profile" />
          <Button onClick={() => handleCancelEditProfile()} margin="30px 0 0 0" variant="secondary" label="Cancel" />
        </div>
      </form>

    </StyledProfileWrapper >

  );
}

export default ProfileEdit;