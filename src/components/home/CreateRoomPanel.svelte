<script lang="ts">
    
    import { _ } from 'svelte-i18n';

    import { navigate } from 'svelte-routing';
    import type { AxiosError } from 'axios';

    import Button, { Label } from '@smui/button';
    
    import UsernameField from './UsernameField.svelte';
    import LoadingDialog from '@/components/misc/LoadingDialog.svelte';
    import AlertDialog from '@/components/misc/AlertDialog.svelte';

    import { create } from '@/services/room.service';

    export let username: string;
    let loading: boolean = false;

    let alertOpen: boolean = false;
    let alertTitle: string;
    let alertContent: string;

    function handleCreate() {
        loading = true;

        create(username)
            .then((code) => {
                navigate(`/room/${code}`);
            })
            .catch((err: AxiosError) => {

                let message = $_('misc.unknownError');

                if(err.isAxiosError) {
                    message = err.response?.data?.message || message; 
                }

                alertTitle = $_('room.failedToCreate');
                alertContent = message;
                alertOpen = true;

            })
            .finally(() => {
                loading = false;
            });
    }

</script>

<LoadingDialog open={loading} text={$_('room.creating')}/>
<AlertDialog bind:open={alertOpen} title={alertTitle} content={alertContent}/>

<form on:submit|preventDefault={handleCreate}>
    <UsernameField bind:username/>
    <div class="flex-center">
        <Button variant="raised">
            <Label>{ $_('home.create.btn') }</Label>
        </Button>
    </div>
</form>