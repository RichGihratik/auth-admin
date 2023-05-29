import { Grid, Avatar, Button, TextField, Box, colors } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { API_URL } from "@/types";

const signupUrl = `${API_URL}/auth/signup`;

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function signupRequest() {
    const res = await fetch(signupUrl, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    if (!res.ok) {
      // some error handling...
    } else {
      // some redirect logic...
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      
    >
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={signupRequest}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
