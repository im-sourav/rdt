import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { equalTo, get, set, getDatabase, orderByChild, query, remove, ref } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";


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
let users = [];

window.onload = function () {
  users = [];
  get(ref(db, `users`)).then(function (snapshort) {
    if (snapshort.exists()) {
      users = snapshort.val();
      users.forEach(e => setUsers);
    }
    const len = users.length;

    function createOne() {
      userName = nameInput.value;
      if (userName.length < 3) return;
      const q = query(ref(db, "users/"), orderByChild("name"), equalTo(userName));
      get(q).then(function (sp) {
        if (!sp.exists()) {
          const ob = { name: userName, score: 0 };
          users.push(ob);
          set(ref(db, `users/${len}`), ob).then(function () {
            setUsers(ob, true);
            console.log("user create");
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
  let i = 0
  for (; i < users.length; i++) if (users[i].name == userName) break;

  remove(ref(db, `users/${i}`)).then(function () {
    console.log("remove");
  });
})


function setUsers(data, you = false) {
  const player = createElement("div", "player", userContener);
  if (!you) player.classList.add("active");

  const name = you ? "you" : data.name;

  const name_score = createElement("div", "name-score", player);
  createElement("div", "player-name", name_score, `Name <x>${name}</x>`);
  createElement("div", "player-score", name_score, `Score <x>${data.score}</x>`);

  const in_de = createElement("div", "in-de", player);
  const plus = createElement("div", "plus", in_de);
  const mine = createElement("div", "mine", in_de);

  userContener.style.height = "auto";
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
// 