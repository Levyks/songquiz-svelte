<script lang="ts">

    import ChoicesStep from './ChoicesStep.svelte';
    import ResultsStep from './ResultsStep.svelte';

    import { room } from '@/stores';
    import type { Round } from '@/typings/state'; 

    let round: Round;
    $: round = $room.currentRound!;

</script>

{#if round.results }
    <ResultsStep {round}/>
{:else}
    <ChoicesStep {round}/>
{/if}