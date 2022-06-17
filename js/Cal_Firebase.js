console.log("connected");
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
import {
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

//firestore
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  collection,
  query,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkS7XzeqgGkBzhx23EXdlXSbd7Ui1GsIc",
  authDomain: "tracker-expense-66fb1.firebaseapp.com",
  projectId: "tracker-expense-66fb1",
  storageBucket: "tracker-expense-66fb1.appspot.com",
  messagingSenderId: "318870892475",
  appId: "1:318870892475:web:2298fd2c3f05dd1a81de9e",
  measurementId: "G-D8PGQG8MGW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const github = new GithubAuthProvider();
const google = new GoogleAuthProvider();

const firestore = getFirestore();

//signup
var deskSigninEmail = document.getElementById("deskSigninEmail");
var deskSigninName = document.getElementById("deskSigninName");
var deskSigninPassword = document.getElementById("deskSigninPassword");
var deskSigninRepass = document.getElementById("deskSigninRepass");

var mobSigninEmail = document.getElementById("mobSigninEmail");
var mobSigninName = document.getElementById("mobSigninName");
var mobSigninPassword = document.getElementById("mobSigninPassword");
var mobSigninRepass = document.getElementById("mobSigninRepass");

var existingEmail = document.getElementsByClassName("existingEmail");

var SigninFormbtn = document.getElementById("SigninFormbtn");
//username to be displayed
var DisplayUsername = document.getElementById("DisplayUsername");

SigninFormbtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (mobSigninEmail.value == "" && mobSigninPassword.value == "") {
    createUserWithEmailAndPassword(
      auth,
      deskSigninEmail.value,
      deskSigninPassword.value
    )
      .then((users) => {
        updateProfile(auth.currentUser, {
          displayName: deskSigninName.value,
        });
      })
      .then(() => {
        location = "/cal3/calculator3.html";
      })
      .catch((error) => {
        console.log(error);
        existingEmail[0].innerHTML =
          "The account with this email already exists.";
      });
  } else {
    createUserWithEmailAndPassword(
      auth,
      mobSigninEmail.value,
      mobSigninPassword.value
    )
      .then((users) => {
        updateProfile(auth.currentUser, {
          displayName: mobSigninName.value,
        });
      })
      .then(() => {
        location = "/cal3/calculator3.html";
      })
      .catch((error) => {
        console.log(error);
        existingEmail[1].innerHTML =
          "The account with this email already exists.";
      });
  }
});

// -------------------------------------------------------------------------

//login

var DeskuserLoginEmail = document.getElementById("DeskuserLoginEmail");
var userLoginpass = document.getElementById("userLoginpass");

var MobuserLoginpass = document.getElementById("MobuserLoginpass");
var MobuserLoginEmail = document.getElementById("MobuserLoginEmail");

//mobile login
var giMobLogin = document.getElementById("giMobLogin");
var twiMobLogin = document.getElementById("twiMobLogin");
var googleMobLogin = document.getElementById("googleMobLogin");

// error msg
let alertDesk = document.getElementById("alertDesk");
let alertMob = document.getElementById("alertMob");

// Desk manual login
const loginFormbtn = document.getElementById("loginFormbtn");

loginFormbtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (MobuserLoginEmail !== "" && MobuserLoginpass !== "") {
    signInWithEmailAndPassword(
      auth,
      MobuserLoginEmail.value,
      MobuserLoginpass.value
    )
      .then(() => {
        location = "/cal3/calculator3.html";
      })
      .catch((error) => {
        console.log(error);
        alertMob.innerHTML = "Invalid email or password";
      });
  }
  if (DeskuserLoginEmail !== "" && userLoginpass !== "") {
    signInWithEmailAndPassword(
      auth,
      DeskuserLoginEmail.value,
      userLoginpass.value
    )
      .then(() => {
        location = "/cal3/calculator3.html";
      })
      .catch((error) => {
        console.log(error);
        alertDesk.innerHTML = "Invalid email or password";
      });
  }
});

// forget passwprd Modal
var DeskuserForgetPass = document.getElementById("DeskuserForgetPass");
var MobuserForgetPass = document.getElementById("MobuserForgetPass");
var FPnext = document.getElementById("FPnext");
var FPForm = document.getElementById("FPForm");
// var noUsername = document.getElementById("noUsername");

MobuserForgetPass.addEventListener("click", () => {
  $("#LoginModal").modal("hide");
  $("#ForgotPassModal").modal("show");
  FPForm.style.display = "block";
  //   FPnext.innerHTML = "Reset Password";
});

DeskuserForgetPass.addEventListener("click", () => {
  $("#LoginModal").modal("hide");
  $("#ForgotPassModal").modal("show");
  FPForm.style.display = "block";
  //   FPnext.innerHTML = "Reset Password";
});

var forgetEmail = document.getElementById("forgetEmail");
var alertFP = document.getElementById("alertFP");

FPnext.addEventListener("click", () => {
  sendPasswordResetEmail(auth, forgetEmail.value)
    .then((res) => {
      console.log(res);
      alertFP.innerHTML =
        "Password reset email sent! Please check your spam/inbox.";
      alertFP.style.color = "green";
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

//-----------------------------------------------------

//The user without having the username need to create an account
var signinbuttn = document.getElementById("SigninFormbtn");
var SmodalTitle = document.querySelector(".Smodal-title");

var close = document.getElementById("closenow");

close.addEventListener("click", () => {
  forgetEmail.value = "";
  alertFP.innerText = "";
});

//-----------------------------------------------------

// login with google desk
const googleBtnD = document.getElementById("Gologin");

googleBtnD.addEventListener("click", (e) => {
  console.log("Deskop user Sign in with google");
  // Sign through google
  signInWithPopup(auth, google)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      location = "/cal3/calculator3.html";
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

// login with google mobile
googleMobLogin.addEventListener("click", () => {
  console.log("Mobile user Sign in with google");
  // Sign through google
  signInWithPopup(auth, google)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      location = "/cal3/calculator3.html";
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

// Github login desk

const gitBtnD = document.getElementById("Gilogin");
var gitAlert = document.getElementById("LoginConflict")

gitBtnD.addEventListener("click", () => {
  console.log("github desktop user sign in");

  signInWithPopup(auth, github)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      setDoc(doc(firestore, "Credentials", token), {
        Username: result.user.displayName,
        Email: result.user.email,
      });

      window.location.href = "/cal3/calculator3.html";
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      gitAlert.innerHTML = "Account exist with different credentials!"
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
});

// Github login with mobile
var MobLoginConflict = document.getElementById("MobLoginConflict");

giMobLogin.addEventListener("click", () => {
  console.log("github mobile user sign in");
    Mob_Signin_popup();

});
function Mob_Signin_popup (){
    signInWithPopup(auth, github)
    .then((result) => {
        console.log(result);
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      setDoc(doc(firestore, "Credentials", token), {
        Username: result.user.displayName,
        Email: result.user.email,
      });

      window.location.href = "/cal3/calculator3.html";
      // ...
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      MobLoginConflict.innerHTML = "Account exist with different credentials!"
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
  }