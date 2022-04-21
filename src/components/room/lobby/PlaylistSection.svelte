<script lang="ts">

    import { _ } from 'svelte-i18n';

    import Button, { Label } from '@smui/button';

    import { room, isSelfLeader } from '@/stores';

    import PlaylistDialog from './playlist-dialog';
    import PlaylistFab from './PlaylistFab.svelte';

    export let showPlaylistError = false;

    let dialogOpened = false;

</script>

<div class="d-flex align-items-center justify-content-between">
    <span>{$_('lobby.playlist')}</span>
    <div class="d-flex flex-wrap justify-content-center align-items-center">
        {#if $room.playlist}
            <PlaylistFab /> 
        {:else}
            <strong class="not-set me-2" class:error={showPlaylistError}>{ $_('playlist.notSetShort') }</strong>
        {/if}
        {#if $isSelfLeader}
            <Button class="my-1" on:click={() => dialogOpened = true}>
                <Label>{ $_('playlist.dialog.title') }</Label>
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