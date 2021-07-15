import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import config from '../config';
import User from '../models/users.models';

const options:StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
}

export default new Strategy(options, async (payload, done) => {
    // const user = await User.findOne({$or: 
    //     [
    //     {email: payload.email},
    //     {userName: payload.userName}
    // ]})

    const user = await User.findOne({userName: payload.userName})

    if(!user){
        return done(null, false)
    }
    return done(null, user)
})