<script>
  import { authStore, logout } from '../auth';
  import { getChannels } from '../api';
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#/">
    <i class="fas fa-project-diagram"></i>
    flinx
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      {#if ($authStore != null)}
        <li class="nav-item">
          <a class="nav-link" href="#/">
            <i class="fas fa-tachometer-alt"></i>
            Dashboard
          </a>
        </li>
      {/if}
    </ul>
    <ul class="navbar-nav ml-auto">
      {#if ($authStore != null)}
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {$authStore.user.username} ({$authStore.user.email})
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#/profile">
              <i class="fas fa-user"></i>&nbsp;Profile
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#/" on:click="{logout}">
              <i class="fas fa-sign-out-alt"></i>&nbsp;Logout
            </a>
          </div>
        </li>
      {/if}
    </ul>
  </div>
</nav>