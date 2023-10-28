import * as React from 'react';
import { signInWithEmailAndPassword, auth } from "../firebase/index.js"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink , useNavigate} from 'react-router-dom';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        navigate("/home")
                        console.log("User login", user)
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage)
                    });
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
   
    return (
        <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
               Log in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <NavLink to={"/signup"} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </NavLink>
                  </Grid>
                </Grid>
               
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
}





// import { useState } from "react"

// function Login() {

//     const [email, setEmail] = useState("")
//     const [pass, setPass] = useState("")
//     const login = () => {
//         signInWithEmailAndPassword(auth, email, pass)
//             .then((userCredential) => {
//                 // Signed in
//                 const user = userCredential.user;
//                 console.log("User login", user)
//                 // ...
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorMessage)
//             });


//     }


//     return (
//         <div className="grid place-items-center">
//             <div className="flex flex-col gap-6">
//                 <h1 className="text-red-600">Login</h1>


//                 <input type="email" onChange={(e) => {
//                     setEmail(e.target.value)
//                 }} placeholder="Name" />
//                 <input type="password" onChange={(e) => {
//                     setPass(e.target.value)
//                 }} placeholder="Password" />
//                 <button onClick={login} className="bg-green-300">
//                     Login
//                 </button>
//                 <button className="bg-red-300" onClick={async () => {

//                 }}>
//                     Logout
//                 </button>

//             </div>
//         </div>
//     )
// }

// export default Login
