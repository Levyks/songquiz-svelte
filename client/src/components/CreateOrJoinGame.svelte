<script>
	import {createEventDispatcher} from 'svelte';
import { push } from 'svelte-spa-router';

	export let params = undefined;
	export let socket;

	const dispatch = createEventDispatcher();

	let roomCodeRequired = true;

  let username;
  let roomCode = params && params.roomCode;
	let isJoiningDefinedRoom = !!roomCode;

	function handleCreateRoomClick(e) {
		roomCodeRequired = false;
	}

	function handleFormSubmit(e) {
		roomCodeRequired = true;

    const action = e.submitter.getAttribute('action');

    switch(action){
      case "createRoom":
        createRoom();
        break;
      case "joinRoom":
				joinRoom({roomCode, playerData: {username}});
        break;
      default:
        break;
    }
	}

  function createRoom() {
    socket.emit('initialSetup', { action: 'createRoom', username });
    socket.on('createRoomResponse', response => {
      if(response.status === 200){
				joinRoom(response)
      }
    });
  }

	function joinRoom(data) {
		localStorage.setItem('lastRoomJoined', data.roomCode);
		localStorage.setItem('playerData', JSON.stringify(data.playerData) );
		push(`/play/room/${data.roomCode}`);
	}

</script>

<main>
  <div class="jumbotron">
		<h2>Play with friends</h2>
		
		<hr class="my-2">

		<form on:submit|preventDefault={handleFormSubmit}>

			<div class="form-group">
				<label for="usernameInput">Username</label>
				<input class="form-control" placeholder="Your Username" bind:value={username} required>
			</div>

			{#if !isJoiningDefinedRoom}
		
			<div class="w-100 text-center">
				<input on:click={handleCreateRoomClick} type="submit" class="btn btn-primary" action="createRoom" value="Create Room">
			</div>

			<div class="w-100 text-center mb-3">
				<strong>or</strong>
			</div>

			{/if}

			<div class="input-group mb-3">
				<input type="text" class="form-control" placeholder="Room Code" bind:value={roomCode} required={roomCodeRequired}>
				<div class="input-group-append">
					<input class="btn btn-primary" type="submit" action="joinRoom" value="Join Room">
				</div>
			</div>
		</form>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;	
	}

</style>

