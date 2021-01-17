<template>
  <v-container>

		<div id="municipality_wrapper" class="mx-auto">
			<!-- Updates via this.municipality -->
			<h2 id="municipality-heading" style="text-align: center">{{ municipalityHeading }}</h2>
			<!-- Toggle favourite municipality -->
			<v-btn v-if="searchDone" @click="toggleFavorite(municipality)" class="mx-auto">
					<v-icon left>
						{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
					</v-icon> 
				{{ isFavorite ? 'Remove favorite' : 'Add as favorite' }}
			</v-btn>
		</div>

		<v-container>

			<v-row>
				<v-col cols="12" class="px-12">
					<v-progress-linear
						v-if="!observationLoaded || !forecastLoaded"
						indeterminate
					></v-progress-linear>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12" md="4" sm="6">
					<v-card v-if="observation" elevation="4" class="blue lighten-3">
						<v-card-title>Weather right now</v-card-title>
						<v-card-subtitle>{{ formatDate(observation.time) }}</v-card-subtitle>
						<v-card-text>
							<v-row>
								<v-col cols="12" lg="6" sm="12">
									<v-list-item two-line>
										<v-list-item-content>
											<v-list-item-title>Temperature</v-list-item-title>
											<v-list-item-subtitle>{{ observation.t2m }} °C</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<v-col cols="12" lg="6" sm="12">
									<v-list-item two-line>
										<v-list-item-content>
											<v-list-item-title>Wind Speed</v-list-item-title>
											<v-list-item-subtitle>{{ observation.ws_10min }} m/s</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>

				<template v-if="forecast">
				<v-col v-for="(item, time) in forecast" :key="time" cols="12" md="4" sm="6">
					<v-card elevation="4" class="blue lighten-5">
						<v-card-title>Weather forecast</v-card-title>
						<v-card-subtitle>{{ formatDate(time) }}</v-card-subtitle>
						<v-card-text>
							<v-row>
								<v-col cols="12" lg="6" sm="12">
									<v-list-item two-line>
										<v-list-item-content>
											<v-list-item-title>Temperature</v-list-item-title>
											<v-list-item-subtitle>{{ item.Temperature }} °C</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<v-col cols="12" lg="6" sm="12">
									<v-list-item two-line>
										<v-list-item-content>
											<v-list-item-title>Wind Speed</v-list-item-title>
											<v-list-item-subtitle>{{ item.WindSpeedMS }} m/s</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<!-- And here we could add more weather details if we feel so... -->
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>
				</template>

			</v-row>
		</v-container>
  </v-container>
</template>

<style lang="sass" scoped>

	#municipality_wrapper
		text-align: center
		margin-bottom: 20px

	#municipality-heading // I know..
		margin: 40px 0 20px 0

</style>


<script>
// Import the FMI API implementation of konte
const fmi = require("fmi-api");

// Import format for formatting the date-time
import { format } from 'date-fns'

export default {
  name: "Municipality",

  data: () => ({
		municipality: "",
		municipalityHeading: "",
    observation: null,
		forecast: {},
		isFavorite: false,
		searchDone: false,
		observationLoaded: false,
		forecastLoaded: false
	}),
	
  methods: {

    // Create a method to get the observation values
    async UpdateObservation() {
			this.observation = await fmi.getLatestObservation(this.municipality)
			this.observationLoaded = true
			this.searchDone = true
		},
		
    // Create a method to get the forecast values
    async UpdateForecast() {
      this.forecast = await this.TimestampedForecast(
        await fmi.getForecast(this.municipality)
			)
			this.forecastLoaded = true
		},

		// Create a method to update the cards by pressing the search button
    async UpdateCards() {

			// Upate the h2 heading based on the chosen municipality. Not sure if this is a bit hacky?
			this.municipality
				? this.municipalityHeading = "Weather in " + this.municipality
				: this.municipalityHeading = ""
			
			// Call both of the methods in a same promise
			Promise.all([this.UpdateObservation()],[this.UpdateForecast()])
			this.checkFavoriteState()
		},
		
    // Using Kontes data mapping function here
    TimestampedForecast(forecast) {
      const out = {};
      for (const topic in forecast) {
        // Every weather topic inside the forecast
        const topicData = forecast[topic]
        for (const measurement of topicData) {
          // Every measurement inside a topic
          out[measurement.time] = out[measurement.time]
            ? { ...out[measurement.time], [topic]: measurement.value } // If the child does not have a time as a key, set it and set the value for the key
            : { [topic]: measurement.value } // If the child has time as a key, just set the value for it
        }
      }
      return out
		},

		// Following two are straight from Kontes example
		checkFavoriteState() {
      const favorites = localStorage.getItem('favorites') 
        ? JSON.parse(localStorage.getItem('favorites'))			// Localstorage returns a string so it needs to be parsed as a JSON data 
				: []
				
      this.isFavorite = favorites.includes(this.municipality)
		},
		
		toggleFavorite(municipality) {
      const favorites = localStorage.getItem('favorites') 
        ? JSON.parse(localStorage.getItem('favorites'))
        : []
      if (favorites.includes(municipality)) { 															// IF the chosen municipality IS found from the JSON data...
        favorites.splice(favorites.indexOf(municipality))										// we splice it away from there
        localStorage.setItem('favorites', JSON.stringify(favorites)) 				// and we stringihy the JSON data and set the localstorage item back
        this.isFavorite = false 																						// and toggle the isFavourite boolean
      } else {																															// IF the chosen municipality is NOT found from the data...
        favorites.push(municipality)																				// we place it there
        localStorage.setItem('favorites', JSON.stringify(favorites)) 				// and we stringify the JSON data and set the localstorage item back
        this.isFavorite = true																							// and we toggle the isFavorite boolean
      }
		},
		// Used the formatter straight from kontes example :--(
		formatDate(dateStr) {
			return format(new Date(dateStr), 'EEEE dd.MM.yyyy HH:mm')
		}
	},

	created() {
		// If the route parameter has a municipality in it, we need to set some values
		if (this.$route.params.municipality) {
			this.searchDone = true // A bit hacky but hides the search bar
			this.municipality = this.$route.params.municipality
			this.UpdateCards()
		}
	}
}
</script>