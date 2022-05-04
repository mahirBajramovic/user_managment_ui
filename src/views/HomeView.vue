<template>
    <v-container fluid>

  <v-card>
    <v-card-title>
      Users List
      <v-spacer></v-spacer>
      <div class="select-width">
        <v-select 
        class="select-width"
        label="Status" 
        id="status" 
        :items="statuses"
        @change="statusFilter()"
        v-model="status" />
  </div>
  <div>
                            <v-btn
              color="primary"
              dark
            @click="addUser()"
            >
              Add User
            </v-btn>
  </div>
    </v-card-title>
    <v-data-table
      :options.sync="options"
      :loading="loading"
      :headers="headers"
      :items="$store.state.users"
    >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editUser(item.id)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>
  </v-card>
    </v-container>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      statuses:[-1,0,1],
      status:-1,
      options: {},
      loading: true,
    headers: [
          {
            text: 'ID',
            value: 'id',
            align: 'start',
            sortable: false,
          },
          { text: 'First Name', value: 'first_name' },
          { text: 'Last Name', value: 'last_name' },
          { text: 'Username', value: 'username' },
          { text: 'Email', value: 'email' },
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false },

        ],
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    getUsers() {
      this.$store.dispatch("getUsers", this.$store.state.filters).then(()=>{this.loading=false});
    },
    deleteItem(user) {
      this.$confirm("Are you sure you want to delete this user?").then(() => {
            this.$store.dispatch("deleteUser", user.id);
      })
    },
    editUser(userID) {
      this.$router.push({ name: "editUser", params: { id: userID } });
    },
    statusFilter(){
        this.$store.state.filters.status=this.status
        this.$store.dispatch("getUsers", this.$store.state.filters);
    },
    addUser(){
        this.$router.push({ name: "addUser"});
    }
  },
  created() {
    this.getUsers();
  },
};
</script>

<style scoped>
.select-width {
  width: 35%;
  float: right;
  margin-right: 10px;
}
</style>
