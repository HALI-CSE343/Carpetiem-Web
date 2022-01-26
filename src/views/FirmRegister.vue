<template>
  <div class="container d-flex flex-column justify-content-center flex-grow-1">
    <div class="row mt-3 mt-md-0 mx-3 mx-sm-0">
      <div
        class="
          d-grid
          mx-auto
          col-md-8 col-lg-6 col-xl-5
          rounded
          border
          py-3
          my-3
        "
        v-if="!additionalInfo"
      >
        <RegisterForm
          header="Firma Kaydı"
          user_type="firm"
          @openAdditional="!additionalInfo"
        />
      </div>
      <div
        class="d-grid mx-auto col-md-8 col-lg-6 col-xl-5 rounded border py-3"
        v-if="additionalInfo"
      >
        <h5 class="mb-3">Çalışma Saatleri</h5>
        <div class="row g-3">
          <div
            class="col-12"
            v-for="index in workingDaysTr.length"
            :key="index"
          >
            <div class="row align-items-center">
              <div class="col-3">
                <label
                  :for="'workhours-' + workingDaysEng.at(index - 1) + '-start'"
                  class="col-form-label"
                  >{{ workingDaysTr.at(index - 1) }}</label
                >
              </div>
              <div class="col-3">
                <input
                  type="text"
                  class="form-control text-end"
                  :id="'workhours-' + workingDaysEng.at(index - 1) + '-start'"
                  value="00.00"
                  autocomplete="off"
                  :disabled="closed[index - 1].isClosed"
                  @click="
                    setCaretPos($event, 2);
                    isFraction = false;
                  "
                  @keydown="enforceFormat($event, false)"
                />
              </div>
              -
              <div class="col-3">
                <input
                  type="text"
                  class="form-control text-end"
                  :id="'workhours-' + workingDaysEng.at(index - 1) + '-end'"
                  value="00.00"
                  autocomplete="off"
                  :disabled="closed[index - 1].isClosed"
                  @click="
                    setCaretPos($event, 2);
                    isFraction = false;
                  "
                  @keydown="enforceFormat($event, false)"
                />
              </div>
              <div
                class="col-2"
                v-if="workingDaysEng.at(index - 1) != 'weekdays'"
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    :id="workingDaysEng.at(index - 1) + '-closed'"
                    v-model="closed[index - 1].isClosed"
                  />
                  <label
                    class="form-check-label"
                    :for="workingDaysEng.at(index - 1) + '-closed'"
                  >
                    Kapalı
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h5 class="mb-3 mt-3">Halı Türlerine Göre Fiyatlandırma</h5>
        <div class="row g-3">
          <div class="col-6" v-for="index in carpetTypesTr.length" :key="index">
            <div class="row">
              <div class="col-5">
                <label
                  :for="carpetTypesEng.at(index - 1) + '-price'"
                  class="col-form-label"
                  >{{ carpetTypesTr.at(index - 1) }}</label
                >
              </div>
              <div class="col-6">
                <input
                  type="text"
                  class="form-control text-end"
                  :id="carpetTypesEng.at(index - 1) + '-price'"
                  @click="
                    setCaretPos($event, 2);
                    isFraction = false;
                  "
                  @keydown="enforceFormat($event, true)"
                  value="00.00 ₺"
                  autocomplete="off"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-end mt-3">
          <div class="col-4 text-end">
            <button class="btn" type="button" @click="addAdditional">
              Devam Et
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import RegisterForm from "../components/RegisterForm.vue";
export default {
  name: "FirmRegister",
  components: { RegisterForm },
  setup() {
    const additionalInfo = ref(true);
    const carpetTypesTr = ref(["Ince", "Normal", "Kalın", "El Yapımı"]);
    const carpetTypesEng = ref(["thin", "normal", "thick", "handmade"]);
    const workingDaysTr = ref(["Hafta İçi", "Cumartesi", "Pazar"]);
    const workingDaysEng = ref(["weekdays", "sat", "sun"]);
    const closed = ref([
      { isClosed: false },
      { isClosed: false },
      { isClosed: false },
    ]);
    var isFraction = ref(false);
    var fracCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var intCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const deneme = ref(4);

    const setCaretPos = (event, pos) => {
      event.target.setSelectionRange(pos, pos);
    };

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
        key === 9 ||
        key === 13 ||
        key === 46 || // Allow Tab, Enter, Delete
        // Allow Ctrl/Command + A,C,V,X,Z
        ((event.ctrlKey === true || event.metaKey === true) &&
          (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
      );
    };

    const enforceFormat = (event, isCurrency) => {
      var split = event.target.value.split(".");
      var idSplit = event.target.id.split(/*/(?=[A-Z])/*/ "-");
      var workingDayIndex = workingDaysEng.value.indexOf(idSplit.at(1));
      var index = isCurrency
        ? carpetTypesEng.value.indexOf(idSplit.at(0))
        : workingDayIndex + (idSplit.at(2) == "start" ? 4 : 5);

      index =
        !isCurrency && workingDayIndex > 0
          ? index + 1 * workingDayIndex
          : index;

      if (!isNumericInput(event) && !isModifierKey(event)) {
        event.preventDefault();
        if (event.keyCode == 190) {
          setCaretPos(event, 5);
          isFraction.value = true;
        }
        if (event.keyCode == 8) {
          if (isFraction.value) {
            event.target.value =
              split.at(0) + ".0" + split.at(1).at(0) + (isCurrency ? " ₺" : "");
            setCaretPos(event, 5);
            if (fracCounts[index] > 0) {
              fracCounts[index]--;
            }
          } else {
            event.target.value = "0" + split.at(0).at(0) + "." + split.at(1);
            setCaretPos(event, 2);
            if (intCounts[index] > 0) {
              intCounts[index]--;
            }
          }
        }
      } else if (isNumericInput(event)) {
        if (isFraction.value) {
          if (fracCounts[index] < 2) {
            event.target.value =
              split.at(0) +
              "." +
              split.at(1).at(1) +
              event.key +
              (isCurrency ? " ₺" : "");
            setCaretPos(event, 5);
            if (event.key == "0" && fracCounts[index] > 0) {
              fracCounts[index]--;
            } else if (event.key != "0" && fracCounts[index] < 2) {
              fracCounts[index]++;
            }
          }
          event.preventDefault();
        } else {
          if (intCounts[index] < 2) {
            event.target.value =
              split.at(0).at(1) + event.key + "." + split.at(1);
            setCaretPos(event, 2);
            if (event.key == "0" && intCounts[index] > 0) {
              intCounts[index]--;
            } else if (event.key != "0" && intCounts[index] < 2) {
              intCounts[index]++;
            }
          }
          event.preventDefault();
        }
      }
    };

    return {
      additionalInfo,
      carpetTypesTr,
      carpetTypesEng,
      setCaretPos,
      enforceFormat,
      isFraction,
      workingDaysTr,
      workingDaysEng,
      closed,
      deneme,
    };
  },
};
</script>

<style scoped>
.btn {
  background-color: rgb(120, 150, 120);
  border: rgb(120, 150, 120);
}

.btn:hover {
  filter: brightness(85%);
}
</style>
