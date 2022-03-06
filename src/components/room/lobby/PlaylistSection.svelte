<script lang="ts">

    import Button, { Label } from '@smui/button';
    import Fab from '@smui/fab';

    import PlaylistDialog from './playlist-dialog';

    export let playlistSet = true;
    export let showPlaylistError = false;

    let dialogOpened = false;

</script>

<div class="d-flex align-items-center justify-content-between">
    <span>Playlist:</span>
    <div class="d-flex flex-wrap justify-content-center align-items-center">
        {#if playlistSet}
            <Fab href="#" class="mx-3 my-1" style="min-height:48px;height:auto;" extended>
                <span class="me-2">
                    Top 50 Brasil
                </span>
                <img src="/assets/img/logos/spotify-full.png" alt="Spotify logo" class="logo"/>
            </Fab>   
        {:else}
            <strong class="not-set me-2" class:error={showPlaylistError}>Not set</strong>
        {/if}
        <Button class="my-1" on:click={() => dialogOpened = true}>
            <Label>Manage Playlist</Label>
        </Button>
    </div>
</div>

<PlaylistDialog bind:open={dialogOpened}/>

<style lang="scss">
    .logo {
        height: 24px;
    }

    .not-set {
        transition: color .5s ease-in-out, font-size .5s ease-in-out;
    }

    .error {
        color: red;
        font-size: 1.1rem;
    }
</style>