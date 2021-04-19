<template>
  <div class="ml-5 row">
    <div class="col-md-8">
      <div class="main-card mb-3 card">
        <div class="card-body">
          <h5 class="card-title">{{formHeading}}</h5>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="submit"
            >
            <v-text-field
              v-model="employee.title"
              :rules="required"
              label="Title"
              required
            ></v-text-field>
            <v-text-field
              v-model="employee.first_name"
              label="First Name"
              :rules="required"
              required
              ></v-text-field>
            <v-text-field
              v-model="employee.last_name"
              :rules="required"
              label="Last Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="employee.email_address"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="employee.address1"
              :rules="required"
              label="Address 1"
              placeholder="Base Street Address"
              required
            ></v-text-field>
            <v-text-field
              v-model="employee.address2"
              label="Address 2"
              :rules="required"
              placeholder="Apartment, Unit, etc."
              required
            ></v-text-field>
            <v-text-field
              v-model="employee.city"
              :rules="required"
              label="City"
              required
            ></v-text-field>
            <v-select
              v-model="employee.country_id"
              :items="countries"
              :rules="[v => !!v || 'Country is required']"
              label="Select Country"
              item-text="country_name"
              item-value="id"
              required
            ></v-select>
            <v-select
              v-if="employee.country_id == 236"
              v-model="employee.state_id"
              :items="states"
              :rules="[v => !!v || 'State is required']"
              label="Select State"
              item-text="name"
              item-value="id"
              required
            ></v-select>
            <v-text-field
              v-model="employee.province"
              :rules="required"
              label="Province"
              required
            ></v-text-field>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              type="submit"
              >
              Submit
            </v-btn>
            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
              >
              Reset
            </v-btn>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from 'axios'
  export default {
    props: ['employee', 'formHeading'],
    data: () => ({
      valid: false,
      countries: [],
      states: [],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      required: [
        v => !!v || 'This field is required',
      ],
    }),
    mounted() {
      this.fetchCountries();
      this.fetchStates();
    },
    methods: {
      fetchCountries () {
        api.get('https://devapi.wurkzen.com/v1/countries')
          .then(res => {
            this.countries = res.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      submit () {
        if (this.$refs.form.validate()) {
          this.$emit('employeeForm', this.employee)
        }
      },
      fetchStates () {
        api.get('https://devapi.wurkzen.com/v1/states')
          .then(res => {
            this.states = res.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>
