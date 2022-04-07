<script lang="ts">

    import { _ } from 'svelte-i18n';
    
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';

    export let username: string;

</script>

<div class="mb-3">
    <Textfield 
        bind:value={username} 
        label={ $_('home.usernameLabel') }
        style="width: 100%;"
        required
    >
        <HelperText slot="helper">{ $_('home.usernameHelper') }</HelperText>
    </Textfield>
</div>