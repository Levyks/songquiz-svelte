<script lang="ts">
    import Card from '@smui/card';
    import Button, { Label } from '@smui/button';

    import InviteSection from './lobby/InviteSection.svelte';
    import PlaylistSection from './lobby/PlaylistSection.svelte';
    import SettingsSection from './lobby/SettingsSection.svelte';
</script>

<Card variant="outlined" class="h-100 p-3 overflow-hidden d-flex flex-column justify-content-between">

    <h4 class="text-center m-4">Lobby <strong>2231</strong></h4>

    <div class="sections mb-2">
        <PlaylistSection />
        <SettingsSection />
        <InviteSection />
    </div>

    <div class="start-btn-wrapper">
        <Button variant="raised" class="w-100" type="submit">
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