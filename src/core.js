import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
	return state.set('entries', List(entries));
}

function getWinner(vote) {
	if(!vote) return [];

	const [a,b] = vote.get('pair');

	const aVote = vote.getIn(['tally', a], 0);
	const bVote = vote.getIn(['tally', b], 0);

	if(aVote === bVote) return [a,b];
	if(aVote > bVote) return [a];
	else return [b];
}

export function next(state) {
    const entries = state.get('entries')
							.concat(getWinner(state.get('vote')));
	if(entries.size === 1) {
		return state.remove('vote')
					.remove('entries')
					.set('winner', entries.first());
	} else {
    	return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
            });
	}
}

export function vote(state, entry) {
	return state.updateIn(
			['vote', 'tally', entry],
			0,
			tally => tally + 1
			);
}
