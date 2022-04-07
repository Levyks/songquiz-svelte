<script lang="ts">
    import FormField from '@smui/form-field';
    import Slider from '@smui/slider'; 

    import { _ } from 'svelte-i18n';
    import { volume } from '@/stores';
</script>

<FormField align="end" style="display: flex;">
    <strong slot="label" style="font-size: 1.25rem;" class="me-1">{ $_('misc.volume')}</strong>
    <Slider style="flex-grow: 1;" bind:value={$volume} min={0} max={100} step={1} discrete/>
</FormField>