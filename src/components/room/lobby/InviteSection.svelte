<script lang="ts">
    import { onMount } from 'svelte';
    import { _ } from 'svelte-i18n';

    import Textfield from '@smui/textfield';
    import IconButton from '@smui/icon-button';
    import Fab, { Icon } from '@smui/fab';
    import Snackbar, {
        Actions,
        Label,
    } from '@smui/snackbar';

    import type { SnackbarComponentDev } from '@smui/snackbar';
    import type { TextfieldComponentDev } from '@smui/textfield';

    import { room } from '@/stores';

    const url = new URL(`/?join=${$room.code}`, location.origin).href

    let snackbar: SnackbarComponentDev;
    let textfield: TextfieldComponentDev;
    let input: HTMLInputElement;

    onMount(() => {
        input = textfield.getElement().querySelector('input')!;

        input.setAttribute('readonly', 'readonly');
    });

    function copy() {
        input.select();
        input.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(input.value);
        input.setSelectionRange(0, 0);
        input.blur();
        snackbar.open();
    }

    
</script>

<div class="mt-2 d-flex">
    <div class="flex-1 me-2">
        <Textfield 
            label="Invite Friends" 
            class="w-100" 
            value={url} 
            bind:this={textfield}
        />
    </div>
    <Fab on:click={copy}>
        <Icon class="material-icons">content_copy</Icon>
    </Fab>
</div>

<Snackbar bind:this={snackbar}>
    <Label>{$_('lobby.inviteCopied')}</Label>
    <Actions>
      <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>

<style lang="scss">
</style>