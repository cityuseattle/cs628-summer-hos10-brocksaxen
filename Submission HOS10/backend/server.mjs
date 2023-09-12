import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";

import session from "express-session";
import passport from "passport";
import passportFacebook from "passport-facebook";
const FacebookStrategy = passportFacebook.Strategy;

//I don't have facebook, so I wasn't able to get the api id or key
const FACEBOOK_APP_ID = "Your APP ID"
const FACEBOOK_APP_SECRET = "Your Secret"

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      // Your callback URL
      callbackURL: 'YourBackendURL/facebook/callback', 
      // Fields you want to access from the user's Facebook profile
      profileFields: ['id', 'displayName', 'email'], 
    },
    async (accessToken, refreshToken, profile, done) => {
      //logic for using accessToken and RefreshToken
      return done(null, profile);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});