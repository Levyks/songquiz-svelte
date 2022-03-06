<script lang="ts">
    import Card from '@smui/card';
    import ChoiceButton from './ChoiceButton.svelte';
    import FormField from '@smui/form-field';
    import Slider from '@smui/slider'; 
</script>

<Card variant="outlined" class="h-100 p-3 overflow-hidden d-flex flex-column justify-content-between text-center">
    <div>
        <h4 class="mt-4 mb-1">Round 5</h4>
        <h5 class="my-1">Guess the song</h5>
    </div>
    <div class="choices-wrapper">
        <ChoiceButton choice="Malvigão 3"/>
        <ChoiceButton choice="Igão Acústico 3"/>
        <ChoiceButton choice="Igão Cabloco"/>
        <ChoiceButton choice="Envolvigão"/>
    </div>
    <div>
        <FormField align="end" style="display: flex;">
            <strong slot="label" style="font-size: 1.25rem;" class="me-1">Volume</strong>
            <Slider style="flex-grow: 1;" value={0} min={0} max={100} step={1} discrete/>
        </FormField>
    </div>
</Card>

<style lang="scss">
    .choices-wrapper {

        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        flex-wrap: nowrap;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;

        @media (max-width: 1080px) {
            flex-wrap: wrap;
            max-width: none;
        }

        @media (max-width: 768px) {
            flex-wrap: nowrap;
        }
    }
</style>