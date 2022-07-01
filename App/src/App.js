import logo from "./logo.svg";
import "./App.css";
import ChatApp from "./ChatApp";
import {
  Button,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { themeDark, themeLight } from "./Theme";

function App() {
  const [theme, setTheme] = useState(false);
  return (
    <ThemeProvider theme={!theme ? themeDark : themeLight}>
      <CssBaseline />
      <Stack display="flex" justifyContent="center">
        <Button onClick={() => setTheme(!theme)}>
          <img src={logo} className="App-logo" alt="logo" />
        </Button>
        <Typography align="center" variant="h4">React Chat</Typography>
      </Stack>
      <ChatApp />
    </ThemeProvider>
  );
}

export default App;
