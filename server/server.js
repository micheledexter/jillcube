
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes ---------- DON'T FORGET ABOUT PART II BELOW
const userRouter = require('./routes/user.router');
const dataRouter = require('./routes/data.router');
const playerRouter = require('./routes/players.router');
const gameInstanceRouter = require('./routes/game-instance.router');
const answerRouter = require('./routes/answer.router');
const watsonRouter = require('./routes/watson.router');
const holmesRouter = require('./routes/holmes.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes ---------- THIS IS PART II*/
app.use('/api/user', userRouter);
app.use('/api/data', dataRouter);
app.use('/api/players', playerRouter);
app.use('/api/game-instance', gameInstanceRouter);
app.use('/api/answers', answerRouter);
app.use('/api/watson', watsonRouter);
app.use('/api/holmes', holmesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
