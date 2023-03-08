<template>
  <form>
    <div id="app">
      <p class="homeText">
        Syötä tapahtuma
      </p>
      <br>
      <input id="textbox" v-model="eventName" type="text" required /><br />
      <br>
      <date-picker v-model="eventDate" type="datetime"></date-picker>
      <br>
      <br>
      <input v-model="eventPlace" type="text" required /><br />
      <br>
      <button @click="addEvent()">Add Event</button>
    </div>
  </form>
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

      if (!this.eventDate || !this.eventName || !this.eventPlace) {
        alert('Please fill in the required information');
        return;
      }
      if (this.eventDate && this.eventName && this.eventPlace) {
        alert('Tiedot lähetetty');
      }

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

  mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
    const textbox = document.getElementById('textbox');
    textbox.focus();
  })
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