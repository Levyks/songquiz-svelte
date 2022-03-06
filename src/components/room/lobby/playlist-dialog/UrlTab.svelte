<script lang="ts">
    import Textfield from '@smui/textfield';
    import TextfieldIcon from '@smui/textfield/icon';
    import HelperText from '@smui/textfield/helper-text';
    import Fab from '@smui/fab';
    import CircularProgress from '@smui/circular-progress';
    import { Icon } from '@smui/common';
    import { room } from '@/stores';

    let url: string = '';

    let buttonStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

    const classes = {
        success: 'bg-success',
        error: 'bg-error',
    }

    const icons = {
        idle: 'download',
        error: 'error_outline',
        success: 'done',
    }

    function setResultStatus(status: 'success' | 'error') {
        buttonStatus = status;
        setTimeout(() => {
            buttonStatus = 'idle';
        }, 1500);
    }

    function handleSubmit() {
        buttonStatus = 'loading';
        room.call('setPlaylist', 'spotify', url).then(() => {
            setResultStatus('success');
            console.log($room);
        }).catch((er) => {
            console.error(er);
            setResultStatus('error');
        });
    }

</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="d-flex align-items-center mt-2">
        <div class="flex-1 me-3">
            <Textfield bind:value={url} label="URL" style="width: 100%;" required>
                <TextfieldIcon class="material-icons" slot="leadingIcon">link</TextfieldIcon>
                <HelperText slot="helper">Platforms supported: Spotify</HelperText>
            </Textfield>
        </div>
        <Fab
            class="transition-bg {classes[buttonStatus]}"
            color="primary"
            mini
            disabled={buttonStatus !== 'idle'}
            style={`
                ${buttonStatus !== 'idle' ? 'cursor: default;' : ''}
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