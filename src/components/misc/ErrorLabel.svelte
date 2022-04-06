<script lang="ts">
    import { _ } from 'svelte-i18n';
    import type { SongQuizError } from "@/misc/errors";

    export let error: SongQuizError;

</script>

{#if error}
{$_(error.messageCode, { values: error.params })}
{/if}