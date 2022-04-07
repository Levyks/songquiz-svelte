<script lang="ts">

    import { onMount } from 'svelte';
    import { _ } from 'svelte-i18n';

    import Card from '@smui/card';

    import ChoiceButton from './ChoiceButton.svelte';
    import InteractionDialog from './InteractionDialog.svelte';

    import ErrorDialog from '@/components/misc/ErrorDialog.svelte';
    import VolumeSlider from '@/components/misc/VolumeSlider.svelte';

    import { volume } from '@/stores';
    import { socket } from '@/services/socket.service';
    import { RoundType } from '@/enums';

    import type { SongQuizError } from '@/misc/errors';
    import type { Round } from '@/typings/state';
    
    export let round: Round;

    let label: string;
    $: label = {
        [RoundType.Song]: $_('round.typeLabels.song'),
        [RoundType.Artist]: $_('round.typeLabels.artist'),
    }[round.type];

    let audio: HTMLAudioElement;
    let interactionDialogOpen: boolean = false;

    let remainingTime = round.remainingTime;
    
    const interval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime -= 1;
        } else {
            clearInterval(interval);
            round.acceptingAnswers = false;
        }
    }, 1000);

    let selectedChoice: number | undefined;
    let errorDialog: ErrorDialog;
    let error: SongQuizError;

    onMount(() => {

        audio.play();

        return () => {
            audio.pause();
            clearInterval(interval);
        }

    });

    function handleChoiceClick(choice: number) {
        selectedChoice = choice;

        socket.emit('round:guess', choice, (err: SongQuizError) => {
            if(err) {
                error = err;
                errorDialog.open();
                selectedChoice = undefined;
                console.error('error answering -> ', err);
                return;
            }
            round.hasAnswered = true;
        });
    }

</script>

<Card variant="outlined" class="h-100 p-3 pt-0 overflow-hidden d-flex flex-column justify-content-between text-center">
    <div>
        <h4 class="mt-4 mb-1">{ $_('round.numberLabel', { values: { number: round.number}}) }</h4>
        <h5 class="my-1">{label}</h5>
        <h6 class="my-1">{ $_('round.remainingLabel', { values: { time: remainingTime }}) }</h6>
    </div>
    <div class="choices-wrapper">
        {#each round.choices as choice, idx}
            <ChoiceButton 
                choice={choice}
                on:click={() => handleChoiceClick(idx)} 
                disabled={round.hasAnswered || !round.acceptingAnswers}
                selected={selectedChoice === idx}
                correct={round.correctAnswer === idx}
                incorrect={!!round.correctAnswer && selectedChoice === idx && round.correctAnswer !== idx}
            />
        {/each}
    </div>
    <VolumeSlider/>
</Card>

<audio 
    bind:this={audio}
    volume={$volume}
    src={round.audioUrl}
/>

<InteractionDialog bind:open={interactionDialogOpen} on:interaction={() => audio.play()}/>
<ErrorDialog bind:this={errorDialog} {error}/>

<style lang="scss">
    .choices-wrapper {

        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        flex-wrap: nowrap;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;

        @media (max-width: 1080px) {
            flex-wrap: wrap;
            max-width: none;
        }

        @media (max-width: 768px) {
            flex-wrap: nowrap;
        }
    }
</style>