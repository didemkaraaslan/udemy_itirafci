import React from "react";
import styled from "styled-components";
import { ReactComponent as MoonIcon } from "../../../images/moon.svg";
import { ReactComponent as SunIcon } from "../../../images/sun.svg";

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.toggleBackground};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.1rem;
  position: relative;
  width: 3.7rem;
  height: 2rem;
  svg {
    height: 1.4rem;
    width: 2rem;
    transition: all 0.3s linear;
    // sun icon
    &:first-child {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(0)" : "translateY(100px)"};
    }
    // moon icon
    &:nth-child(2) {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(-100px)" : "translateY(0)"};
    }
  }
`;

const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";

  return (
    <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
      <SunIcon />
      <MoonIcon />
    </ToggleContainer>
  );
};

export default Toggle;
