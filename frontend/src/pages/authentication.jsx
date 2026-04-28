import React from "react";
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

export default function SignInSide() {
  return (
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
          <Typography variant="h5" sx={{ mb: 2 }}>
            Sign In
          </Typography>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
          />
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Button fullWidth variant="contained" size="large" sx={{ mt: 2 }}>
            Sign In
          </Button>
        </Card>
      </Stack>
    </Box>
  );
}
