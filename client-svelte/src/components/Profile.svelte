<script>
  import { getProfile } from '../api';
  import LoadingError from './util/LoadingError.svelte';
  import LoadingSpinner from './util/LoadingSpinner.svelte';
</script>

{#await getProfile()}
  <LoadingSpinner />
{:then user} 
  <pre>{JSON.stringify(user, null, 2)}</pre>
{:catch err}
  <LoadingError message={err} />
{/await}
