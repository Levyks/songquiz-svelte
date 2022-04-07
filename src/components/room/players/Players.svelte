<script lang="ts">

    import { _ } from 'svelte-i18n';

    import Card from '@smui/card';    
    
    import { room } from '@/stores';

    import PlayerItem from './PlayerItem.svelte';
     
</script>

<Card class="h-100 overflow-hidden d-flex flex-column" variant="outlined">
    <h4 class="text-center m-4">{ $_('players.title') }</h4>
    <div class="list flex-1">
        {#each Object.values($room.players).filter(p => p) as player (player.nickname)}
            <PlayerItem {player} />
        {/each}
    </div>
</Card>

<style lang="scss">
    .list {
        overflow-y: auto;
        margin: 0 16px;
    }
</style>