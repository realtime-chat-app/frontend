import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RoomProvider } from "./context/RoomContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RoomProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </RoomProvider>
  </BrowserRouter>
);
