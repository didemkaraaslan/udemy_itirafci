import React, { useState } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import HeaderPanel from "./components/layout/HeaderPanel/HeaderPanel";
import SidePanel from "./components/layout/SidePanel/SidePanel";
import ConfessionsList from "./features/confession/ConfessionsList";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);
  return (
    <div>
      <Grid>
        <Grid.Row>
          <HeaderPanel
            onSearchTermChange={(event) => setSearchTerm(event.target.value)}
          />
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <SidePanel />
          </Grid.Column>
          <Grid.Column width={10}>
            <div style={{ position: "absolute", top: 80, left: 25 }}>
              <ConfessionsList searchTerm={searchTerm} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default App;
