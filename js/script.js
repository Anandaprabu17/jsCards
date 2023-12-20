const arr = [
  {
    id: 1,
    content:
      "lorem ipsum, dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incidudunt ut labore et  dolore magna aliqua",
    btn: "read more",
  },
  {
    id: 2,
    content:
      "lorem ipsum, dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incidudunt ut labore et  dolore magna aliqua",
    btn: "read more",
  },
  {
    id: 3,
    content:
      "lorem ipsum, dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incidudunt ut labore et  dolore magna aliqua",
    btn: "read more",
  },
  {
    id: 4,
    content:
      "lorem ipsum, dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incidudunt ut labore et  dolore magna aliqua",
    btn: "read more",
  },
  {
    id: 5,
    content:
      "lorem ipsum, dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incidudunt ut labore et  dolore magna aliqua",
    btn: "read more",
  },
  {
    id: 6,
    content:
      "lorem ipsum, dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incidudunt ut labore et  dolore magna aliqua",
    btn: "read more",
  },
];
var anotherSelect;
var selectOption;
var optionValue;
var options;
var disableNewValue;

function getValue() {
  var selectedValue = document.getElementById("drop").value;
  filterFunc(selectedValue);
  localStorage.setItem("fillSelect", selectedValue);
}

var storeValue;
function filterFunc(value) {
  for (let i = 1; i <= Number(value); i++) {
    const x = arr.filter((x) => {
      if (x.id <= value) {
        storeValue = localStorage.setItem(
          "storedMain",
          x.id == value ? x.id : 1
        );
        return x;
      }
    });
    createHtml(x, localStorage.getItem("storedMain"));
  }
}

function createHtml(item, value) {
  var htmlElements = item.map((item) => {
    return `<div class="card" id="styleCard"><div class="circle"><h2 class="id" id="styleHead">${item.id}</h2> </div>
    <div class="content"><p>${item.content}</p>
    <a>${item.btn}</a></div></div>`;
  });
  var resultHtml = htmlElements.join("");
  var resultContainer = document.getElementById("mapped");
  resultContainer.innerHTML = resultHtml;
}

function moveNext() {
  window.location.href = "next/next.html";
  localStorage.setItem("newDefault", true);
  localStorage.setItem("disableBoolean", true);
}

window.addEventListener("pageshow", function (event) {
  if (!event.persisted) {
    var getDefault = localStorage.getItem("newDefault");
    getDefault ? reArrangedFunc(localStorage.getItem("storedMain")) : "";
  } else {
    console.log("i'm here!");
  }
  localStorage.removeItem("newDefault");
  localStorage.removeItem("storedMain");
  localStorage.removeItem("disableBoolean");
});
var freshStoredValue = localStorage.getItem("fillSelect");
var freshSelectBox = document.getElementById("drop");
var freshDefault = Boolean(localStorage.getItem("newDefault"));
if (freshStoredValue && freshDefault) {
  freshSelectBox.value = freshStoredValue;
  var selectBox = document.getElementById("drop").value;
  anotherSelect = document.getElementById("drop");
  options = anotherSelect.options;

  for (let i = 0; i < options.length; i++) {
    var optionValue = options[i].value;
    disableSelect(selectBox, optionValue, options[i]);
  }
}
function disableSelect(selectBox, optionValue, option) {
  if (selectBox > optionValue) {
    option.disabled = true;
  } else {
    option.disabled = false;
  }
}

var c = 0;
function reArrangedFunc(value) {
  var number = Number(value);

  for (let i = 1; i <= number; i++) {
    const x = [...arr].filter((x) => {
      if (x.id <= value) {
        return x;
      }
    });
    createAnotherHtml(x, value);
  }
}

function createAnotherHtml(item, value) {
  var htmlElements = item.map((item) => {
    return `<div class=${
      item.id < value ? "opacityCard" : "card"
    }  id="styleCard" ><div class="circle"><h2 class="id" id="styleHead">${
      item.id
    }</h2>${
      Number(value) == item.id && Number(value) != 1
        ? `<i class="bi bi-x iconCancel" id="icon" onclick="cancelDisable('${item.id}', '${value}')")"></i>`
        : ""
    }</div>;
    <div class="content"><p>${item.content}</p>
    <a>${item.btn}</a></div></div>`;
  });
  var resultHtml = htmlElements.join("");
  var resultContainer = document.getElementById("mapped");
  resultContainer.innerHTML = resultHtml;
}

var againSelected;
var anotherOption;
function cancelDisable(value, originalValue) {
  againSelected = document.getElementById("drop");
  anotherOption = againSelected.options;
  var targetValue;
  for (let i = 0; i < anotherOption.length; i++) {
    let anotherOptionValue = anotherOption[i].value;
    targetValue = Number(value) - 1;
    localStorage.setItem("targetValue", targetValue);
    if (targetValue == Number(anotherOptionValue)) {
      anotherOption[i].disabled = false;
      againSelected.value = targetValue;
      localStorage.setItem("fillSelect", targetValue);
      freshSelectBox.value = targetValue;
    } else if (Number(anotherOptionValue) > targetValue) {
      anotherOption[i].disabled = false;
      freshSelectBox.value = targetValue;
    } else if (Number(anotherOptionValue) < targetValue) {
      anotherOption[i].disabled = true;
      freshSelectBox.value = targetValue;
    } else {
      anotherOption[i].disabled = true;
    }
  }

  reArrangedFunc(localStorage.getItem("targetValue"));
}
