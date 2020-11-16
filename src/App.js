import React, { useState } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { ThemeProvider } from "styled-components";
import HeaderPanel from "./components/layout/HeaderPanel/HeaderPanel";
import SidePanel from "./components/layout/SidePanel/SidePanel";
import ConfessionsList from "./features/confession/ConfessionsList";
import ProfilePanel from "./components/ProfilePanel/ProfilePanel";
import { lightTheme, darkTheme } from "./utils/theme";
import { GlobalStyles } from "./utils/global";
import useDarkMode from "./components/useDarkMode";
import "./App.css";

const App = () => {
  const [theme, toggleTheme] = useDarkMode();
  const [searchTerm, setSearchTerm] = useState("");
  const [displayProfileScreen, setDisplayProfileScreen] = useState(false);

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Grid>
        <Grid.Row>
          <HeaderPanel
            theme={theme}
            toggleTheme={toggleTheme}
            onSearchTermChange={(event) => setSearchTerm(event.target.value)}
            openProfilePanel={() => {
              setDisplayProfileScreen(true);
            }}
          />
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <SidePanel theme={theme} />
          </Grid.Column>
          <Grid.Column width={10}>
            <div style={{ position: "absolute", top: 90, left: 25 }}>
              {displayProfileScreen ? (
                <ProfilePanel
                  closeProfileScreen={() => setDisplayProfileScreen(false)}
                />
              ) : (
                <ConfessionsList searchTerm={searchTerm} />
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
