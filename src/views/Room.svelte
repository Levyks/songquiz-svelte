<script lang="ts">

    import { navigate } from 'svelte-routing';

    import DarkModeSwitch from '@/components/misc/DarkModeSwitch.svelte';
    import History from '@/components/room/history/History.svelte';
    import Players from '@/components/room/players/Players.svelte';
    
    import Lobby from '@/components/room/lobby';
    import Starting from '@/components/room/Starting.svelte';
    import Round from '@/components/room/round';

    import { room } from '@/stores';
    import { connect } from '@/services/room.service';

    export let code: string;

    const components = {
        'lobby': Lobby,
        'starting': Starting,
        'round': Round,
    }

    if(!$room.isConnected) {
        connect(code).catch(() => navigate(`/?join=${code}`));
    }

</script>

<div class="d-flex justify-content-end mt-2 me-3">
    <DarkModeSwitch />
</div>

<div class="grid">
    {#if $room.isConnected}
        <div class="cell history">
            <History />
        </div>
        <div class="cell main">
            <svelte:component this={components[$room.status]} />
        </div>
        <div class="cell players">
            <Players />
        </div>
    {:else}
        sem conexão
    {/if}
</div>

<style lang="scss">

    .grid {
        display: grid;
        grid-gap: 1rem;
        padding: 1rem;
        padding-top: 0.5rem;

        flex: 1;
        overflow: hidden;

        grid-template-columns: minmax(300px, 500px) minmax(420px, auto) minmax(300px, 500px);
        grid-template-areas: "history main players";

        @media (max-width: 1080px) {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: 4fr 3fr;
            grid-template-areas: "main main"
                                "history players";
        }

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: "main";
        }
    }

    .cell {
        height: 100%;
        overflow: hidden;
    }

    .history {
        grid-area: history;
        @media (max-width: 768px) {
            display: none;
        }
    }

    .main {
        grid-area: main;
    }

    .players {
        grid-area: players;
        @media (max-width: 768px) {
            display: none;
        }
    }

</style>