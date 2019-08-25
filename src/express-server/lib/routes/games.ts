import express = require('express');
import path = require('path');

import * as games from '../games';

const router = express.Router();

router.post('/', (req, res, next) => {
    const record = games.create();
    res.status(201).send(record);
});

router.get('/', (req, res, next) => {
    const records = games.list();
    res.send({
        count: records.length,
        records,
    });
});

router.get('/:gameId', (req, res, next) => {
    const gameId = req.params.gameId;
    const record = games.retrieve(gameId);

    if (!record) {
        res.status(404);
        return;
    }

    res.send(record);
});

export default router;
