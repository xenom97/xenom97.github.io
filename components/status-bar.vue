<template>
  <nav
    class="absolute top-0 flex items-center justify-between w-full h-6 bg-black bg-opacity-10 px-1"
  >
    <div class="text-white">
      <span class="text-xs">{{ currentTime }}</span>
    </div>

    <div class="flex items-center space-x-1 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
        class="w-4 h-4"
      >
        <path
          d="M8.763 13.58a1.75 1.75 0 1 1 2.473 2.477 1.75 1.75 0 0 1-2.473-2.478v.001zM3.4 10.825c3.64-3.64 9.56-3.64 13.2 0l-1.65 1.65a7.007 7.007 0 0 0-9.9 0l-1.65-1.65zm-3.3-3.3c5.46-5.459 14.34-5.459 19.8 0l-1.65 1.65c-4.55-4.55-11.95-4.55-16.5 0L.1 7.526v-.001z"
          fill="currentColor"
        />
      </svg>
      <svg
        fill="currentColor"
        viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
      >
        <path
          d="M5 8H7V14H5V8M8 8H10V14H8V8M18 5V6H19V9H20V13H19V16H18V17H3V16H2V6H3V5H18M17 7H4V15H17V7M11 8H13V14H11V8Z"
        />
      </svg>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const getCurrentTime = () => {
  return new Intl.DateTimeFormat('id', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
    .format(new Date())
    .toString();
};

const currentTime = ref(getCurrentTime());

setInterval(() => {
  currentTime.value = getCurrentTime();
}, 1000);
</script>
