<script lang="ts">

    import Card from '@smui/card';
    import List, {
        Item,
        Graphic,
        Meta,
        Label
    } from '@smui/list';

    import { _ } from 'svelte-i18n';

    import PlayerIcon from '@/components/misc/PlayerIcon.svelte';    
    
    import { room } from '@/stores';
    import type { Results, Round } from '@/typings/state';
    
    export let round: Round;
    let results: Results;
    $: results = round.results!;

    let remainingTime = $room.nextRoundStartsIn!;
    const interval = setInterval(() => {
        remainingTime -= 1;
        if (remainingTime <= 0) {
            clearInterval(interval);
        }
    }, 1000);

    function getMedalColor(idx: number) {
        return [
            '#FFD700', // Gold
            '#C0C0C0', // Silver
            '#CD7F32', // Bronze
        ][idx];
    }

</script>

<Card variant="outlined" class="h-100 p-3 overflow-hidden d-flex flex-column justify-content-between text-center">
    <div>
        <h4 class="mt-4 mb-1">{ $_('round.results.title') }</h4>
    </div>
    <div class="overflow-y-auto list-wrapper">
        <List
            avatarList
            nonInteractive
        >
            {#each results as resultEntry, idx}
                <Item>
                    <Graphic>
                        <PlayerIcon player={resultEntry.player} size={32} />
                    </Graphic>
                    <Label>{resultEntry.player.nickname}</Label>
                    <div class="ms-auto d-flex align-items-center">
                        {#if idx < 3}
                            <Meta 
                                class="material-icons me-1"
                                style="color: {getMedalColor(idx)};"
                            >
                                workspace_premium
                            </Meta>
                        {/if}
                        <span title="Score">
                            {resultEntry.score} pt.
                        </span>
                    </div>
                </Item>
            {/each}
        </List>
    </div>
    <div>
        {#if round.isLastRound}
            {$_('round.results.finalResultsIn', { values: { time: remainingTime } })}
        {:else}
            {$_('round.results.nextRoundIn', { values: { time: remainingTime } })}
        {/if}
    </div>
</Card>

<style lang="scss">
    .list-wrapper {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }
</style>