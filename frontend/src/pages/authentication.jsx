import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Stack,
  Card,
} from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState("");
  const [formState, setFormState] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f4f7f9",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          sx={{ p: 4, maxWidth: "1000px" }}
        >
          {/* Left Side: Branding/Content */}
          <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              SyncMeet
            </Typography>
            <Typography variant="body1">
              Connect with anyone, anywhere, instantly.
            </Typography>
          </Box>

          {/* Right Side: Login Card */}
          <Card sx={{ p: 4, width: "100%", maxWidth: "400px", boxShadow: 3 }}>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button
                variant={formState === 0 ? "contained" : "outlined"}
                onClick={() => setFormState(0)}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? "contained" : "outlined"}
                onClick={() => setFormState(1)}
              >
                Sign Up
              </Button>
            </ButtonGroup>
            {formState === 1 && (
              <TextField
                fullWidth
                id="Full name"
                name="Full name"
                label="Full name"
                margin="normal"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <TextField
              fullWidth
              id="username"
              name="username"
              label="username"
              margin="normal"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            {formState === 0 && (
              <Button
                fullWidth
                variant={formState === 0 ? "contained" : ""}
                onClick={() => setFormState(0)}
                size="large"
                sx={{ mt: 2 }}
              >
                Sign In
              </Button>
            )}

            {formState === 1 && (
              <Button
                fullWidth
                variant={formState === 1 ? "contained" : ""}
                onClick={() => setFormState(1)}
                size="large"
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            )}
          </Card>
        </Stack>
      </Box>
    </div>
  );
}
