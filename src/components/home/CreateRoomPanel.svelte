<script lang="ts">
    import Button, { Label } from '@smui/button';
    
    import UsernameField from './UsernameField.svelte';

    export let username: string;
</script>

<UsernameField bind:username/>
<div class="flex-center">
    <Button variant="raised">
        <Label>Create</Label>
    </Button>
</div>