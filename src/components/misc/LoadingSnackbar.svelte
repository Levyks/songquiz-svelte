<script lang="ts">

    import Snackbar, {
        Label,
        SnackbarComponentDev 
    } from '@smui/snackbar';  
    import CircularProgress from '@smui/circular-progress';

    import { _ } from 'svelte-i18n';

    export let label: string = $_('misc.loading');

    let snackbar: SnackbarComponentDev;

    export const open = () => {
        snackbar.open();
    }
    export const close = () => {
        snackbar.close();
    }

</script>

<Snackbar 
    bind:this={snackbar}
    timeoutMs={-1}
    closeOnEscape={false}
>
    <div class="w-100 d-flex align-items-center justify-content-between">
        <Label>{label}</Label>
        <CircularProgress indeterminate style="height: 32px; width: 32px;"/>
    </div>
</Snackbar>