document.getElementById("signInDetail").addEventListener("click", function (event){
  event.preventDefault();

  let localEmail = localStorage.getItem("Email");
  let localPassword = localStorage.getItem("Password");

  let logInEmail = document.getElementById("inputEmail").value;
  let logInPassword = document.getElementById("inputPassword").value;

  if (logInEmail === localEmail && logInPassword === localPassword) {
      var successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();

      setTimeout(function() {
          window.location.href = "/index.html";
      }, 2000);
  } else {
      alert("Incorrect email or password. Please try again");
  }
});