<template>
  <div id="favorites">
    <Favorites/>
  </div>
</template>

<script>
// @ is an alias to /src
import Favorites from '../components/Favorites.vue';

export default {
  name: "FavResults",
  components: {
    Favorites
  }
};
</script>
