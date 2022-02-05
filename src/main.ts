import App from './App.svelte'

import "./stores";

const app = new App({
  target: document.getElementById('app')
})

export default app
