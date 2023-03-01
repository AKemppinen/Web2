<template>
    <div id="app">
        <p class="homeText">
        Syötä tapahtuma
        </p>
        <br>
        <input v-model="eventName" type="text" /><br />
        <br>
        <date-picker v-model="eventDate" type="datetime"></date-picker>
        <br>
        <br>
        <input v-model="eventPlace" type="text" /><br />
        <br>
        <button @click="addEvent()">Add Event</button>
  </div>
</template>
<script>
import axios from "axios";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
  name: "App",
  components: { DatePicker },
  data() {
    return {
      events: [],
      eventName: "",
      eventDate: null,
      eventPlace: "",
    };
  },
  methods: {
    async addEvent() {
      const res = await axios.post(`http://localhost:3001/events`, {
        name: this.eventName,
        date: this.eventDate,
        place: this.eventPlace,
      });
      this.events = [...this.events, res.data];
      this.eventName = "";
      this.eventDate = "";
      this.eventPlace = "";
    },
  },
};
</script>
<style scoped>
    .homeText{
    font-size: 35px;
    color: red;
    text-align: center;
    position: relative;
    top:30px;
    text-shadow: 2px 2px 2px gray;
}
</style>