import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgetPassword from "./pages/auth/ForgetPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UsersProvider } from "./context/UsersContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import { SelectedChatProvider } from "./context/SelectedChat.jsx";
import { MessageProvider } from "./context/MessageContext.jsx";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;
export default function App() {
  return (
      <AuthProvider>
        <UsersProvider>
          <SelectedChatProvider>
            <SocketProvider>
              <MessageProvider>
                <Navbar />
                <Routes>
                  <Route path="/:id?" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forget-password" element={<ForgetPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
                <Toaster position="bottom-right" reverseOrder={false} />
              </MessageProvider>
            </SocketProvider>
          </SelectedChatProvider>
        </UsersProvider>
      </AuthProvider>
  );
}
