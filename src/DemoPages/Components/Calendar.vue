<template>
  <div>
    <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>
    <b-card class="main-card mb-3">
      <FullCalendar :options="calendarOptions" />
    </b-card>
  </div>
</template>

<script>
import PageTitle from "../../Layout/Components/PageTitle.vue";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    PageTitle,
    FullCalendar
  },
  data: () => ({
    heading: "Calendar",
    subheading: "Calendars are used in a lot of apps. We thought to include one for VueJS.",
    icon: "pe-7s-car icon-gradient bg-warm-flame",

    calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth'
      }
  }),

};
</script>
