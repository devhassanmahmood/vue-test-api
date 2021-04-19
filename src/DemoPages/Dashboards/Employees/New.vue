<template>
  <div>
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
    <employee-form 
      :employee="employee"
      @employeeForm="createEmployee"
      formHeading="Create New Employee"
      />
  </div>
</template>
<script>
  import api from 'axios'
  import EmployeeForm from './Form'
  export default {
    data: () => ({
      employee: {
        first_name: '',
        last_name: '',
        email_address: '',
        address1: '',
        address2: '',
        city: '',
        client_id: 3,
        country_id: '',
        province: '',
        role_id: 4,
        state_id: '',
        title: '',
      },
      snackbar: false,
      text: '',
    }),
    components: {
      EmployeeForm
    },
    methods: {
      createEmployee () {
        api.post('https://devapi.wurkzen.com/v1/client/1/employee', this.employee)
           .then(res => {
              console.log(res)
              this.text = "Employee has been created!."
              this.snackbar = true
           })
           .catch(error => {
              this.text = error
              this.snackbar = true
           })
      },
    }
  }
</script>
