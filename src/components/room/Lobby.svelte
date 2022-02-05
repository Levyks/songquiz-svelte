<script lang="ts">
    import Paper from '@smui/paper';
    import InviteSection from './lobby/InviteSection.svelte';
    import PlaylistSection from './lobby/PlaylistSection.svelte';
    import SettingsSection from './lobby/SettingsSection.svelte';
</script>

<Paper class="h-100 p-3 overflow-hidden d-flex flex-column">
    <h4 class="text-center m-4">Lobby <strong>2231</strong></h4>

    <div class="d-flex flex-column justify-content-center align-items-stretch options-wrapper">
        <PlaylistSection />
        <SettingsSection />
        <InviteSection />
    </div>

</Paper>

<style lang="scss">
    .options-wrapper {
        width: min(100%, 800px);
        margin: 0 auto;
    }
</style>