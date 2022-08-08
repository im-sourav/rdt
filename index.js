import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { equalTo, get, set, getDatabase, orderByChild, query, remove, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";


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
const db = getDatabase();

const enterNameEindow = document.getElementById("enter-name-window");
const nameInput = document.getElementById("name-input");
const enterButton = document.getElementById("enter-button");
const userContener = document.getElementById("user-contener");
let userName = undefined;

window.onload = function () {
  onValue(ref(db, `users`), function (snapshort) {
    userContener.innerHTML = "";
    if (snapshort.exists()) {
      const users = snapshort.val();
      for (const key in users) {
        setUsers({ [key]: users[key] });
      }
    }
 
    function createOne() {
      userName = nameInput.value;
      if (userName.length < 3) return;
      const q = query(ref(db, "users"), orderByChild("name"), equalTo(userName));
      get(q).then(function (sp) {
        if (!sp.exists()) {
          set(ref(db, `users/${userName}`), 0).then(function () {
            // console.log("user create");
            enterNameEindow.classList.toggle("active", false);
          })
        }
      });
    }
    enterButton.addEventListener("click", createOne);
    nameInput.addEventListener("keyup", e => e.keyCode === 13 && createOne());
  })
}

window.addEventListener("unload", function () {
  remove(ref(db, `users/${userName}`)).then(function () {
    // console.log("remove");
  });
})


function setUsers(data) {
  const player = createElement("div", "player", userContener);
  const key = Object.keys(data)[0]; // ob = {sourav: 100}; key = Object.keys(ob)[0]
  if (userName === key) player.classList.add("active");

  const name = userName == key ? "you" : key;

  const name_score = createElement("div", "name-score", player);
  createElement("div", "player-name", name_score, `Name <x>${name}</x>`);
  createElement("div", "player-score", name_score, `Score <x>${data[key]}</x>`);

  const in_de = createElement("div", "in-de", player);
  const plus = createElement("div", "plus", in_de);
  const mine = createElement("div", "mine", in_de);

  function updateValue(d) {
    get(ref(db, `users/${key}`)).then(function (sp) {
      const scr = Number(sp.val());
      update(ref(db, `users/`), {[key]: scr + d}).then(() => {
      })
    })
  }

  plus.addEventListener("click", () => {
    updateValue(1)
  });
  mine.addEventListener("click", () => {
    updateValue(-1)
  });
}

function createElement(element, className = null, parent = null, text = null) {
  const e = document.createElement(element);
  if (className) e.classList.add(className);
  if (text) e.innerHTML = text;
  if (parent) parent.appendChild(e);
  e.on = (event, callBackFun) => {
    e.addEventListener(event, callBackFun);
  }
  return e;
}

