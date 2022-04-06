<script lang="ts">
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';

    import { _ } from 'svelte-i18n';
    import { createEventDispatcher } from 'svelte';

    export let open: boolean;

    const dispatch = createEventDispatcher<{
        interaction: void
    }>();

    function handleClick() {
        open = false;
        dispatch('interaction');
    }

</script>

<Dialog {open}>
    <Title>{$_('round.interactionNeeded')}</Title>
    <Content>{$_('round.interactionNeededDesc')}</Content>
    <Actions>
        <Button on:click={handleClick}>
            <Label>{$_('round.interactionBtnLabel')}</Label>
        </Button>
    </Actions>
</Dialog>