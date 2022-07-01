import React, { useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Stack, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";

const SendMessageComponent = ({ socket, user, setMessages }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        author: user,
        time: new Date().toLocaleTimeString(),
      };

      await socket.emit("sendMessage", messageData, (error) => {
        if (error) {
          console.log(error);
        }
      });
      setMessages((messages) => [...messages, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <Box
      mt={2}
      sx={{
        position: "sticky",
        bottom: "0",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem",
        backgroundColor: "background.paper",
        borderRadius: "0.5rem",
        zIndex: "1",
      }}>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "100%",
          padding: "0.5rem",
        }}
        direction="row"
        spacing={2}>
        <TextField
          fullWidth
          id="ChatInput"
          label="Type..."
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <Button
          onClick={sendMessage}
          onKeyPress={(event) => {
            console.log(event.key);
            if (event.key === "Enter") {
              sendMessage();
            }
          }}>
          <SendOutlinedIcon />
        </Button>
      </Stack>
    </Box>
  );
};

export default SendMessageComponent;
