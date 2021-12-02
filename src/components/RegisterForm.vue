<template>
  <h4 class="text-center mb-3">{{ header }}</h4>
  <form novalidate>
    <div class="row g-2">
      <div class="col-md-12">
        <label for="name" class="form-label">Name</label>
        <div class="input-group has-validation">
          <input
            type="text"
            class="form-control"
            id="name"
            ref="name"
            @keyup="is_name_valid = name.value.length != 0"
            @blur="validate"
          />
          <div class="invalid-feedback">Name is required</div>
        </div>
      </div>
      <div class="col-md-12">
        <label for="phone" class="form-label">Phone Number</label>
        <div class="input-group has-validation">
          <input
            ref="phone"
            type="tel"
            class="form-control"
            autocomplete="off"
            maxlength="14"
            id="phone"
            @keydown="enforceFormat"
            @keyup="
              formatToPhone($event);
              is_phone_valid = phone.value.length == 14;
            "
            @blur="validate"
          />
          <div class="invalid-feedback">Valid phone number is required</div>
        </div>
      </div>
      <div class="col-md-12">
        <label for="email" class="form-label">Email</label>
        <div class="input-group has-validation">
          <input
            ref="email"
            type="email"
            class="form-control"
            id="email"
            autocomplete="off"
            @keyup="
              is_email_valid = /^([a-z][a-z0-9_-]*@[a-z]+\.[a-z]+)$/.test(
                email.value
              )
            "
            @blur="validate"
          />
          <div class="invalid-feedback">Valid email is required</div>
        </div>
      </div>
      <div class="col-md-12">
        <label for="password" class="form-label">Password</label>
        <div class="input-group has-validation">
          <input
            ref="pwd"
            type="password"
            class="form-control border-end-0"
            id="password"
            autocomplete="off"
            @keyup="is_pwd_valid = pwd.value.length != 0"
            @blur="validate"
          />
          <span class="input-group-text bg-transparent" @click="showPassword">
            <i class="bi bi-eye-slash"></i>
          </span>
          <div class="invalid-feedback">Password is required</div>
        </div>
      </div>
      <div class="col-md-6">
        <label for="city-select" class="form-label">City</label>
        <div class="input-group has-validation">
          <select
            ref="city"
            class="form-select"
            v-model="selected_city"
            @change="onCityChange"
            id="city-select"
            @blur="validate"
          >
            <option value="default">Select your city</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
          <div class="invalid-feedback">City is required</div>
        </div>
      </div>
      <div class="col-md-6">
        <label for="district-select" class="form-label">District</label>
        <div class="input-group has-validation">
          <select
            ref="dist"
            class="form-select"
            v-model="selected_district"
            @change="onDistrictChange"
            :disabled="!is_city_valid"
            id="district-select"
            @blur="validate"
          >
            <option value="default">Select your district</option>
            <option
              v-for="district in districts"
              :key="district"
              :value="district"
            >
              {{ district }}
            </option>
          </select>
          <div class="invalid-feedback">District is required</div>
        </div>
      </div>
      <div class="col-md-12">
        <label for="neighborhood-select" class="form-label">Neighborhood</label>
        <div class="input-group has-validation">
          <select
            ref="nbhd"
            class="form-select"
            v-model="selected_neighborhood"
            :disabled="!is_district_valid || !is_city_valid"
            id="neighborhood-select"
            @change="is_neighborhood_valid = selected_neighborhood != 'default'"
            @blur="validate"
          >
            <option value="default">Select your neighborhood</option>
            <option
              v-for="neighborhood in neighborhoods"
              :key="neighborhood"
              :value="neighborhood"
            >
              {{ neighborhood }}
            </option>
          </select>
          <div class="invalid-feedback">Neighborhood is required</div>
        </div>
      </div>
      <div class="col-md-12">
        <label for="address" class="form-label">Address</label>
        <div class="input-group has-validation">
          <textarea
            class="form-control"
            id="address"
            rows="2"
            ref="addr"
            style="resize: none"
            autocomplete="off"
            @keyup="is_addr_valid = addr.value.length != 0"
            @blur="validate"
          ></textarea>
          <div class="invalid-feedback">Address is required</div>
        </div>
      </div>
      <div class="d-grid col-md-12 mx-auto mb-4">
        <button
          class="btn btn-primary"
          type="button"
          :disabled="
            !is_city_valid ||
            !is_district_valid ||
            !is_neighborhood_valid ||
            !is_name_valid ||
            !is_phone_valid ||
            !is_email_valid ||
            !is_pwd_valid ||
            !is_addr_valid
          "
        >
          Register
        </button>
      </div>
      <div class="col-md-auto mx-auto">
        Hesabınız var mı?
        <router-link :to="{ name: 'Login' }" style="text-decoration: none">
          Giriş yapın <i class="bi bi-box-arrow-up-right"></i>
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import db from "../firebase";
export default {
  name: "RegisterForm",
  props: ["header"],
  setup() {
    const selected_city = ref("default");
    const selected_district = ref("default");
    const selected_neighborhood = ref("default");
    const cities = ref([]);
    const districts = ref([]);
    const neighborhoods = ref([]);
    const is_city_valid = ref(false);
    const is_district_valid = ref(false);
    const is_neighborhood_valid = ref(false);
    const is_name_valid = ref(false);
    const is_phone_valid = ref(false);
    const is_email_valid = ref(false);
    const is_pwd_valid = ref(false);
    const is_addr_valid = ref(false);
    const name = ref("");
    const phone = ref("");
    const email = ref("");
    const pwd = ref("");
    const addr = ref("");
    const city = ref("");
    const dist = ref("");
    const nbhd = ref("");

    db.collection("cities")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          cities.value.push(doc.data().name);
        });
        cities.value.sort(new Intl.Collator("de").compare);
      });

    const onCityChange = async () => {
      districts.value = [];

      let snap = await db
        .collection("cities")
        .where("name", "==", selected_city.value)
        .get();

      snap.forEach((doc) => {
        doc.data().districts.forEach((district) => {
          districts.value.push(district.name);
        });
      });

      districts.value.sort(new Intl.Collator("de").compare);
      selected_district.value = "default";
      selected_neighborhood.value = "default";
      is_district_valid.value = false;
      is_city_valid.value = selected_city.value == "default" ? false : true;
    };

    const onDistrictChange = async () => {
      neighborhoods.value = [];
      let count = 0;

      let snap = await db
        .collection("cities")
        .where("name", "==", selected_city.value)
        .get();

      snap.forEach((doc) => {
        doc.data().districts.some((district) => {
          if (district.name === selected_district.value) {
            district.neighborhoods.forEach((neighborhood) => {
              neighborhoods.value.push(neighborhood);
            });
            return true;
          }
        });
      });

      neighborhoods.value.sort(new Intl.Collator("de").compare);
      selected_neighborhood.value = "default";
      is_district_valid.value =
        selected_district.value == "default" ? false : true;
    };

    const showPassword = () => {};

    const isNumericInput = (event) => {
      const key = event.keyCode;
      return (
        (key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) // Allow number pad
      );
    };

    const isModifierKey = (event) => {
      const key = event.keyCode;
      return (
        event.shiftKey === true ||
        key === 35 ||
        key === 36 || // Allow Shift, Home, End
        key === 8 ||
        key === 9 ||
        key === 13 ||
        key === 46 || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        // Allow Ctrl/Command + A,C,V,X,Z
        ((event.ctrlKey === true || event.metaKey === true) &&
          (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
      );
    };

    const enforceFormat = (event) => {
      // Input must be of a valid number format or a modifier key, and not longer than ten digits
      if (!isNumericInput(event) && !isModifierKey(event)) {
        event.preventDefault();
      }
    };

    const formatToPhone = (event) => {
      if (isModifierKey(event)) {
        if (event.keyCode == 8) {
          is_phone_valid.value = false;
        }
        return;
      }

      const input = event.target.value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
      const areaCode = input.substring(0, 3);
      const middle = input.substring(3, 6);
      const last = input.substring(6, 10);

      is_phone_valid.value = input.length == 10 ? true : false;

      if (input.length > 6) {
        event.target.value = `(${areaCode}) ${middle} ${last}`;
      } else if (input.length > 3) {
        event.target.value = `(${areaCode}) ${middle}`;
      } else if (input.length > 0) {
        event.target.value = `(${areaCode}`;
      }
    };

    const validate = (event) => {
      var element;
      var is_valid;

      if (event.target.id === "name") {
        element = name.value;
        is_valid = is_name_valid.value;
      } else if (event.target.id === "phone") {
        element = phone.value;
        is_valid = is_phone_valid.value;
      } else if (event.target.id === "email") {
        element = email.value;
        is_valid = is_email_valid.value;
      } else if (event.target.id === "password") {
        element = pwd.value;
        is_valid = is_pwd_valid.value;
      } else if (event.target.id === "city-select") {
        element = city.value;
        is_valid = is_city_valid.value;
      } else if (event.target.id === "district-select") {
        element = dist.value;
        is_valid = is_district_valid.value;
      } else if (event.target.id === "neighborhood-select") {
        element = nbhd.value;
        is_valid = is_neighborhood_valid.value;
      } else {
        element = addr.value;
        is_valid = is_addr_valid.value;
      }

      if (is_valid) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
      } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
      }
    };

    return {
      selected_city,
      selected_district,
      selected_neighborhood,
      cities,
      districts,
      neighborhoods,
      is_city_valid,
      is_district_valid,
      is_neighborhood_valid,
      is_name_valid,
      is_phone_valid,
      is_email_valid,
      is_pwd_valid,
      is_addr_valid,
      name,
      phone,
      email,
      pwd,
      addr,
      city,
      dist,
      nbhd,
      onCityChange,
      onDistrictChange,
      showPassword,
      enforceFormat,
      formatToPhone,
      validate,
    };
  },
};
</script>

<style></style>
