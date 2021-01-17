<template>
  <v-container class="mt-6">

    <h2 style="text-align: center">Search for a municipality</h2>
    <!-- this was quite straight copy from konte -->
    <v-row class="text-center">
      <v-col cols="10" class="mx-auto">
      <v-autocomplete
        class="mx-8 mt-1"
        outlined
        item-text="name"
        item-value="municipality"
        :disabled="municipalities.length === 0"
        :loading="!municipalitiesLoaded"
        :items="municipalities"
        @change="municipalitySelected"
      />
      </v-col>
    </v-row>


  </v-container>
</template>

<script>
  import fmi from 'fmi-api'
  export default {
    name: "Search",
    data: () => ({
      municipality: "",
      municipalitiesLoaded: false,
      municipalities: []
    }),
    methods: {
      municipalitySelected(municipality) {
        municipality = municipality.split(",")[0]     // Becose my app is based on municipality, we unfortunately need to only have that and nothing else 
        this.$router.push(`/result/${municipality}`)  // Pass the municipality to route params. This part of the app I'm not that proud of :D
      }
    },
    created: async function () {
      try {
        this.municipalities= await fmi.getLocations()
        this.municipalitiesLoaded = true
      } catch (error) {
        console.error(error)
      }
    }
}

</script>