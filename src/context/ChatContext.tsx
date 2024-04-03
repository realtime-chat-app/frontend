import React, { createContext, useContext, useEffect, useReducer } from "react";
import { RoomContext } from "./RoomContext";
import { chatReducer } from "../reducers/ChatReducers";
import { addHistoryAction, addMessageAction } from "../reducers/ChatActions";
import { IMessage } from "../types/Chat";

export const ChatContext = createContext<null | any>(null);

interface Props {
  children: React.ReactNode;
}

export const ChatProvider: React.FunctionComponent<Props> = ({ children }) => {
  const { ws, currentPeer } = useContext(RoomContext);

  const [chat, chatDispatch] = useReducer(chatReducer, {
    messages: [],
  });

  const sendMessage = (message: string, roomId: string) => {
    const messageData: IMessage = {
      content: message,
      timestamp: new Date().getTime(),
      author: currentPeer?._id,
    };

    chatDispatch(addMessageAction(messageData));
    ws.emit("send-message", roomId, messageData);
  };

  const addMessage = (message:IMessage) => {
    chatDispatch(addMessageAction(message));
  };

  const addHistory = (messages: IMessage[]) => {
    chatDispatch(addHistoryAction(messages));
  }

  useEffect(() => {
    ws.on("add-message", addMessage);
    ws.on("get-messages", addHistory)

    return () => {
      ws.off("add-message");
      ws.off("get-messages")
    };
  }, []);

  return (
    <ChatContext.Provider value={{ sendMessage, chat }}>
      {children}
    </ChatContext.Provider>
  );
};
