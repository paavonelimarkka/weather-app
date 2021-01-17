<template>
  <div class="result">
    <Municipality/>
  </div>
</template>

<script>
// @ is an alias to /src
import Municipality from '../components/Municipality.vue';

export default {
  name: "Result",
  components: {
    Municipality
  }
};
</script>
