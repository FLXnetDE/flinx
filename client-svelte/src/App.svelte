<script>
  import Router from 'svelte-spa-router';
	import { authStore } from './auth.js';
	
	import Navigation from './components/Navigation.svelte';
	import Login from './components/Login.svelte';
	import Dashboard from './components/Dashboard.svelte';
  import Profile from './components/Profile.svelte';
  import Channel from './components/Channel.svelte';

  const routes = {
		'/': Dashboard,
    '/profile': Profile,
    '/channel/:id': Channel,
	};
</script>

<main>
  <Navigation />
  <div class="container">
    <div class="mt-4 mb-4">
      {#if $authStore == null}
        <Login />
      {:else}
        <Router {routes} />
      {/if}
    </div>
  </div>
</main>