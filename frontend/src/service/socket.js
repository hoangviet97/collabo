import io from "socket.io-client";
const ENDPOINT = "http://localhost:9000";
export default io(ENDPOINT, { transports: ["websocket", "polling", "flashsocket"] });
