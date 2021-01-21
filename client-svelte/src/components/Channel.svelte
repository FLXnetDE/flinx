<script>
  import { getChannel } from '../api';
  import LoadingSpinner from './util/LoadingSpinner.svelte';
  import LoadingError from './util/LoadingError.svelte';
  import ChannelDataTable from './ChannelDataTable.svelte';

  export let params;
</script>

{#await getChannel(params.id)}
  <LoadingSpinner />
{:then channel} 
  <div class="jumbotron">
    <h1>{channel.name}</h1>
    <hr>
    Topic
    <span class="badge badge-info">{channel.topic}</span>
    Created
    <span class="badge badge-success">{new Date(channel.createdAt).toLocaleString()}</span>
    Updated
    <span class="badge badge-warning">{new Date(channel.updatedAt).toLocaleString()}</span>
  </div>
  <div class="card">
    <div class="card-header">
      <i class="fas fa-database"></i>
      Data
    </div>
    <div class="card-body">
      <ChannelDataTable data={channel.data} />
    </div>
  </div>
  <br>
  <div class="card">
    <div class="card-header">
      <i class="fas fa-microchip"></i>
      Allowed devices
    </div>
    <div class="card-body">
      device table
    </div>
  </div>
{:catch error}
  <LoadingError message="Channel could not be loaded." />
{/await}
