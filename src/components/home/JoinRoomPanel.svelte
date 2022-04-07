<script lang="ts">

    import { _ } from 'svelte-i18n';

    import { navigate } from 'svelte-routing';
    import type { AxiosError } from 'axios';

    import Textfield from '@smui/textfield';
    import Button, { Label } from '@smui/button';

    import UsernameField from './UsernameField.svelte';
    import LoadingDialog from '@/components/misc/LoadingDialog.svelte';
    import AlertDialog from '@/components/misc/AlertDialog.svelte';

    import { join } from '@/services/room.service';

    export let username: string;
    export let roomCode: string;

    let loading: boolean = false;

    let alertOpen: boolean = false;
    let alertTitle: string;
    let alertContent: string;

    function handleJoin() {
        loading = true;

        return join(roomCode, username)
            .then(() => {
                navigate(`/room/${roomCode}`);
            })
            .catch((err: AxiosError) => {

                console.error(err);

                let message = 'Unknown error';

                if(err.isAxiosError) {
                    message = err.response?.data?.message || message; 
                }

                alertTitle = 'Failed to join room';
                alertContent = message;
                alertOpen = true;

            })
            .finally(() => {
                loading = false;
            });
    }
    
</script>

<LoadingDialog open={loading} text="Joining..."/>
<AlertDialog bind:open={alertOpen} title={alertTitle} content={alertContent}/>

<form on:submit|preventDefault={handleJoin}>
    <UsernameField bind:username/>
    <Textfield
        label={ $_('home.codeLabel') }
        style="width: 100%;"
        class="mb-3"
        bind:value={roomCode}
        required
    ></Textfield>
    <div class="flex-center">
        <Button variant="raised" type="submit">
            <Label>{ $_('home.join.btn') }</Label>
        </Button>
    </div>
</form>