<script lang="ts">
    import IconButton, { Icon } from '@smui/icon-button';

    import { darkMode } from '@/stores';
</script>

<IconButton toggle title="Toggle Dark Mode" bind:pressed={$darkMode}>
    <Icon class="material-icons" style="color: #673ab7;">dark_mode</Icon>
    <Icon class="material-icons" style="color: #fcba03;" on>light_mode</Icon>
</IconButton>