import App from './App.svelte'

import "./stores";
import axios from "axios";

const app = new App({
  target: document.getElementById('app')
});

axios.defaults.baseURL = "http://localhost:5000";

export default app;
