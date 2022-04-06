<script lang="ts">

    import Button, { Label } from '@smui/button';

    import { room, isSelfLeader } from '@/stores';

    import PlaylistDialog from './playlist-dialog';
    import PlaylistFab from './PlaylistFab.svelte';

    export let showPlaylistError = false;

    let dialogOpened = false;

</script>

<div class="d-flex align-items-center justify-content-between">
    <span>Playlist:</span>
    <div class="d-flex flex-wrap justify-content-center align-items-center">
        {#if $room.playlist}
            <PlaylistFab /> 
        {:else}
            <strong class="not-set me-2" class:error={showPlaylistError}>Not set</strong>
        {/if}
        {#if $isSelfLeader}
            <Button class="my-1" on:click={() => dialogOpened = true}>
                <Label>Manage Playlist</Label>
            </Button>
        {/if}
    </div>
</div>

<PlaylistDialog bind:open={dialogOpened}/>

<style lang="scss">
    

    .not-set {
        transition: color .5s ease-in-out, font-size .5s ease-in-out;
    }

    .error {
        color: red;
        font-size: 1.1rem;
    }
</style>