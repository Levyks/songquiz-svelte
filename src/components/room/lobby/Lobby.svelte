<script lang="ts">

    import { _ } from 'svelte-i18n';

    import Card from '@smui/card';
    import Button from '@smui/button';
    import CircularProgress from '@smui/circular-progress';
    import IconButton from '@smui/icon-button';
    import Snackbar, {
        Label,
        Actions,
        SnackbarComponentDev 
    } from '@smui/snackbar';  

    import InviteSection from './InviteSection.svelte';
    import PlaylistSection from './PlaylistSection.svelte';
    import SettingsSection from './SettingsSection.svelte';
    import ErrorLabel from '@/components/misc/ErrorLabel.svelte';

    import { room, isSelfLeader, isUpdatingOptions } from '@/stores';
    import { SongQuizError } from "@/misc/errors";
    import { socket } from '@/services/socket.service';

    let showPlaylistError: boolean = false;
    let snackbar: SnackbarComponentDev;
    let error: SongQuizError;

    let loadingStart: boolean = false;

    function start() {

        if(!$room.playlist) {
            showPlaylistError = true;
            error = new SongQuizError('playlist.notSet');
            snackbar.open();
            return;
        }

        loadingStart = true;

        socket.emit('game:start', (err?: SongQuizError) => {
            console.log({err});
            loadingStart = false;
            if(err) {
                error = err;
                snackbar.open();
            }
        });

    }

</script>

<Card variant="outlined" class="h-100 p-3 pt-0 overflow-hidden d-flex flex-column justify-content-between">

    <h4 class="text-center m-4">{ $_('lobby.title', { values: { code: $room.code }} ) }</h4>

    <div class="sections mb-2">
        <PlaylistSection bind:showPlaylistError />
        <SettingsSection/>
        <InviteSection />
    </div>

    <div class="start-btn-wrapper">
        <Button 
            variant="raised" 
            class="w-100" 
            on:click={start}
            disabled={$isUpdatingOptions || loadingStart}
        >
            {#if $isUpdatingOptions || loadingStart}
                <CircularProgress indeterminate class="me-2" style="height: 24px; width: 24px;"/>
            {/if}
            <span class="start-btn-label">{ $_('lobby.startGame') }</span>
        </Button>
    </div>

</Card>

<Snackbar 
    bind:this={snackbar}
>
    <Label><ErrorLabel {error}/></Label>
    <Actions>
      <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>

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