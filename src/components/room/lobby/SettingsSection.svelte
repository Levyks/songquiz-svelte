<script lang="ts">
    import Slider from '@smui/slider';  
    import Radio from '@smui/radio';
    import FormField from '@smui/form-field';
    import Switch from '@smui/switch';

    let rounds: number = 10;
    let timePerRound: number = 15;

    let selected: string = 'Song';
</script>

<div class="d-flex align-items-center">
    <span>Rounds: <strong>{rounds}</strong></span>
    <Slider
        class="flex-1"
        min={5}
        max={20}
        discrete
        bind:value={rounds}
    />
</div>

<div class="d-flex align-items-center">
    <span><strong>{timePerRound}</strong> seconds per round</span>
    <Slider
        class="flex-1"
        min={5}
        max={30}
        discrete
        bind:value={timePerRound}
    />
</div>

<div class="d-flex align-items-center">
    <span>You'll be guessing:</span>
    <div class="d-flex flex-wrap">
        {#each ['Song', 'Artist(s)', 'Both (Random)'] as option}
            <FormField>
                <Radio
                    bind:group={selected}
                    value={option}
                />
                <span slot="label">
                    {option}
                </span>
            </FormField>
        {/each}
    </div>
</div>

<FormField>
    <Switch />
    <span slot="label">Show guesses preview.</span>
</FormField>

<style lang="scss">
</style>