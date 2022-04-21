<script lang="ts">

    import { _ } from 'svelte-i18n';

    import Slider from '@smui/slider';  
    import Radio from '@smui/radio';
    import FormField from '@smui/form-field';
    import Switch from '@smui/switch';
    import Snackbar, {
        Actions,
        Label,
        SnackbarComponentDev 
    } from '@smui/snackbar';  
    import IconButton from '@smui/icon-button';

    import ErrorLabel from '@/components/misc/ErrorLabel.svelte';

    import { room, isUpdatingOptions, isSelfLeader } from '@/stores';
    import { socket } from '@/services/socket.service';

    import { RoomGuessMode } from '@/enums';
    import type { SongQuizError } from '@/misc/errors';

    let errorSnackbar: SnackbarComponentDev;
    let error: SongQuizError;

    const guessModeLabels: { [key: string]: string } = {
        [RoomGuessMode.Song]: $_('lobby.settings.guessModes.song'),
        [RoomGuessMode.Artist]: $_('lobby.settings.guessModes.artist'),
        [RoomGuessMode.Both]: $_('lobby.settings.guessModes.both'),
    };

    function handleChange() {
        
        $isUpdatingOptions = true;
        
        socket.emit('options:set', $room.options, (err?: SongQuizError) => {
            
            $isUpdatingOptions = false;
            
            if(err) {
                error = err;
                errorSnackbar.open();
            }

        });
    }

</script>

<div class="d-flex align-items-center">
    <span>{@html $_('lobby.settings.numberOfRounds', { values: {number: $room.options.numberOfRounds}}) }</span>
    <Slider
        class="flex-1"
        min={5}
        max={20}
        discrete
        disabled={!$isSelfLeader || $isUpdatingOptions}
        bind:value={$room.options.numberOfRounds}
        on:SMUISlider:change={handleChange}
    />
</div>

<div class="d-flex align-items-center">
    <span>{@html $_('lobby.settings.secondsPerRound', { values: { seconds: $room.options.secondsPerRound }})}</span>
    <Slider
        class="flex-1"
        min={5}
        max={30}
        discrete
        disabled={!$isSelfLeader || $isUpdatingOptions}
        bind:value={$room.options.secondsPerRound}
        on:SMUISlider:change={handleChange}
    />
</div>

<div class="d-flex align-items-center">
    <span>{$_('lobby.settings.guessModeLabel')}</span>
    <div class="d-flex flex-wrap">
        {#each Object.entries(guessModeLabels) as [key, label]}
            <FormField>
                <Radio
                    value={key}
                    disabled={!$isSelfLeader || $isUpdatingOptions}
                    bind:group={$room.options.guessMode}
                    on:change={handleChange}
                />
                <span slot="label">
                    {label}
                </span>
            </FormField>
        {/each}
    </div>
</div>

<FormField>
    <Switch     
        disabled={!$isSelfLeader || $isUpdatingOptions}    
        bind:checked={$room.options.showGuessesPreview} 
        on:SMUISwitch:change={handleChange}
    />
    <span slot="label">{ $_('lobby.settings.showGuessesPreview') }</span>
</FormField>

<Snackbar bind:this={errorSnackbar}>
    <Label><ErrorLabel {error}/></Label>
    <Actions>
      <IconButton class="material-icons" title={$_('misc.dismiss')}>close</IconButton>
    </Actions>
</Snackbar>

<style lang="scss">
</style>