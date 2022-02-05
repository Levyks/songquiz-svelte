<script lang="ts">
  import './main.scss';
  import { Router, Route } from "svelte-routing";

  import Home from './views/Home.svelte';
  import Room from './views/Room.svelte';
  import NotFound from './views/NotFound.svelte';
  
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="/room/:code" component={Room} />
  <Route path="*" component={NotFound} />
</Router>

