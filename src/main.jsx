import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"

// defino el documento raiz, lo geteo por su id en index.html, y a partir de ahi renderizo el componente App, haciendo uso de reactStrictMode que es igual a <></> | aún no tengo claro que hace.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

