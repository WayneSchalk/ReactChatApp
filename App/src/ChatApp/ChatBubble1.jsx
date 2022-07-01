import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ChatBubble1 = ({ msg, user }) => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <Box
      display="flex"
      justifyContent={
        user.name === msg?.author?.name ? "flex-start" : "flex-end"
      }
      alignContent="center">
      <Stack
        sx={{
          maxWidth: "80%",
        }}>
        <Typography align="left" variant="caption" color="textSecondary">
          {msg?.author?.name}
        </Typography>
        <Box
          sx={{
            display: "inline-block",
            margin: "0.5rem 0",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            borderWidth: "1px ",
            borderStyle: "solid",
            borderColor: randomColor,
          }}>
          <Typography
            align="center"
            variant="body2"
            color="textSecondary"
            component="p">
            {msg?.message}
          </Typography>
        </Box>
        <Typography align="right" variant="caption" color="textSecondary">
          {msg?.time}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ChatBubble1;
