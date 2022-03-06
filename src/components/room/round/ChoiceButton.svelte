<script lang="ts">
    import Button, { ButtonComponentDev } from '@smui/button';
    import PlayerIcon from '@/components/misc/PlayerIcon.svelte';

    export let choice: string;

    const players = [1].map((_, i) => ({
        name: 'John Doe',
        isLeader: i==2,
        score: (10 - i) * 100,
    }));

    const max_number_of_player_icons = 10;

    let buttonStatus: 'idle' | 'selected' | 'correct' | 'incorrect' | 'disabled' = 'idle';

    const classes = {
        correct: 'bg-success',
        incorrect: 'bg-error',
    }

    let button: ButtonComponentDev;

    function handleClick(e) {

        button.getElement().blur();

        buttonStatus = 'selected';

        setTimeout(() => {
            buttonStatus = 'correct';
        }, 1000);

    }

</script>

<div class="btn-wrapper m-1">
    <Button 
        class="w-100 p-4h d-flex flex-column transition-bg {classes[buttonStatus]}"
        disabled={buttonStatus=='disabled'}
        variant="{buttonStatus === 'idle' ? 'outlined' : 'raised'}"
        on:click={handleClick}
        bind:this={button}
    >
        <span class="w-100">{choice}</span>

        <div class="mt-1 icons-wrapper d-flex justify-content-end align-items-center">
            {#each players.slice(0, max_number_of_player_icons) as player}
                <PlayerIcon {player} size={20} style="margin-right: 5px;" />
            {/each}
            {#if players.length > max_number_of_player_icons}
                <span class="me-1 icons-more">...</span>
            {/if}
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