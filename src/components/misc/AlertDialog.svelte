<script lang="ts">
    
    import { _ } from 'svelte-i18n';

    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';

    export let open: boolean;
    export let title: string;
    export let content: string;
</script>

<Dialog {open}>
    <Title>{title}</Title>
    <Content>{content}</Content>
    <Actions>
        <Button on:click={() => open = false}>
            <Label>{ $_('misc.close') }</Label>
        </Button>
    </Actions>
</Dialog>