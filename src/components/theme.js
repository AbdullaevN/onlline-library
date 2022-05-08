import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  background: "gray",
  body: "#fff",
  fontColor: "#000",
};

export const darkTheme = {
  background: "red",

  body: "#000",
  fontColor: "#fff",
};

export const GlobalStyles = createGlobalStyle`
	button {
		background-color: ${(props) => props.theme.body};
	}
`;
