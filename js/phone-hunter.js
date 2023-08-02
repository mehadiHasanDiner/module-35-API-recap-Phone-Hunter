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
    showAll.classList.remove("show-all");
  } else {
    showAll.classList.add("show-all");
  }
  const noFoundMsg = document.getElementById("no-found-msg");
  if (phones.length === 0) {
    noFoundMsg.classList.remove("d-none");
  } else {
    noFoundMsg.classList.add("d-none");
  }

  //   display all phones
  const allPhones = phones.slice(0, 20);
  allPhones.forEach((phone) => {
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
  searchField.value = "";
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

document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});
// loadPhones();
