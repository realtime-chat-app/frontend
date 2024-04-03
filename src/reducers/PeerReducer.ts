import {ADD_PEER, REMOVE_PEER} from './PeerActions';


export type PeerState = Record<string, string>;

type PeerAction =
    | {
        type: typeof ADD_PEER;
        payload: { peerId: string};
    }
    | {
        type: typeof REMOVE_PEER;
        payload: { peerId: string };
    };

export const peerReducer = (state: PeerState, action: PeerAction) => {
    switch (action.type) {
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerId]: action.payload.peerId
            };
        case REMOVE_PEER:
            const { [action.payload.peerId]: removedPeer, ...rest } = state; 
            return rest;
        default:
            return { ...state };
    }
}