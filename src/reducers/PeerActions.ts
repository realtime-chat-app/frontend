export const ADD_PEER = "ADD_PEER" as const;
export const REMOVE_PEER = "REMOVE_PEER" as const; 

export const addPeerAction = (peerId:string) => ({
    type:ADD_PEER,
    payload:{peerId}
})

export const removePeerAction = (peerId:string) => ({
    type:REMOVE_PEER,
    payload: {peerId}
})