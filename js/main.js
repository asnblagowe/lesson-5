const list = document.querySelector(".list");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const pageText = document.querySelector(".page");
const searchInp = document.querySelector(".search");
const cards = document.getElementsByClassName("card");
const radios = document.querySelector("input[tipe='radio']");
let page = 1;
let pageTotalCount = 1;
let filter = "";
let search = "";

async function getData() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${search}&status=${filter}`
  );
  if (!response.ok) {
    searchInp.style.outLineColor = "red";
  } else {
    searchInp.style.outLineColor = "";
  }
  const data = await response.json();
  pageTotalCount = data.info.pages;
  return data;
}

render();
async function render() {
  const character = await getData();

  list.innerHTML = "";
  character.results.forEach((item) => {
    list.innerHTML += `
    <div id="${item.status + "," + item.name}" class="card">
        <h2>${item.name}</h2>
        <div class="img">
          <img
            src="${item.image}"
            alt=""
          />
        </div>
    </div>
  `;
  });

  pageText.innerText = `${page} | ${pageTotalCount}`;

  for (let card of cards) {
    card.addEventListener("mouseenter", () => {
      const [status, name] = card.id.split(",");
      card.children[0].innerText = status;
    });
    card.addEventListener("mouseleave", () => {
      const [status, name] = card.id.split(",");
      card.children[0].innerText = name;
    });
  }
}

prev.addEventListener("click", () => {
  if (page <= 1) {
    return;
  }
  page--;
  render();
});

next.addEventListener("click", () => {
  if (page >= pageTotalCount) {
    return;
  }
  page++;
  render();
});

searchInp.addEventListener("click", () => {
  search = searchInp.value;
  render();
});
radios.forEach((item) => {
  item.addEventListener("change", (e) => {
    if (e.target.id == "all") {
      filter = "";
    }
    filter = e.target.id;
    render();
  });
});
// document.addEventListener("mouseover", (e) => {
//   if (e.target.classList.contains("card")) {
//     const [status, name] = e.target.id.split(",");
//     e.target.children[0].innerText = status;
//   }
// });
// document.addEventListener("mouseleave", (e) => {
//   console.log(e);
//   if (e.target.classList.contains("card")) {
//     const [status, name] = e.target.id.split(",");
//     e.target.children[0].innerText = name;
//   }
// });
