<script lang="ts">
    import Card from '@smui/card';
    import TrackCard from './TrackCard.svelte';

    import { _ } from 'svelte-i18n';
    import { room } from '@/stores';
</script>

<Card class="h-100" variant="outlined" style="overflow: hidden;">
    <h4 class="text-center m-4">{$_('history.title')}</h4>
    <div class="list">
        {#each $room.history as track}
            <TrackCard {track}/>
        {:else}
            <div class="text-center">
                <span class="empty">{$_('history.empty')}</span>
            </div>
        {/each}
    </div>
</Card>

<style lang="scss">
    .list {
        overflow-y: auto;
    }

    .empty {
        margin: 0 auto;
        color: #AAA;
    }
</style>

