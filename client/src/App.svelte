<script>
import Router, { push } from 'svelte-spa-router';
import { wrap } from 'svelte-spa-router/wrap';
import { io } from "socket.io-client";

import CreateOrJoinGame from './components/CreateOrJoinGame.svelte';
import NotFound from './components/NotFound.svelte';
import Room from './components/Room.svelte';

const socket = io(`${__songQuiz.env.SERVER_URL}`);

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

const createOrJoinGameRoute = wrap({
	component: CreateOrJoinGame,
	props: { socket }
});

const routes = {
	'/': createOrJoinGameRoute,
 
	'/play': createOrJoinGameRoute,

	'/play/join/:roomCode': createOrJoinGameRoute,

	'/play/room/:roomCode': wrap({
		component: Room,
		props: { socket }
	}),

	'*': NotFound
};

</script>

<Router {routes} on:routeEvent={handleRouteEvent} />


<style>
	:global(body) {
		background-color: #39CCCC;
	}
</style>

