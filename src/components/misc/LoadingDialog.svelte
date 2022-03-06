<script lang="ts">
    import Dialog from '@smui/dialog';
    import CircularProgress from '@smui/circular-progress';

    export let open: boolean;
    export let text: string;
</script>

<Dialog 
    {open}
    scrimClickAction=""
    escapeKeyAction=""
>   
    <div class="flex-center pt-5">
        <CircularProgress style="height: 64px; width: 64px;" indeterminate/> 
    </div>
    <h4 class="text-center" tabindex="0">{text}</h4>
</Dialog>