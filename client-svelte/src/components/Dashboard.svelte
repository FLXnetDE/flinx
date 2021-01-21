<script>
  import { getChannels } from '../api';
  import LoadingSpinner from './util/LoadingSpinner.svelte';
  import LoadingError from './util/LoadingSpinner.svelte';
  import DashboardChannel from './DashboardChannel.svelte';
</script>

<h1>Dashboard</h1>
<hr>

{#await getChannels()}
  <LoadingSpinner />
{:then channels }
  {#each channels as channel}
    <DashboardChannel channel={channel} />
  {/each}
{:catch error}
  <LoadingError message="Could not load channels" />
{/await}

<a href="#/createChannel" class="btn btn-success mt-3">
  <i class="fas fa-plus"></i>&nbsp;Create new channel
</a>