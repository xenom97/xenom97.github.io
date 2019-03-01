if (!('serviceWorker' in navigator)) {
  console.log('Browser does not support service worker.');
}
else {
  navigator.serviceWorker.register('service-workers.js').then(function () {
          console.log('Service worker has been registered.');
      }).catch(function (error) {
          console.log('Error registering service worker:', error);
      });
}