<script>
  import { login } from '../auth.js';
  let username = '';
  let password = '';
  let loginError = '';
  function handleLogin() {
    login(username, password)
      .then((login) => {
        if (!login) loginError = 'Login failed, please try again.'
      })
      .catch((err) => loginError = 'An error occured, login failed, please try again.')
  }
</script>

<div class="col-md-4 offset-md-4">
  {#if loginError}
    <div class="alert alert-danger" role="alert">
      <i class="fas fa-exclamation-triangle"></i>
      {loginError}
    </div>
  {/if}
  <div class="card">
    <div class="card-body">
      <form on:submit|preventDefault={handleLogin}>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            bind:value={username} />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            bind:value={password} />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-success btn-block">
            <i class="fas fa-check"></i>&nbsp;Login
          </button>
        </div>
      </form>
    </div>
  </div>
</div>