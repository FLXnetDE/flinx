<script>
  import moment from 'moment';

  export let channel;
  $: lastReceivedDataSet = channel.data.reverse()[0];
  $: lastReceivedDataSetTime = moment(lastReceivedDataSet.dateReceived).fromNow();
</script>

<div class="card">
  <div class="card-header">
    <a href="#/channel/{channel._id}" class="btn btn-info btn-sm btn-block">
      <i class="fas fa-table"></i>&nbsp;{channel.name}
    </a>
  </div>
  <div class="card-body">
    {lastReceivedDataSet.payload}
  </div>
  <div class="card-footer text-muted">
    data received {lastReceivedDataSetTime}
  </div>
</div>