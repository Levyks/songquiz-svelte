<script lang="ts">
    import HomeCard from '@/components/home/Card.svelte';
    import DarkModeSwitch from '@/components/misc/DarkModeSwitch.svelte';
</script>


<div class="d-flex justify-content-end mt-2 me-3">
    <DarkModeSwitch />
</div>

<div class="h-100 flex-center">
    <HomeCard />
</div>