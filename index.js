  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBVKFcbh3FqruJRgEk-VSIJqZaPUAg7wgQ",
    authDomain: "realtime-data-test-1406a.firebaseapp.com",
    databaseURL: "https://realtime-data-test-1406a-default-rtdb.firebaseio.com",
    projectId: "realtime-data-test-1406a",
    storageBucket: "realtime-data-test-1406a.appspot.com",
    messagingSenderId: "539979861869",
    appId: "1:539979861869:web:db2edde956ed09a76f5464",
    measurementId: "G-NRN0HYW9L4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


  