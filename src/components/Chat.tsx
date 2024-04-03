import { useContext, useState } from "react";
import { RoomContext } from "../context/RoomContext";
import { ChatContext } from "../context/ChatContext";
import classNames from "classnames";

const Chat = () => {
  const [message, setMessage] = useState<any>("");

  const { roomId, currentPeer } = useContext(RoomContext);
  const isCurrentPeer = message.author === currentPeer?.id;

  const { sendMessage, chat } = useContext(ChatContext);

  return (
    <div>
      {/* other chats */}
      <div className="chats">
        {chat.messages.map((message: any) => (
          <div
            key={message.timestamp}
            className={classNames("m-2 flex", {
              "pl-10 justify-end": isCurrentPeer,
              "pl-10 justify-start": !isCurrentPeer,
            })}
          >
            <div
              className={classNames("inline-block py-2 px-4 rounded", {
                "bg-red-200": isCurrentPeer,
                "bg-red-300": !isCurrentPeer,
              })}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* text input */}
      <div className="chat-input">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(message, roomId);
            setMessage("");
          }}
        >
          <textarea
            className=""
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
