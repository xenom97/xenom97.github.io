<template>
  <div v-if="weatherData.weather" class="w-3/4 mx-auto mt-4 drop-shadow">
    <div
      class="flex items-center justify-center bg-black bg-opacity-10 py-2 px-4 rounded-xl"
    >
      <img
        :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
        width="80"
        height="80"
        class="w-16 h-16 sm:h-20 sm:w-20"
      />
      <div class="flex flex-col flex-1">
        <span class="text-sm sm:text-xl">
          {{ weatherData.main.temp }}&#8451;
        </span>
        <span class="text-xs capitalize">
          {{ weatherData.weather[0].description }}
        </span>
      </div>

      <div class="border-l border-gray-500 ml-2 pl-4">
        <span class="text-sm sm:text-xl">{{ weatherData.name }}</span>
      </div>
    </div>
  </div>

  <input v-model="isShowModal" type="checkbox" class="modal-toggle" />

  <div class="modal max-w-lg mx-auto">
    <div class="modal-box">
      <h3 class="font-bold text-lg uppercase">Permission</h3>
      <p class="py-4 text-sm">
        To provide the most accurate weather data, we recommend enabling
        location services. If you prefer not to share your location, we'll use
        our default location instead.
      </p>
      <div class="modal-action">
        <label
          class="btn btn-secondary"
          :class="{ disabled: isFetching }"
          @click="setDefaultLocation"
        >
          No
        </label>
        <label
          class="btn btn-primary"
          :class="{ disabled: isFetching }"
          @click="getUserLocation"
        >
          Yes
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isShowModal = ref(true);
const isFetching = ref(false);
const runtimeConfig = useRuntimeConfig();
/**
 * Copywriting: "Hey there! Want to know what the weather's like around you? Let us know your location and we'll show you!"
 */
const position = reactive({
  latitude: 0,
  longitude: 0,
});

const weatherData = ref<any>({});

function setDefaultLocation() {
  position.latitude = -6.4344784;
  position.longitude = 106.8261899;
  fetchWeather();
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function successCallback(currentPosition: GeolocationPosition) {
  position.latitude = currentPosition.coords.latitude;
  position.longitude = currentPosition.coords.longitude;
  fetchWeather();
}

function errorCallback(error: GeolocationPositionError) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert('User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      alert('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      alert('The request to get user location timed out.');
      break;
    default:
      alert('An unknown error occurred.');
      break;
  }
}

function fetchWeather() {
  isFetching.value = true;

  const apiKey = runtimeConfig.public.openWeatherMapKey;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((res) => {
      weatherData.value = res;

      setTimeout(() => {
        isFetching.value = false;
        isShowModal.value = false;
      }, 100);
    });
}
</script>
