import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { GoogleIcon } from "./components/CustomIcons";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUp(props) {
  const navigate = useNavigate();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState("");

  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [otpSent, setOtpSent] = React.useState(false);
  const [useOtp, setUseOtp] = React.useState(false);
  

  const toggleAuthMethod = () => {
    setUseOtp((prev) => !prev);
  };

  const validatePhone = () => {
    const phone = document.getElementById("phone");
    if (!phone.value || phone.value.length < 10) {
      setPhoneError(true);
      setPhoneErrorMessage("Enter a valid phone number.");
    } else {
      setPhoneError(false);
      setPhoneErrorMessage("");
      alert("OTP sent to your phone!"); // Simulate OTP sending
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!phone.value || phone.value.length < 1) {
      setPhoneError(true);
      setPhoneErrorMessage("Phone Number is required.");
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    if (nameError || emailError || passwordError || phoneError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phone"),
    });
  };
  const [error, setError] = React.useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User details:", user);
      const userData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      };
      navigate("/dashboard", { state: { user: userData } });
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      setError(error.message);
    }
  };
  const handleSendOtp = async () => {
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber
      );
      setOtpSent(true);
      console.log("OTP sent to", phoneNumber);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      console.log("User details:", user);
      const userData = {
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        uid: user.uid,
      };
      navigate("/dashboard", { state: { user: userData } });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(error.message);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {!useOtp && (
              <>
                <FormControl>
                  <FormLabel htmlFor="name">Full name</FormLabel>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    placeholder="Jon Snow"
                    error={nameError}
                    helperText={nameErrorMessage}
                    color={nameError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    error={emailError}
                    helperText={emailErrorMessage}
                    color={emailError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    color={passwordError ? "error" : "primary"}
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={validateInputs}
                >
                  Sign up
                </Button>
              </>
            )}
            {useOtp && (
              <>
                <FormControl>
                  <FormLabel htmlFor="name">Full name</FormLabel>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    placeholder="Jon Snow"
                    error={nameError}
                    helperText={nameErrorMessage}
                    color={nameError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="phone">Phone No</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    name="phone"
                    placeholder="1234567890"
                    error={phoneError}
                    helperText={phoneErrorMessage}
                  />
                </FormControl>
                {otpSent && (
                  <FormControl>
                    <FormLabel htmlFor="otp">OTP</FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="otp"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </FormControl>
                )}
                {!otpSent ? (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </Button>
                )}
                {error && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
              </>
            )}
          </Box>
          <Button variant="text" onClick={toggleAuthMethod}>
            {useOtp ? "Use Email & Password" : "Use Phone No"}
          </Button>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleSignIn}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/signin" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
