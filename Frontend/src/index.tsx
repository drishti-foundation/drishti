import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

console.log(
  `%c\
▓█████▄  ██▀███   ██▓  ██████  ██░ ██ ▄▄▄█████▓ ██▓
▒██▀ ██▌▓██ ▒ ██▒▓██▒▒██    ▒ ▓██░ ██▒▓  ██▒ ▓▒▓██▒
░██   █▌▓██ ░▄█ ▒▒██▒░ ▓██▄   ▒██▀▀██░▒ ▓██░ ▒░▒██▒
░▓█▄   ▌▒██▀▀█▄  ░██░  ▒   ██▒░▓█ ░██ ░ ▓██▓ ░ ░██░
░▒████▓ ░██▓ ▒██▒░██░▒██████▒▒░▓█▒░██▓  ▒██▒ ░ ░██░
 ▒▒▓  ▒ ░ ▒▓ ░▒▓░░▓  ▒ ▒▓▒ ▒ ░ ▒ ░░▒░▒  ▒ ░░   ░▓  
 ░ ▒  ▒   ░▒ ░ ▒░ ▒ ░░ ░▒  ░ ░ ▒ ░▒░ ░    ░     ▒ ░
 ░ ░  ░   ░░   ░  ▒ ░░  ░  ░   ░  ░░ ░  ░       ▒ ░
   ░       ░      ░        ░   ░  ░  ░          ░  
 ░                                                 \
 `,
  "color: #3c61a9;"
);

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
