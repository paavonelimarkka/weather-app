<template>
  <div id="header">
    <h1>Weather App</h1>
    <v-btn class="menu_button blue lighten-3" to="/">Home</v-btn>
    <v-btn class="menu_button blue lighten-3" to="/favorites">Favorites</v-btn>
  </div>
</template>

<style lang="sass" scoped>

  #header
    text-align: center
    margin-top: 30px

  .menu_button
    margin: -10px 30px 0 0

  h1
    margin: 10px
    margin-right: 40px
    display: inline-block

  @media only screen and (max-width: 600px)
    h1
      display: block
      margin-bottom: 30px

    btn:first-child
      margin-right: 10px

</style>

<script>

export default {
  name: "Header",
  data: () => ({}),

};

</script>