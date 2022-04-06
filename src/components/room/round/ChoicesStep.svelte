<script lang="ts">
    import { onDestroy } from 'svelte';

    import Card from '@smui/card';
    import ChoiceButton from './ChoiceButton.svelte';
    import FormField from '@smui/form-field';
    import Slider from '@smui/slider'; 

    import InteractionDialog from './InteractionDialog.svelte';

    import { _ } from 'svelte-i18n';

    import { RoundType } from '@/enums';

    import { playAudio } from '@/helpers';
    import { socket } from '@/services/socket.service';
    import ErrorDialog from '@/components/misc/ErrorDialog.svelte';
    import type { SongQuizError } from '@/misc/errors';
    import type { Round } from '@/typings/state';
    
    export let round: Round;

    const labels = {
        [RoundType.Song]: 'round.typeLabels.song',
        [RoundType.Artist]: 'round.typeLabels.artist',
    }
    let label: string;
    $: label = $_(labels[round.type]);

    let volume: number = Number(localStorage.getItem('volume')) || 25;
    $: {
        if(audio) audio.volume = volume/100;
        localStorage.setItem('volume', volume.toString());
    }

    let interactionDialogOpen: boolean = false;
    
    const audio = playAudio(round.audioUrl, volume/100);
    audio.addEventListener('canplay', () => { 
        if(audio.paused) interactionDialogOpen = true;
    });

    let remainingTime = round.remainingTime;
    
    const interval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime -= 1;
        } else {
            clearInterval(interval);
            round.acceptingAnswers = false;
        }
    }, 1000);

    onDestroy(() => {
        if(!audio.ended) audio.pause();
        clearInterval(interval);
    });

    let selectedChoice: number | undefined;
    let errorDialog: ErrorDialog;
    let error: SongQuizError;

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

<Card variant="outlined" class="h-100 p-3 overflow-hidden d-flex flex-column justify-content-between text-center">
    <div>
        <h4 class="mt-4 mb-1">{ $_('round.numberLabel', { values: { number: round.number}}) }</h4>
        <h5 class="my-1">{label}</h5>
        <h6 class="my-1">{ remainingTime } seconds</h6>
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
    <div>
        <FormField align="end" style="display: flex;">
            <strong slot="label" style="font-size: 1.25rem;" class="me-1">Volume</strong>
            <Slider style="flex-grow: 1;" bind:value={volume} min={0} max={100} step={1} discrete/>
        </FormField>
    </div>
</Card>

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