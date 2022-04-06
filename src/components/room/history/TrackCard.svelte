<script lang="ts">
    import Card, { PrimaryAction } from '@smui/card';

    import type { Track } from '@/typings/main';

    export let track: Track;

</script>

<Card class="m-2" variant="outlined">
    <PrimaryAction>
        <a href={track.url} target="_blank" style="color: inherit;">
            <div class="content">
                <img src={track.cover} class="cover" alt="Song's cover"/>
                <span class="name">{track.name}</span>
                <span class="artist">
                    {#each track.artists as artist, idx}
                        <a target="_blank" href={artist.url}>{artist.name}</a>
                        {#if idx < track.artists.length - 1}
                            <span>, </span>
                        {/if}
                    {/each}
                </span>
            </div>
        </a>
    </PrimaryAction>
</Card>

<style lang="scss">

    .content {
        display: grid;
        grid-gap: .5rem;
        grid-template-columns: 96px auto;
        grid-template-areas:
            "cover name"
            "cover artist";
    }

    .cover {
        width: 100%;
        height: auto;
        object-fit: cover;
        grid-area: cover;
    }

    .name {
        font-size: 1.2rem;
        align-self: end;
        grid-area: name;
    }

    .artist {
        font-size: 0.8rem;
        align-self: start;
        grid-area: artist;
    }
</style>