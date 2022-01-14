import logo from "../logo.svg";
import "../App.css";
import webSocket from "socket.io-client";
import { BrowserRouter as Router } from "react-router-dom";
import Guide from "./guide";
import { socket, SocketContext } from "../socket";
function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Guide />
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
