import {
  Button,
  Grid,
  TextField,
  Container,
  Stack,
  Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import io from "socket.io-client";

import Chat from "./Chat";
import { useLocalStorage } from "./useStorage";

const socket = io("http://localhost:3001");

const ChatApp = () => {
  const [userStorage, setStorage] = useLocalStorage("user", {
    name: "",
    room: "",
  });
  const [roomJoined, setRoomJoined] = useLocalStorage("room", false);

  const [user, setUser] = React.useState({
    name: "",
    room: "",
  });

  useEffect(() => {
    setUser(userStorage);
  }, [userStorage, setStorage]);

  const joinRoom = () => {
    if ((user.name !== "", user.room !== "")) {
      socket.emit("join", { name: user.name, room: user.room }, (error) => {
        if (error) {
          console.log(error);
        }
      });
      setRoomJoined(true);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      {!roomJoined ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              onChange={handleChange}
              name="name"
              value={user.name}
            />
          </Grid>

          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={6}
              alignContent="center"
              justifyContent="center">
              <Button
                variant="contained"
                onClick={() => {
                  setUser({ ...user, room: "Room1" });
                }}>
                Room1
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setUser({ ...user, room: "Room2" });
                }}>
                Room2
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setUser({ ...user, room: "Room3" });
                }}>
                Room3
              </Button>
              <TextField
                label="Custom Room ?"
                fullWidth
                margin="normal"
                onChange={handleChange}
                name="room"
                value={user.room}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider />
            <Button
              sx={{ mt: 4 }}
              color="secondary"
              variant="contained"
              size="large"
              onClick={() => joinRoom()}>
              join
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={8}>
            <Chat socket={socket} user={user} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ChatApp;
