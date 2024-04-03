import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import Chat from "../components/Chat";

const Room = () => {
  const { id } = useParams();
  const {ws, currentPeer, setRoomId} = useContext(RoomContext);

  useEffect(()=>{
    if(currentPeer){
      ws.emit("join-room", {roomId: id, peerId: currentPeer._id});
    }
  },[id, currentPeer, ws])

  useEffect(()=>{
    setRoomId(id);
  },[id, setRoomId])
  
  return (
    <div>
      <p>Room No: {id}</p>

      {/* Chat component*/}
      <Chat/>
    </div>
  );
};

export default Room;
