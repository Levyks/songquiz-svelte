<script lang="ts">

    import DarkModeSwitch from '@/components/misc/DarkModeSwitch.svelte';
    import History from '@/components/room/History.svelte';
    import Lobby from '@/components/room/Lobby.svelte';
    import Players from '@/components/room/Players.svelte';

    export let code: string;
</script>

<div class="d-flex justify-content-end mt-2 me-3">
    <DarkModeSwitch />
</div>

<div class="grid">
    <div class="cell history">
        <History />
    </div>
    <div class="cell main">
        <Lobby />
    </div>
    <div class="cell players">
        <Players />
    </div>
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