import styled from "styled-components";
import theme from "../constants/theme";

// LOADING CONTAINER
const StyledLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;

  p {
    color: ${theme.accent};
    font-size: 16px;
    font-weight: normal;
  }
`;

// LOADING INDICATOR
const StyledLoadingIndicator = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid ${theme.accent};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  animation: pulse 1s linear infinite;
  opacity: 0.5;

&:after {
  content: '';
  position: absolute;
  width: 48px;
  height: 48px;
  border: 5px solid ${theme.accent};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: scaleUp 1s linear infinite;
}

@keyframes scaleUp {
  0% { transform: translate(-50%, -50%) scale(0) }
  60% , 100% { transform: translate(-50%, -50%)  scale(1)}
}
@keyframes pulse {
  0% , 60% , 100%{ transform:  scale(1) }
  80% { transform:  scale(1.2)}
  }
`;

/* 
* LOADING INDICATOR COMPONENT
*
* description: Loading indicator to display while data is loading
* @returns {JSX.Element}
*/
const LoadingIndicator = () => {
  return (
    <StyledLoadingContainer>
      <StyledLoadingIndicator />
      <p>One moment please...</p>
    </StyledLoadingContainer>
  )
}

export default LoadingIndicator;