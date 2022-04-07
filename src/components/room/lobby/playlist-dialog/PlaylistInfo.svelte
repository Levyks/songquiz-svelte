<script lang="ts">
    import { _ } from "svelte-i18n";
    import { fade } from 'svelte/transition';
    import { room } from '@/stores';

    const platforms = {
        'spotify': 'Spotify'
    };

</script>

{#if $room.playlist}
    <div class="wrapper">
        {#key $room.playlist.url}
            <div class="grid my-2" in:fade={{duration: 500, delay: 500}} out:fade={{duration: 500}}>
                <span><strong>{$_('playlist.dialog.info.name')}:</strong> {$room.playlist.name}</span>
                <span><strong>{$_('playlist.dialog.info.platform')}:</strong> {platforms[$room.playlist.type] || $room.playlist.type}</span>
                <span><strong>{$_('playlist.dialog.info.numberOfPlayable')}:</strong> {$room.playlist.playable_tracks_count}</span>
                <span><strong>{$_('playlist.dialog.info.numberOfRemaining')}:</strong> {$room.playlist.remaining_playable_tracks_count}</span>
                <div class="img-wrapper">
                    <img src={$room.playlist.cover} alt="playlist cover"/>
                </div>
            </div>
        {/key}
    </div>
{:else}
    <div class="text-center my-2">
        <strong>{$_('playlist.notSet')}</strong>
    </div>
{/if}

<style lang="scss">
    .wrapper {
        display: grid;
    }

    .grid {
        grid-row: 1 / span 1;
        grid-column: 1 / span 1;

        display: grid;
        
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: 1fr 1fr auto;
        grid-gap: 1rem;

        margin: 20px 0;

        @media (max-width: 768px) {
            grid-template-columns: 1fr auto;
        }
    }

    span {
        @media (max-width: 768px) {
            grid-column: 1 / span 1;
        }
    }

    .img-wrapper {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        grid-column: 3 / span 1;
        grid-row: 1 / span 2;

        @media (max-width: 768px) {
            grid-column: 2 / span 1;
            grid-row: 1 / span 4;
        }
    }
    
    img {
        height: 72px;
        width: 72px;
        object-fit: cover;
        border-radius: 50%;
    }
</style>