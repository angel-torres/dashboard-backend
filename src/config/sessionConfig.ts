import session from 'express-session';
import connection from './connectionConfig';
const MongoStore = require('connect-mongo')(session);

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: connection, collection: 'sessions'}),
  cookie: { 
        secure: false,
        maxAge: 6000 
    }
};

export default sessionConfig;