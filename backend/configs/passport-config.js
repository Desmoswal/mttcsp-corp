const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("../models/client");
const dotenv = require("dotenv").config();

passport.use('local', new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email})

        if(!user){
            done(null, false);
        }

        const isValid = await user.isPasswordValid(password);
        if(!isValid){
            return done(null,false);
        }

        done(null, user);
    } catch (error) {
        done(error, false)
    }
}));

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        console.log(user)
        if(!user){
            console.log("no user found")
            return done(null,false);
        }

        done(null, user);
    } catch (error) {
        done(error,false)
    }
}));
