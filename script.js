const form = document.querySelector(".user-form");
      form.addEventListener("submit", saveText);

const textList = document.querySelector(".text-list");
textList.addEventListener("click", removeText);

document.addEventListener("DOMContentLoaded", localStorageOnLoad);

function saveText(e) {
  e.preventDefault();
  const userText = document.getElementById("user-text").value;
  if (userText !== "") {
    renderTextOnPage(userText);
  }
  addTextToLocalStorage(userText);
  console.log(this);
  this.reset();
}

function renderTextOnPage(text) {
  const liElement = document.createElement("li");
  liElement.textContent = text;

  const removeButton = document.createElement("a");
  removeButton.textContent = "X";
  removeButton.classList.add("remove-button");

  liElement.append(removeButton);
  textList.append(liElement);
}

function removeText(e) {
  if (e.target.classList.contains("remove-button")) {
    e.target.parentElement.remove();
    removeTextFromLocalStorage(e.target.parentElement.textContent);
  }
}

function removeTextFromLocalStorage(text) {
  const records = getTextFromLocalStorage();
  console.log(records);
  const deleteText = text.substring(0, text.length -1);
  records.forEach((text, i) => {
    if (text === deleteText) {
      console.log(i);
      records.splice(i, 1);
    }
  });
  localStorage.setItem("records", JSON.stringify( records ));
}

function addTextToLocalStorage(text) {
  let records = getTextFromLocalStorage();
  records.push(text);
  localStorage.setItem("records", JSON.stringify( records ) );
}

function getTextFromLocalStorage() {
  let arrOfRecords;
  const records = localStorage.getItem("records");
  if (records === null) {
    arrOfRecords = [];
  } else {
    arrOfRecords = JSON.parse(records);
  }
  return arrOfRecords;
}

function localStorageOnLoad() {
  const loadedRecords = getTextFromLocalStorage();
  loadedRecords.forEach(text => {
    renderTextOnPage(text);
  });
}