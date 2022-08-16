if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js", {
      scope:'.'
    })
    .then((res) => {
      console.log("registered ", res);
    })
    .catch((err) => {
      console.log("Not registered", err);
    });
}