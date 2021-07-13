<script>
import Router, { push } from 'svelte-spa-router';
import { wrap } from 'svelte-spa-router/wrap';

import CreateOrJoinGame from './components/CreateOrJoinGame.svelte';
import NotFound from './components/NotFound.svelte';
import Room from './components/Room.svelte';

function handleRouteEvent(event){
	switch(event.detail.action){
		case "redirectToRoom":
			const roomCode = event.detail.roomCode;
			push(`/play/room/${roomCode}`);
			break;
		default:
			break;
	}
}

function getRoomData(){
	return roomData;
}


const routes = {
	'/': CreateOrJoinGame,
 
	'/play': CreateOrJoinGame,

	'/play/join/:roomCode': CreateOrJoinGame,

	'/play/room/:roomCode': Room,

	'*': NotFound
};

</script>

<Router {routes} on:routeEvent={handleRouteEvent} />


<style>
	:global(body) {
		background-color: #39CCCC;
	}
</style>

