<script lang="ts">

    import Tooltip, {
        Content,
    } from '@smui/tooltip';

    import { _ } from 'svelte-i18n';

    import type { Playlist } from '@/typings/main';

    export let playlist: Playlist;
</script>

<Tooltip xPos="start">
    <Content class="d-flex">
      <img src={ playlist.cover } alt={$_('playlist.coverAlt')}/>
      <div class="ms-2">
        <h6 class="my-0">{ playlist.name }</h6>
        <p class="my-0">{ $_('playlist.byCreator', { values: { creator: playlist.creator } }) }</p>
      </div>
    </Content>
</Tooltip>

<style lang="scss">
    img {
        height: 64px;
        width: 64px;
        object-fit: cover;
    }
</style>