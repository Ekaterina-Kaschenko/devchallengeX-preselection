/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const fs = require('fs');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const pointsFile = resolve(__dirname, 'points.json');

app.get('/points.json', (req, res) => {
  res.sendFile(pointsFile);
});
app.post('/api/addPoint', (req, res) => {
  const point = req.body;
  if (point) {
    fs.readFile(pointsFile, 'utf8', (error, data) => {
      if (error) {
        return res.json({ error });
      }
      const { points } = JSON.parse(data);
      if (!point.id) {
        point.id = `${Math.max(...Object.keys(points).map(parseInt)) + 1}`;
      }
      if (points[point.id].name !== point.name) {
		Object.keys(points).map((key) => {
			points[key].connections.map(c => {
				if (c.to === point.id) {
					c.name = point.name;
				}
			});
		});
	  }
	  points[point.id] = point;
      fs.writeFile(pointsFile, JSON.stringify({ points }), 'utf-8', (err) => {
        if (err) {
          return res.json({ error: err });
        }
        res.json({ success: true });
      });
    });
  }
});
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
