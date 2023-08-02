const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  //   console.log(phones);
  //   display no found phones massage
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";

  // display 10 phone only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  const noFoundMsg = document.getElementById("no-found-msg");
  if (phones.length === 0) {
    noFoundMsg.classList.remove("d-none");
  } else {
    noFoundMsg.classList.add("d-none");
  }

  //   display all phones

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional
                    content. This content is a little bit longer.</p>

                    <button onclick = "showDetails('${phone.slug}')" class="btn btn-primary text-white fw-bold " data-bs-toggle="modal" data-bs-target="#showPhoneDetailsModal"> Show Details</button>

            </div>
        </div>
    `;
    phonesContainer.append(phoneDiv);
  });
  //   stop loader
  loadingSpinner(false);
};

const processSearch = (dataLimit) => {
  loadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   console.log(searchText);
  loadPhones(searchText, dataLimit);
  // searchField.value = "";
};

const loadingSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  //   start loader
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

// handle search button click
const searchPhone = () => {
  processSearch(10);
};

// handle search button click
document
  .getElementById("search-field")
  .addEventListener("keypress", function (event) {
    console.log(event.key);
    if (event.key === "Enter") {
      processSearch(10);
    }
  });

document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const showDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showPhoneDetails(data.data);
};

const showPhoneDetails = (phoneDetails) => {
  console.log(phoneDetails);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.textContent = "";
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal-content");
  const allSensors = phoneDetails.mainFeatures.sensors;
  modalDiv.innerHTML = `
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="showPhoneDetailsModalLabel">Phone title: ${phoneDetails.name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <div class ="text-center mb-2"><img class = "" src="${phoneDetails.image}" alt=""></div>
        <ul>
          <li>Release Date: ${phoneDetails.releaseDate}</li>
          <li>Brand: ${phoneDetails.brand}</li>
          <li>Chip Set: ${phoneDetails.mainFeatures.chipSet}</li>
          <li>Display Size: ${phoneDetails.mainFeatures.displaySize}</li>
          <li>Memory: ${phoneDetails.mainFeatures.memory}</li>
          <li>Storage: ${phoneDetails.mainFeatures.storage}</li>
          <li>Bluetooth : ${phoneDetails.others.Bluetooth}</li>
          <li>GPS : ${phoneDetails.others.GPS}</li>
          <li>NFC : ${phoneDetails.others.NFC}</li>
          <li>Radio : ${phoneDetails.others.Radio}</li>
          <li>USB : ${phoneDetails.others.USB}</li>
          <li> WLAN : ${phoneDetails.others.WLAN} </li>
          <li> Sensors : ${allSensors[0]}, ${allSensors[1]}, ${allSensors[2]}, ${allSensors[3]} </li>
        </ul>
        </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  `;
  modalContainer.appendChild(modalDiv);
};

// loadPhones();
