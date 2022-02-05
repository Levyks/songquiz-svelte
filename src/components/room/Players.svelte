<script lang="ts">

    import Card from '@smui/card';
    import List from '@smui/list';

    import PlayerItem from './players/PlayerItem.svelte';

    const players = [1,2,3,4,5,6,7,8,9].map((_, i) => ({
        name: 'John Doe',
        isLeader: i==2,
        score: (10 - i) * 100,
    }));
     
</script>

<Card class="h-100" variant="outlined" style="overflow: hidden;">
    <h4 class="text-center m-4">Players</h4>
    <List
        avatarList
        nonInteractive
        style="overflow-y: auto;"
    >
        {#each players as player}
            <PlayerItem {player} />
        {/each}
    </List>
</Card>

