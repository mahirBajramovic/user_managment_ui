<template>
    <v-container fluid>

    <v-tabs>
        <v-tab @click="tab=1">User</v-tab>
        <v-tab :class="(hidePermissions) ? 'd-none' : ''" @click="tab=2" >Permissions</v-tab>
    </v-tabs>

    <div v-if="tab==1">
    <form action="" >
      <div class="form-group w-half">
        <v-text-field
          label="First Name"
          id="first_name"
          v-model="user.first_name"
        />
      </div>
      <div class="form-group w-half">
        <v-text-field
          label="Last Name"
          id="last_name"
          v-model="user.last_name"
        />
      </div>
      <div class="form-group w-half">
        <v-text-field
          label="Username"
          id="username"
          v-model="user.username"
        />
      </div>
      <div class="form-group w-half">
        <v-text-field
          label="Password"
          id="password"
          v-model="user.password"
        />
      </div>
    <div class="form-group width-full">
        <v-text-field
          label="Email"
          id="email"
          v-model="user.email"
        />
      </div>
      <div class="form-group w-half">
        <v-select label="Status" id="status" :items="statuses" v-model="user.status"/>
      </div>
    </form>
    </div>
    <div v-else :key="refreshKey" >
        <br>
                    <div v-for="(perm, index) in permissions" :key="index" >
                      <v-card elevation="5" outlined tile>
                        <v-card-text>
                          <p class="text-h4 text--primary">
                            {{ perm.code }} 
                          </p>
                          <p>
                            {{perm.description}}
                          </p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                            icon
                            :color="(perm.active) ? 'green' : 'gray'"
                            @click="changeActive(perm.id)"
                            >
                            <v-icon>mdi-star</v-icon>
                            </v-btn>
                        </v-card-actions>
                      </v-card>
                      <br />
                    </div>
    </div>
    <v-btn color="primary" block @click="saveUser()">
        Save
    </v-btn>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      statuses:[0,1],
      tab:1,
      refreshKey: false,
      hidePermissions:true,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    permissions() {
      return this.$store.state.permissions;
    },
  },
  created() {
    this.$store.dispatch("getPermissions");
    if (!isNaN(this.$route.params.id)) {
      this.$store.dispatch("getUser", this.$route.params.id);
      this.$store.dispatch("getUserPermissions",this.$route.params.id);
      this.hidePermissions = false
    } else {
        this.$store.state.user = {status:0}
    }
  },
  methods: {
    saveUser() {
      if (isNaN(this.$route.params.id)) {
        this.$store.dispatch("createUser", this.user);
        this.$alert("User created successfuly!").then(()=>{
            this.$router.push({ name: "home" });
        })
        return;
      }
      this.$store.dispatch("updateUser", this.user);
      var perms = [];
      for (var j = 0; j < this.$store.state.permissions.length; j++) {
            if(this.$store.state.permissions[j].active==true){
                var perm = {'perms_id':this.$store.state.permissions[j].id,'user_id':this.$store.state.user.id}
                perms.push(perm)
              }
      }
    this.$store.dispatch("updateUserPermissions", {'data':perms,'user_id':this.$store.state.user.id});
      this.$alert("User updated successfuly!").then(()=>{
            this.$router.push({ name: "home" });
      })
    },
    changeActive(perm_id){
        this.$store.dispatch("updatePermissionColor", {"id":perm_id});
        this.refreshKey = !this.refreshKey
    },
    }
};
</script>

<style scoped>
.add-new {
  margin-top: 50px;
}
.w-half {
  width: 50%;
  float: left;
}
.width-full {
  width: 100%;
  float: left;
}
form {
  display: flex;
  flex-wrap: wrap;
}
.form-group {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.form-group label {
  margin-bottom: 5px;
}
.form-group input,
select {
  padding: 5px;
  border: 1px solid #5bb7d6;
  border-radius: 5px;
}
.messages {
  display: block;
  margin-top: 30px;
  width: 100%;
  transition: all 0.25s ease-in-out;
}
input.submit {
  background: #5bb7d6;
  color: #000;
  padding: 5px;
  font-weight: bold;
}
</style>