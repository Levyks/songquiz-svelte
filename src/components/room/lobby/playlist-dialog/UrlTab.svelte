<script lang="ts">
    
    import { _ } from 'svelte-i18n';

    import Textfield, { TextfieldComponentDev } from '@smui/textfield';
    import TextfieldIcon from '@smui/textfield/icon';
    import HelperText from '@smui/textfield/helper-text';
    import Fab from '@smui/fab';
    import CircularProgress from '@smui/circular-progress';
    import IconButton from '@smui/icon-button';
    import { Icon } from '@smui/common';

    import Snackbar, {
        Actions,
        Label,
        SnackbarComponentDev 
    } from '@smui/snackbar';  

    import { getPlaylistSourceFromUrl } from '@/services/playlist.service';
    import { socket } from '@/services/socket.service';

    import type { SongQuizError } from '@/misc/errors';
    import type { PlaylistSource } from '@/typings/main';

    const classes = {
        success: 'bg-success',
        error: 'bg-error',
    }

    const icons = {
        idle: 'download',
        error: 'error_outline',
        success: 'done',
    }

    let snackbar: SnackbarComponentDev; 
    let textfield: TextfieldComponentDev;

    let buttonStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

    let url: string = '';
    let lastUrlSubmitted: string = '';
    let messageCode: string = '';
    let messageParams: { [key: string]: string } | undefined;

    let playlistSource: PlaylistSource | null;
    let buttonDisabled: boolean = false;

    $: playlistSource = getPlaylistSourceFromUrl(url);
    $: buttonDisabled = buttonStatus !== 'idle' || lastUrlSubmitted === url

    $: {
        if(textfield && url) {
            const input = textfield.getElement().querySelector('input');
            input?.setCustomValidity(playlistSource ? '' : $_('playlist.dialog.url.invalid'));
        }
    }

    function setResultStatus(status: 'success' | 'error') {
        buttonStatus = status;
        setTimeout(() => {
            buttonStatus = 'idle';
        }, 1500);
    }

    function handleSubmit() {
        buttonStatus = 'loading';
        socket.emit('playlist:set', playlistSource!, (err: SongQuizError) => {
            if(err) {
                lastUrlSubmitted = '';
                setResultStatus('error');
                messageCode = err.messageCode
                messageParams = err.params;
                snackbar.open();
            } else {
                lastUrlSubmitted = url;
                setResultStatus('success');
            }
        });
    }

    const supported_platforms = [
        'Spotify'
    ];

</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="d-flex align-items-center mt-2">
        <div class="flex-1 me-3">
            <Textfield bind:this={textfield} bind:value={url} label="URL" style="width: 100%;" required>
                <TextfieldIcon class="material-icons" slot="leadingIcon">link</TextfieldIcon>
                <HelperText slot="helper">
                    {$_('playlist.dialog.url.supportedPlatforms', { values: { platforms: supported_platforms.join(', ') }}) }
                </HelperText>
            </Textfield>
        </div>
        <Fab
            class="transition-bg {classes[buttonStatus]} {buttonDisabled && buttonStatus === 'idle' ? 'bg-disabled' : ''}"
            color="primary"
            mini
            disabled={buttonDisabled}
            style={`
                ${buttonDisabled ? 'cursor: default;' : ''}
            `}
        >
            <Icon class="material-icons">
                {#if buttonStatus === 'loading'}
                    <CircularProgress class="surface-circular-progress w-100 h-100" indeterminate />
                {:else}
                    {icons[buttonStatus]}
                {/if}
            </Icon>
        </Fab>
    </div>
</form>

<Snackbar bind:this={snackbar}>
    {#if messageCode}
        <Label>{$_(messageCode, { values: messageParams })}</Label>
    {/if}
    <Actions>
      <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>