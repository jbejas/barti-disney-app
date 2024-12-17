import styled from "styled-components";
import theme from "../constants/theme";

// STYLED BUTTON
const StyledButton = styled.span<{
  $variant?: "primary" | "secondary";
  $margin?: string;
  $buttonType?: "button" | "submit" | "reset"; // Add button type to handle submit in form
  $className?: string; // Add className to allow adding class tag to button
}>`
  display: inline-block;

  a, button {
    margin: ${props => props.$margin || ""};
    box-shadow: ${props => props.$variant === "secondary" ? "none" : "0 4px 4px 0 rgba(5, 69, 83, 0.24)"};
    background-color: ${props => props.$variant === "secondary" ? theme.light : theme.accent};
    border: 1px solid ${theme.accent};
    color: ${props => props.$variant === "secondary" ? theme.accent : theme.light};
    cursor: pointer;
    font-size: 16px;
    padding: 16px 24px;
    border-radius: 8px;
    text-decoration: none;
    text-align: center;
    transition: all 0.3s ease-in-out;

    @media (max-width: 960px) {
      display: block;
    }

    &:hover {
      box-shadow: 0 4px 16px 0 rgba(5, 69, 83, 0.32);
      opacity: 0.8;
    }
  }
`;

// BUTTON COMPONENT PROPS
interface ButtonProps {
  onClick?: () => void;
  href?: string;
  label?: string;
  variant?: "primary" | "secondary";
  margin?: string;
  buttonType?: "button" | "submit" | "reset";
  className?: string;
}

/* 
* BUTTON COMPONENT
*
* description: Primary and secondary button component for the application
* @returns {JSX.Element}
*/
const Button = ({
  onClick,
  href,
  label,
  variant = "primary",
  margin,
  buttonType = "button",
  className
}: ButtonProps) => {
  let content = null;

  // IF HREF IS PROVIDED CREATE HYPERLINK
  if (href) {
    content = <a href={href}>{label}</a>;
  }

  // IF TYPE IS PROVIDED CREATE BUTTON WITH IT.
  if (buttonType) {
    content = <button type={buttonType}>{label}</button>;
  }

  // IF CLICK IS PROVIDED CREATE BUTTON
  if (onClick) {
    content = <button className={className} onClick={onClick}>{label}</button>;
  }

  return <StyledButton className={className} $variant={variant} $margin={margin}>{content}</StyledButton>;
}

export default Button;