<template>
  <button
    class="btn dropdown-toggle"
    id="user-dropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    type="button"
  >
    {{ user_name }}
  </button>
  <ul
    class="dropdown-menu dropdown-menu-dark position-absolute"
    aria-labelledby="user-dropdown"
  >
    <li>
      <router-link class="dropdown-item" to="#"> My Orders </router-link>
    </li>
    <li>
      <router-link class="dropdown-item" :to="{ name: 'Settings' }">
          Profile Settings
      </router-link>
    </li>
    <li>
      <div class="dropdown-item" @click="logout" style="cursor: pointer">
        Logout
      </div>
    </li>
  </ul>
</template>

<script>
import db from "../firebase";
import { ref } from "@vue/reactivity";
export default {
  props: {
    uid: String,
    user_type: String,
    logout: Function,
  },
  async setup(props) {
    const user_name = ref(
      await db
        .collection(props.user_type + "s")
        .doc(props.uid)
        .get()
    );

    user_name.value = user_name.value.data().name;

    return {
      user_name,
    };
  },
};
</script>

<style></style>
