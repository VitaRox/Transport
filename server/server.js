const express = require('express');
const app = express();

// port will either be 4000 by default or, if 4000 is in-use, another available port;
const port = 4000 || process.env.PORT;

// bodyParser is a method for parsing the bodies of requests & responses;
const bodyParser = require('body-parser');

// Routing middleware;
const staticRoutes = require('./routes/static-routes');  // Not 100% sure I'll need this
const reportRoutes = require('./routes/report-routes');
const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/auth-routes');

// Middleware to parse bodies of JSON requests made to the API
// TODO: swap out bodyParser.json for express.json() (bodyParser is now deprecated)
app.use(bodyParser.json())

// Static routes middleware
app.use('/', staticRoutes);

// This will filter to only pass requests made to paths beginning with '/'
// to the router middleware in ./routes/data-routes;
// reportRoutes will be used to route requests/responses to and from /data/view
// and /data/new (if user is logged in)
app.use('/data', reportRoutes);

// This will filter requests to user-related paths
// (e.g. creating a User Account, viewing User Account, signing out)
app.use('/users', userRoutes);

// Send requests to appropriate middleware for signing in, signing out
app.use('/auth', authRoutes);

// Error handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
    .json(
      { message: error.message || "An error occurred." }
    );
});

// Listens on an available port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
