import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

Vue.use(Vuex)

export default  new Vuex.Store({
  state: {
    api_server: "http://localhost:3000",
    users: [],
    users_count: 0,
    permissions:[],
    user: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      status: 0,
    },
    filters: {
      page: 1,
      limit: 10,
      status: -1,
    },
    notification: {
      status: false,
      message: "",
    },
  },
  getters: {},
  mutations: {
    setUsers(state, payload) {
      if (payload) return (state.users = payload);

      return (state.users = []);
    },
    setUser(state, payload) {
      if (payload) return (state.user = payload);

      return {};
    },
    setPermissions(state, payload) {
      if (payload) return (state.permissions = payload);

      return {};
    },
    setPermissionColor(state,payload){
      for (var i = 0; i < state.permissions.length; i++) {
        if (payload.id == state.permissions[i].id)
        state.permissions[i].active =  !state.permissions[i].active
      }
    }
  },
  actions: {
    getUsers(context, payload) {
      return new axios.get(this.state.api_server + "/users", {
        params: payload,
      })
        .then((response) => {
          context.commit("setUsers", response.data.users);
        })
        .catch((err) => {
          VueSimpleAlert.alert(err.message)
        });
    },
    getUser(context, payload) {
      return new axios.get(this.state.api_server + "/user/" + payload)
        .then((response) => {
          context.commit("setUser", response.data.user);
        })
        .catch((err) => {
          VueSimpleAlert.alert(err.message)
        });
    },
    createUser(context, payload) {
      return new axios.post(this.state.api_server + "/user", payload)
        .then(() => {})
        .catch((err) => {
          VueSimpleAlert.alert(err.response.data.error)
        });
    },
    updateUser(context, payload) {
      return new axios.put(this.state.api_server + "/user", payload)
        .then(() => {})
        .catch((err) => {
          console.log(err)
          VueSimpleAlert.alert(err.response.data.error)
        });
    },
    deleteUser(context, payload) {
      return new axios.delete(this.state.api_server + "/user/" + payload)
        .then(() => {
          this.dispatch("getUsers", this.state.filters);
        })
        .catch((err) => {
          VueSimpleAlert.alert(err.message)
        });
    },
    getPermissions(context) {
      return new axios.get(this.state.api_server + "/permissions")
        .then((response) => {
          context.commit("setPermissions", response.data.permissions);
          for (var i = 0; i < response.data.permissions.length; i++) {
            response.data.permissions[i].active = false
          }
        })
        .catch((err) => {
          VueSimpleAlert.alert(err.message)
        });
    },
    getUserPermissions(context, payload) {
      console.log(this.state.api_server + "/permissions/"+payload)
      return new axios.get(this.state.api_server + "/permissions/"+payload)
        .then((response) => {
          if (response.data.user_permissions != null){
          for (var i = 0; i < response.data.user_permissions.length; i++) {
            for (var j = 0; j < this.state.permissions.length; j++) {
              if(response.data.user_permissions[i].perms_id == this.state.permissions[j].id){
                this.state.permissions[j].active= true; 
              }
          }
        }
          }
        })
        .catch((err) => {
          VueSimpleAlert.alert(err.message)
        });
    },
    updateUserPermissions(context, payload) {
      return new axios.post(this.state.api_server + "/permissions/"+payload.user_id, payload.data)
        .then(() => {})
        .catch((err) => {
          VueSimpleAlert.alert(err.response.data.error)
        });
    },
    updatePermissionColor(context,payload){
      context.commit("setPermissionColor", payload);
    }
  },
});