<template>
  <v-container>
		<h2>Favourite municipalities</h2>

		<v-container>
      <v-row>
        <v-col cols="12" lg="4" md="6" v-for="item in favorites" :key="item">
          <v-card class="mb-4 px-6 blue lighten-5" elevation="4">
            <v-card-title class="pl-2">{{ item }}</v-card-title>
            <v-card-text>
              <v-row>

                <v-btn @click="removeFavorite(item)" class="mx-3 my-4">
                    <v-icon left>
                      mdi-heart-broken
                    </v-icon> 
                  Remove favorite
                </v-btn>

                <v-btn
                  class="mx-3 my-4"
                  :to="'/result/' + item"
                >
                  View
                </v-btn>

              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
		</v-container>

  </v-container>
</template>

<style lang="sass" scoped>
  h2
    text-align: center
    margin: 20px 0
</style>

<script>

// Import the FMI API implementation of konte
const fmi = require("fmi-api");

export default {
  name: "Favorites",

  data: () => ({
    isFavorite: false,
    favorites: []
	}),
	
  methods: {
    
    // Update components favorite array
    updateFavorites() {
      this.favorites = localStorage.getItem('favorites') 
        ? JSON.parse(localStorage.getItem('favorites'))
        : []
    },
    
    removeFavorite(municipality) {
      const favorites = localStorage.getItem('favorites') 
        ? JSON.parse(localStorage.getItem('favorites'))
        : []

       if (favorites.includes(municipality)) {
        favorites.splice(favorites.indexOf(municipality), 1)
        this.favorites.splice(this.favorites.indexOf(municipality), 1)
        localStorage.setItem('favorites', JSON.stringify(favorites))
      }
    },
	},

	created() {
    this.updateFavorites()
	}

};
</script>