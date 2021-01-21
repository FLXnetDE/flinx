<script>
  export let data;
  data.sort((a, b) => {
    return new Date(b.dateReceived) - new Date(a.dateReceived);
  });
</script>

<table class="table table-hover table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">
        <i class="fas fa-box"></i>
        payload
      </th>
      <th scope="col">
        <i class="far fa-calendar-alt"></i>
        received
      </th>
      <th scope="col">
        <i class="fas fa-microchip"></i>
        device
      </th>
    </tr>
  </thead>
  <tbody>
    {#each data as dataSet}
      <tr>
        <td>
          <span class="badge badge-warning">{dataSet._id}</span>
        </td>
        <td>{dataSet.payload}</td>
        <td>{new Date(dataSet.dateReceived)}</td>
        {#if !dataSet.device}
          <td>
            <span class="badge badge-info">internal publish</span>
          </td>
        {:else}
          <td>{dataSet.device}</td>
        {/if}
      </tr>
    {/each}
  </tbody>
</table>
