<template>
  <div class="container d-flex flex-column justify-content-center flex-grow-1">
    <h4 class="text-center mb-3">Login With Phone Number</h4>
    <form novalidate>
      <div class="row justify-content-center mb-3">
        <div class="col-md-6 col-lg-4">
          <label for="phoneNumber" class="form-label">Phone Number</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-telephone-fill"></i>
            </span>
            <input
              id="phoneNumber"
              type="tel"
              class="form-control"
              placeholder="(5XX) XXX XXXX"
              maxlength="14"
              autocomplete="off"
              required
              @keydown="enforceFormat"
              @keyup="formatToPhone"
            />
          </div>
          <div class="invalid-feedback">Valid phone number is required</div>
        </div>
      </div>
      <div class="row justify-content-center mb-3">
        <div class="col-md-6 col-lg-4">
          <label for="password" class="form-label">Password</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-lock-fill"></i>
            </span>
            <input
              id="password"
              type="password"
              class="form-control"
              autocomplete="off"
              v-model="password"
              required
            />
          </div>
        </div>
      </div>
      <div class="row mb-5">
        <div class="d-grid col-md-6 col-lg-4 mx-auto">
          <button
            class="btn btn-primary"
            type="button"
            :disabled="!isComplete || password.length == 0"
          >
            Login
          </button>
        </div>
      </div>
      <div class="row mb-1">
        <div class="col-md-auto mx-auto">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="alwaysLogin"
            />
            <label class="form-check-label" for="alwaysLogin">
              Always Login
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-auto mx-auto mb-1">
          <router-link to="#" style="text-decoration: none">
            Şifrenizi mi unuttunuz <i class="bi bi-box-arrow-up-right"></i>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-md-auto mx-auto">
          Hesabınız yok mu?
          <router-link to="#" style="text-decoration: none">
            Şimdi oluşturun <i class="bi bi-box-arrow-up-right"></i>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: "",
      password: "",
      isDisabled: true,
      isComplete: false,
    };
  },
  methods: {
    isNumericInput(event) {
      let key = event.keyCode;
      return (
        (key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) // Allow number pad
      );
    },
    isModifierKey(event) {
      let key = event.keyCode;
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
    },
    enforceFormat(event) {
      // Input must be of a valid number format or a modifier key, and not longer than ten digits
      if (!this.isNumericInput(event) && !this.isModifierKey(event)) {
        event.preventDefault();
      }
    },
    formatToPhone(event) {
      if (this.isModifierKey(event)) {
        if (event.keyCode == 8) {
          this.isComplete = false;
        }
        return;
      }

      const input = (this.phoneNumber = event.target.value
        .replace(/\D/g, "")
        .substring(0, 10)); // First ten digits of input only
      const areaCode = input.substring(0, 3);
      const middle = input.substring(3, 6);
      const last = input.substring(6, 10);

      input.length == 10 ? (this.isComplete = true) : (this.isComplete = false);

      if (input.length > 6) {
        event.target.value = `(${areaCode}) ${middle} ${last}`;
      } else if (input.length > 3) {
        event.target.value = `(${areaCode}) ${middle}`;
      } else if (input.length > 0) {
        event.target.value = `(${areaCode}`;
      }
    },
  },
};
</script>

<style></style>
