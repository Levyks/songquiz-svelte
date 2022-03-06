<script lang="ts">
    import Card from '@smui/card';
    import Button from '@smui/button';

    import InviteSection from './InviteSection.svelte';
    import PlaylistSection from './PlaylistSection.svelte';
    import SettingsSection from './SettingsSection.svelte';
    import { room } from '@/stores';

    let playlistSet: boolean;
    let showPlaylistError: boolean = false;

    function start() {

        if(!playlistSet) {
            showPlaylistError = true;
            return;
        }

    }

</script>

<Card variant="outlined" class="h-100 p-3 overflow-hidden d-flex flex-column justify-content-between">

    <h4 class="text-center m-4">Lobby <strong>{$room.code}</strong></h4>

    <div class="sections mb-2">
        <PlaylistSection bind:showPlaylistError bind:playlistSet />
        <SettingsSection />
        <InviteSection />
    </div>

    <div class="start-btn-wrapper">
        <Button variant="raised" class="w-100" on:click={start}>
            <span class="start-btn-label">Start Game</span>
        </Button>
    </div>

</Card>

<style lang="scss">
    .sections {
        width: min(100%, 800px);
        margin: 0 auto;

        max-height: 400px;
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;

        overflow-y: auto;
    }

    .start-btn-wrapper {
        width: min(100%, 400px);
        margin: 0 auto;
    }

    .start-btn-label {
        font-size: 1rem;
    }
</style>