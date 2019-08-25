import * as _ from 'lodash';
import * as uuid from 'uuid/v4';

interface Game {
    id: string;
    name: string;
}

const defaults = Object.freeze({
    name: 'Game',
})

const games: {[id: string]: Game} = {};

export function create(game: {
    name: string,
}) {
    let id;
    do {
        id = uuid();
    } while (games[id]);

    games[id] = {
        ...defaults,
        ...game,
        id: id,
    };

    return retrieve(id);
}

export function retrieve(id: string) {
    const {
        name,
    } = games[id];

    return {
        id,
        name,
    };
}

export function list() {
    return Object.keys(games).map((id) => {
        return retrieve(id);
    })
}
