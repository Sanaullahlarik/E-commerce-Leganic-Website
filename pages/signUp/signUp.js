document.getElementById("userDetails").addEventListener("submit", function (e) {
  e.preventDefault();

  let userName = document.getElementById("userName").value;
  let userEmail = document.getElementById("userEmail").value;
  let userPassword = document.getElementById("userPassword").value;

  if (!userName || !userEmail || !userPassword) {
    alert("Please fill all details.");
    return;
  }

  localStorage.setItem("Name", userName);
  localStorage.setItem("Email", userEmail);
  localStorage.setItem("Password", userPassword);

  var successModal = new bootstrap.Modal(
    document.getElementById("successModal")
  );
  successModal.show();

  setTimeout(function () {
    window.location.href = "/pages/signIn/signIn.html";
  }, 2000);
});
