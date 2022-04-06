<script lang="ts">

    import Snackbar, {
        Actions,
        Label,
        SnackbarComponentDev 
    } from '@smui/snackbar';  
    import IconButton from '@smui/icon-button';

    import ErrorLabel from  './ErrorLabel.svelte';
    
    import type { SongQuizError } from '@/misc/errors';

    export let error: SongQuizError;

    let snackbar: SnackbarComponentDev;

    export function open() {
        snackbar.open();
    }

</script>

<Snackbar bind:this={snackbar}>
    <Label><ErrorLabel {error}/></Label>
    <Actions>
      <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>