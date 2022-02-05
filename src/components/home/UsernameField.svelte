<script lang="ts">
    
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';

    export let username: string;

</script>

<div class="mb-3">
    <Textfield 
        bind:value={username} 
        label="Your username"   
        style="width: 100%;"
        required
    >
        <HelperText slot="helper">The name that the other players will see</HelperText>
    </Textfield>
</div>