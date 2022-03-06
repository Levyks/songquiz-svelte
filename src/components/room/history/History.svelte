<script lang="ts">
    import Card from '@smui/card';
    import SongCard from './SongCard.svelte';

    const songs = new Array(5).fill({
        image: 'https://place-hold.it/320x320?text=square&fontsize=48',
        name: 'Song Name',
        artist: 'Artist Name',
    });

</script>

<Card class="h-100" variant="outlined" style="overflow: hidden;">
    <h4 class="text-center m-4">You've listened to</h4>
    <div class="list">
        {#each songs as song}
            <SongCard {song} />
        {/each}
    </div>
</Card>

<style lang="scss">
    .list {
        overflow-y: auto;
    }
</style>

