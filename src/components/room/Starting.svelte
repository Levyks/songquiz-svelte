<script lang="ts">
    import { onDestroy } from 'svelte';

    import CircularProgress from '@smui/circular-progress';
    import Card from '@smui/card';

    import { playAudio } from '@/helpers';  

    const countdownTotal = 3000;
    const countdownStep = 100;

    let loading = false;
    let countdown = countdownTotal;
    let interval = setInterval(decreaseCountdown, countdownStep);

    function decreaseCountdown() {
        countdown -= countdownStep;
        if (countdown <= 0) {
            clearInterval(interval);
            interval = null;
            loading = true;
        }
    }

    const audio = playAudio('/assets/audio/countdown.mp3', 0.5);

    onDestroy(() => {
        if(interval) clearInterval(interval);
        if(!audio.ended) audio.pause();
    });

</script>

<Card variant="outlined" class="h-100 p-3 overflow-hidden d-flex flex-column justify-content-center">
    <div class="text-center">
        <h4 class="text-center m-4">The game is about to start</h4>
        <CircularProgress 
            style="height: 64px; width: 64px;" 
            indeterminate={loading}
            progress={(countdownTotal - countdown) / countdownTotal}
        />
        <h3 class="text-center m-4">{Math.ceil(countdown/1000) || 'Starting'}</h3>
    </div>
</Card>