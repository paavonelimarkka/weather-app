<template>
  <v-app>
    <v-container>
      <Header />
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>

import Header from "@/components/Header.vue";
import { routes } from './router'

export default {
  name: "App",
  theme: { dark: true },
  components: {
    Header
  },
  data: () => ({
    routes
  }),
  
};
</script>
