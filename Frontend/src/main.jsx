import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UsersProvider } from "./context/UsersContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import { SelectedChatProvider } from "./context/SelectedChat.jsx";
import { MessageProvider } from "./context/MessageContext.jsx";
createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <UsersProvider>
        <SelectedChatProvider>
          <SocketProvider>
            <MessageProvider>
              <App />
            </MessageProvider>
          </SocketProvider>
        </SelectedChatProvider>
      </UsersProvider>
    </AuthProvider>
  </Router>
);
