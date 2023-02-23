<template>
  <div
    class="relative bg-gray-300 dark:bg-slate-800 max-w-lg w-full h-screen shadow-md mx-auto"
  >
    <StatusBar />

    <div class="flex flex-col pt-6">
      <SearchWidget />

      <WeatherWidget />
    </div>

    <BottomBar />
  </div>
</template>
