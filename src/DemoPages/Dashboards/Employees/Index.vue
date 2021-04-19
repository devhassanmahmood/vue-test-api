<template>
  <div>
    <button @click="createNewEmployee" type="button" class="btn-shadow my-5 d-inline-flex align-items-center btn btn-success">
      <font-awesome-icon class="mr-2" icon="plus" />
      Create New Employee
    </button>
    <div class="float-right w-50">
      <v-snackbar
        v-model="snackbar"
        >
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
            >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <v-data-table
      :headers="headers"
      :items="employees"
      :items-per-page="5"
      class="elevation-1"
      >
      <template v-slot:item.action="{ item }">
        <v-btn depressed color="primary" @click="editEmployee(item)">Edit</v-btn>
        <v-btn depressed color="error" class="ml-1" @click="deleteEmployee(item)">Delete</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import api from 'axios'
  import { library } from "@fortawesome/fontawesome-svg-core";
  import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  
  library.add(faStar, faPlus);
  
  export default {
    data() {
      return {
        headers: [
        { text: 'Title', value: 'title' },
        { text: 'First Name', value: 'first_name' },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Email', value: 'email_address' },
        { text: 'Address 1', value: 'address1' },
        { text: 'Address 2', value: 'address2' },
        { text: 'City', value: 'city' },
        { text: 'Province', value: 'province' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center'},
      ],
      employees: [],
      snackbar: false,
      text: '',
      }
    },
    components: {
      "font-awesome-icon": FontAwesomeIcon
    },
    mounted () {
      api.get('https://devapi.wurkzen.com/v1/client/1/employees')
         .then(res => {
            this.employees = res.data
         })
         .catch(error => console.log(error))
    },
    methods: {
      createPacks (item) {
        console.log(item)
      },
      createNewEmployee () {
        this.$router.push('/employees/new')
      },
      editEmployee (item) {
        this.$router.push(`/employees/edit/${item.id}`)
      },
      deleteEmployee (item) {
        api.delete(`https://devapi.wurkzen.com/v1/client/1/employee/${item.id}`)
        .then(res => {
          this.employees = this.employees.filter(employee => employee.id != item.id)
          console.log(res)
          this.text = "Employee has been deleted!."
          this.snackbar = true

        })
        .catch(error =>  {
          this.text = error
          this.snackbar = true
        })
      }
    }
  }
</script>
