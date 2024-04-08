const buttons = document.querySelectorAll("button");
const form = document.querySelector("form");
const formActivity = document.querySelector("form span");
const input = document.querySelector("input");
const error = document.querySelector(".error");

let activity = "cycling";

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    activity = e.target.dataset.activity;

    buttons.forEach((button) => button.classList.remove("active"));
    e.target.classList.add("active");

    input.setAttribute("id", activity);

    formActivity.textContent = activity;

    update(data);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const distance = parseInt(input.value);

  if (distance) {
    db.collection("activities")
      .add({
        distance,
        activity,
        date: new Date().toString(),
      })
      .then(() => {
        error.textContent = "";
        input.value = "";
      });
  } else {
    error.textContent = "Please enter a valid distance";
  }
});
