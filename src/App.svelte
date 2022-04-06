<script lang="ts">
  import './main.scss';
  import { Router, Route } from "svelte-routing";
  import { isLoading } from 'svelte-i18n';

  import Home from './views/Home.svelte';
  import Room from './views/Room.svelte';
  import NotFound from './views/NotFound.svelte';
  
</script>

{#if !$isLoading}
  <Router>
    <Route path="/" component={Home} />
    <Route path="/room/:code" component={Room} />
    <Route path="*" component={NotFound} />
  </Router>
{/if}