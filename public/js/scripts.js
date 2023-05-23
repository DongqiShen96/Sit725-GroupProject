// Get the <span> element that closes the modal
var spans = document.getElementsByClassName("close");
// When the user clicks on <span> (x), close the modal
for (let i = 0; i < spans.length; i++) {
  spans[i].onclick = function () {
    if (userModal.style.display === "block") {
      userModal.style.display = "none";
    }
    if (petModal.style.display === "block") {
      petModal.style.display = "none";
    }
  };
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == userModal) {
    userModal.style.display = "none";
  }
  if (event.target == petModal) {
    petModal.style.display = "none";
  }
};

// User information
let imgUrl;

fetch("/api/userinfo")
  .then((response) => response.json())
  .then((data) => {
    if (data && data.data && data.data.length > 0) {
      const userInfo = data.data[0];
      document.querySelector(
        "#username"
      ).innerText = `Name: ${userInfo.username}`;
      document.querySelector(
        "#birthday"
      ).innerText = `Birthday: ${userInfo.birthday}`;
      document.querySelector(
        "#gender"
      ).innerText = `Gender: ${userInfo.gender}`;
      document.querySelector("#email").innerText = `Email: ${userInfo.email}`;
      document.querySelector(
        "#phone"
      ).innerText = `Phone Number: ${userInfo.phone}`;
      if (userInfo && userInfo.photo) {
        document.querySelector("#photo-preview").src = userInfo.photo;
      }
    }
  });

document.getElementById("upload-button").addEventListener("click", function () {
  document.getElementById("photo").click();
});

// Edit User Information
const userModal = document.getElementById("userModal");
const userEditBtn = document.getElementById("user-edit-btn");

userEditBtn.addEventListener("click", function () {
  userModal.style.display = "block";
});

document.getElementById("photo").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    document.getElementById("photo-preview").src = reader.result;
    const formData = new FormData();
    formData.append("user-info-img", file);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        imgUrl = data.imgUrl;
        document.querySelector(".user-info-img").src = imgUrl;
      })
      .catch((error) => console.error(error));
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

// Submit information
document
  .querySelector("#user-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const userInfo = {
      username: document.querySelector("#user-form #username").value,
      birthday: document.querySelector("#user-form #birthday").value,
      gender: document.querySelector("#user-form #gender").value,
      email: document.querySelector("#user-form #email").value,
      phone: document.querySelector("#user-form #phone").value,
      photo: imgUrl,
    };

    fetch("/api/userinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User info:", data);
        alert("User information has been successfully stored.");
        userModal.style.display = "none";
        // location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// pet information
let petimgUrl;

fetch("/api/petinfo")
  .then((response) => response.json())
  .then((data) => {
    if (data && data.data && data.data.length > 0) {
      const petInfo = data.data[0];
      document.querySelector(
        "#pet-name"
      ).innerText = `Name: ${petInfo.petName}`;
      document.querySelector(
        "#pet-type"
      ).innerText = `Type: ${petInfo.petType}`;
      document.querySelector(
        "#pet-breed"
      ).innerText = `Breed: ${petInfo.petBreed}`;
      document.querySelector("#pet-age").innerText = `Age: ${petInfo.petAge}`;
      document.querySelector(
        "#pet-gender"
      ).innerText = `Gender: ${petInfo.petGender}`;
      document.querySelector(
        "#pet-weight"
      ).innerText = `Weight: ${petInfo.petWeight}`;
      if (petInfo && petInfo.photo) {
        document.querySelector("#pet-photo-preview").src = petInfo.photo;
      }
    }
  });

document
  .getElementById("pet-upload-button")
  .addEventListener("click", function () {
    document.getElementById("pet-photo").click();
  });

// Edit Pet Information
const petModal = document.getElementById("petModal");
const petEditBtn = document.getElementById("pet-edit-btn");

petEditBtn.addEventListener("click", function () {
  petModal.style.display = "block";
});

document
  .getElementById("pet-photo")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      document.getElementById("pet-photo-preview").src = reader.result;
      const formData = new FormData();
      formData.append("pet-photo-img", file);

      fetch("/api/pet-upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          petimgUrl = data.imgUrl;
          document.querySelector(".pet-photo-img").src = petimgUrl;
        })
        .catch((error) => console.error(error));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });

// Submit pet information
document
  .querySelector("#pet-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const petInfo = {
      petName: document.querySelector("#pet-form #pet-name").value,
      petType: document.querySelector("#pet-form #pet-type").value,
      petBreed: document.querySelector("#pet-form #pet-breed").value,
      petAge: document.querySelector("#pet-form #pet-age").value,
      petGender: document.querySelector("#pet-form #pet-gender").value,
      petWeight: document.querySelector("#pet-form #pet-weight").value,
      photo: petimgUrl,
    };

    fetch("/api/petinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Pet info:", data);
        alert("Pet information has been successfully stored.");
        petModal.style.display = "none";
        // location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
