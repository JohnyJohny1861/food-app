import ReactDOM from "react-dom/client";
import { dbConfig } from "db";
import { initDB } from "react-indexed-db-hook";
import App from "./App";
import Modal from "react-modal";
import "./style/index.scss";

initDB(dbConfig);

Modal.setAppElement("#root");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <App />
);
