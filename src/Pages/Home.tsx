import { useContext } from "react"
import { RoomContext } from "../context/RoomContext"

const Home = () => {

  const {ws} = useContext(RoomContext);

  const createRoom = () => {
    ws.emit("create-room");
  }

  return (
    <div>
      <button onClick={createRoom}>Create Meeting</button>
    </div>
  )
}

export default Home
