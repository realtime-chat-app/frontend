import Peer from "peerjs";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { v4 as uuidV4 } from "uuid";
import { peerReducer } from "../reducers/PeerReducer";
import { addPeerAction, removePeerAction } from "../reducers/PeerActions";

const WS = "http://localhost:8080";
export const ws = io(WS);

ws.on("connect", () => {
  console.log("connected with socket server");
});

export const RoomContext = createContext<null | any>(null);

interface Props {
  children: React.ReactNode;
}

export const RoomProvider: React.FunctionComponent<Props> = ({ children }) => {
  const navigate = useNavigate();

  const [currentPeer, setCurrentPeer] = useState<Peer>();

  const [roomId, setRoomId] = useState<string>("");
  const [peers, roomDispatch] = useReducer(peerReducer, {});

  // Enter room
  const enterRoom = ({ roomId }: any) => {
    navigate(`/room/${roomId}`);
  };

  // Remove a Peer
  const removePeer = (peerId: string) => {
    roomDispatch(removePeerAction(peerId));
  };

  // get user details
  const getUsers = ({ participants }: any) => {
    console.log({ participants });
  };

  useEffect(() => {
    const currentPeerId = uuidV4();
    const peer = new Peer(currentPeerId);
    setCurrentPeer(peer);

    ws.on("room-created", enterRoom);
    ws.on("user-disconnected", removePeer);
    ws.on("get-users", getUsers);

    return () => {
      ws.off("room-created");
      ws.off("user-disconnected");
      ws.off("get-users");
    };
  }, []);

  useEffect(() => {
    if (!currentPeer) return;

    // call every peer in our room
    ws.on("user-joined", ({ peerId }) => {
      const dataConnection = currentPeer.connect(peerId);
      dataConnection.on("open", () => {
        roomDispatch(addPeerAction(peerId));
      });
    });

    // receive data connection from other peers
    currentPeer.on("connection", (dataConnection) => {
      dataConnection.on("open", () => {
        roomDispatch(addPeerAction(dataConnection.peer));
      });
    });
  }, [currentPeer]);

  return (
    <RoomContext.Provider value={{ ws, currentPeer, setRoomId, roomId }}>
      {children}
    </RoomContext.Provider>
  );
};
