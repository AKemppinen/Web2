<template>

  <div id="product-container">
    <p class="homeText">
      Listaa tapahtumia
    </p>
    <br>
    <div v-for="event in events" v-bind:key="event" class="prod">
      <p>{{ event.id }}</p>
      <p>{{ event.name }}</p>
      <p>{{ event.date }}</p>
      <p>{{ event.place }}</p>
    </div>
  </div>
</template>



<script>

export default {
  name: 'ListEvent',

  data() {
        return {
            events: []
        }
    },
  methods: {
    async getProducts() {
      const response = await fetch("http://localhost:3001/events");
      this.events = await response.json();
    }
  },
  async created() {
    await this.getProducts();
    let storage = localStorage.getItem("order");
    let data = storage.split(",");
    this.order = data;
  }


};
</script>
<style scoped>
.homeText {
  font-size: 35px;
  color: red;
  text-align: center;
  position: relative;
  top: 30px;
  text-shadow: 2px 2px 2px gray;
}
</style>