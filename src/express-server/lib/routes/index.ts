import express = require('express');
import games from './games';

const router = express.Router();

// Logging / utility route
router.use('/', (req, res, next) => {
    console.log(`start ${req.method} ${req.url}`);
    next();
});

router.get('/status', (req, res, next) => {
    res.status(200).end();
});

router.get('/hello', function (req, res) {
    res.json({
        'hello': 'world'
    })
})

router.use('/games', games)


// Fall through to error handler
router.use('/', (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    var status = err.statusCode || err.status || 500;
    var message = err.message || err.error || 'ERROR_UNKNOWN';
    res.status(status);
    res.send({
        message: message,
        error: err
    });

    console.log('ERROR', err);
});

// Reject all other routes
router.use('/', (req, res, next) => {
    console.log(`404 ${req.method} ${req.url}`);

    var status = 404;
    var message = 'ERROR_ROUTE_NOT_FOUND';
    res.status(status);
    res.send({
        message: message
    });
});

export default router;
