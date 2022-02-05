<script lang="ts">

    import { navigate } from 'svelte-routing';

    import Textfield from '@smui/textfield';
    import Button, { Label } from '@smui/button';

    import UsernameField from './UsernameField.svelte';
    import LoadingDialog from '@/components/misc/LoadingDialog.svelte';

    import { delay } from '@/helpers';

    export let username: string;
    export let roomCode: string;

    let loading: boolean = false;

    function join() {
        loading = true;

        delay(1000).then(() => {
            navigate(`/room/${roomCode}`);
            loading = false;
        });
    }

</script>

<LoadingDialog open={loading} text="Joining..."/>

<form on:submit|preventDefault={join}>
    <UsernameField bind:username/>
    <Textfield
        label="Room code"
        style="width: 100%;"
        class="mb-3"
        bind:value={roomCode}
        required
    ></Textfield>
    <div class="flex-center">
        <Button variant="raised" type="submit">
            <Label>Join</Label>
        </Button>
    </div>
</form>