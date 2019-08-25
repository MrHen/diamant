import * as _ from 'lodash';
import * as uuid from 'uuid/v4';

interface Game {
    id: string;
}

const games: {[id: string]: Game} = {};

export function create() {
    let id;
    do {
        id = uuid();
    } while (games[id]);

    games[id] = {
        id,
    };

    return games[id];
}

export function retrieve(id: string) {
    return games[id] || null;
}

export function list() {
    return _.map(games, (game) => {
        return _.pick(game, ['id']);
    })
}
