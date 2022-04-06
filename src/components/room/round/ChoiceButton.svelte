<script lang="ts">

    import Button, { ButtonComponentDev } from '@smui/button';
    import PlayerIcon from '@/components/misc/PlayerIcon.svelte';
    
    import { createEventDispatcher } from 'svelte';

    export let choice: string;
    export let disabled: boolean;
    export let selected: boolean;
    export let correct: boolean;
    export let incorrect: boolean;

    let raised: boolean;
    $: raised = selected || correct || incorrect;

    $: {
        console.log({selected, correct, incorrect})
    }

    const max_number_of_player_icons = 10;

    let button: ButtonComponentDev;

    const dispatch = createEventDispatcher<{
        click: void
    }>();

    function handleClick() {

        button.getElement().blur();
        dispatch('click');

    }

</script>

<div class="btn-wrapper m-1">
    <Button 
        class="w-100 p-4h d-flex flex-column transition-bg {correct ? 'bg-success' : ''} {incorrect ? 'bg-error' : ''}"
        {disabled}
        variant="{raised ? 'raised' : 'outlined'}"
        on:click={handleClick}
        bind:this={button}
    >
        <span class="w-100">{choice}</span>

        <div class="mt-1 icons-wrapper d-flex justify-content-end align-items-center">
            <!--
            {#each players.slice(0, max_number_of_player_icons) as player}
                <PlayerIcon {player} size={20} style="margin-right: 5px;" />
            {/each}
            {#if players.length > max_number_of_player_icons}
                <span class="me-1 icons-more">...</span>
            {/if}
            -->
        </div>
    </Button>
</div>



<style lang="scss">

    .btn-wrapper:not(:last-child) {
        margin-bottom: 10px;
    }

    span {
        font-size: 1.5em;
    }

    .icons-more {
        line-height: 20px;
    }

</style>