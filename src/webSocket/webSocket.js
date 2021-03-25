import { io } from "socket.io-client";
import store from "../store/store";
import * as actions from "../store/actions/index";


export const connectSocket = (customClientID) => {
  const socket = io("http://localhost:4000", {
    autoConnect: true,
  });
  socket.emit("storeClient", { customId: customClientID });
  socket.on("calendar", (socket) => {
    const randomID = Math.random(100);
    store.dispatch(actions.eventSocketRefresh(randomID));
  });
};
