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
      @employeeForm="editEmployee"
      formHeading="Update Employee"
      v-if="employee"
      />
  </div>
</template>
<script>
  import api from 'axios'
  import EmployeeForm from './Form'
  export default {
    data: () => ({
      employee: null,
      snackbar: false,
      text: '',
    }),
    components: {
      EmployeeForm
    },
    
    mounted() {
      api.get(`https://devapi.wurkzen.com/v1/client/1/employee/${this.$route.params.id}`)
       .then(res => {
          this.employee = res.data
       })
       .catch(error => {
          console.log(error)
       })
     },
    methods: {
      editEmployee (employee) {
        api.put(`https://devapi.wurkzen.com/v1/client/1/employee/${employee.id}`, employee)
           .then( res => {
              console.log(res)
              this.text = "Employee has been updated!."
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
