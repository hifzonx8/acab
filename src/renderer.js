document.addEventListener("DOMContentLoaded", () => {
  const signinForm = document.getElementById("signin-form");
  const registerForm = document.getElementById("register-form");
  const newEntryForm = document.getElementById("new-entry-form");
  const logoutButton = document.getElementById("logout-button");

  if (newEntryForm) {
    newEntryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("acknowledged");
      const formData = {};

      new FormData(newEntryForm).forEach((v, k) => {
        formData[k] = v;
      });

      console.log(JSON.stringify(formData));
      window.electron.insertReport(formData);
    });
  }

  if (signinForm) {
    signinForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      window.electron.sendLogin(username, password);
    });

    window.electron.onLoginResponse((response) => {
      if (response.success) {
        // console.log(`Login successful!`);
      } else {
        console.log(`Login failed!`);
        swal.fire({
          icon: "error",
          html: "Username or password mismatch!",
          // timer: 1500,
          // timerProgressBar: true,
          // didOpen: () => {
          //     Swal.showLoading();
          // },
          // willClose: () => {
          //     Swal.stopTimer();
          // }
        });
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      window.electron.sendLogin(username, password);
    });

    window.electron.onLoginResponse((response) => {
      if (response.success) {
        // console.log(`Login successful!`);
      } else {
        console.log(`Login failed!`);
        swal.fire({
          icon: "error",
          html: "Username or password mismatch!",
          // timer: 1500,
          // timerProgressBar: true,
          // didOpen: () => {
          //     Swal.showLoading();
          // },
          // willClose: () => {
          //     Swal.stopTimer();
          // }
        });
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      window.electron.sendLogout();
    });
  }
});
