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
    import type { Results, Round } from '@/typings/state';
    
    export let round: Round;

    let ordered: Results;
    $: ordered = round.results!.sort((a, b) => b.score - a.score);

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
        <h4 class="mt-4 mb-1">{ $_('round.results') }</h4>
    </div>
    <div class="overflow-y-auto">
        <List
            avatarList
            nonInteractive
        >
            {#each ordered as resultEntry, idx}
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
    </div>
</Card>

<style lang="scss">
</style>