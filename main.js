console.log(avocadoData[0].title);

let body = document.querySelector("body");
body.classList.add("container-fluid");

let nav = document.querySelector("nav");
nav.style.display = "flex";
nav.style.alignItems = "center";
// nav.style.justifyContent = "center";

let mainContainer = document.createElement("main");
mainContainer.classList.add("row");
mainContainer.classList.add("justify-content-sm-center");
body.appendChild(mainContainer);

for (i = 1; i < avocadoData.length; i++) {
  let sectionCard = document.createElement("section");
  sectionCard.classList.add("col-md-4");
  if (i % 2 === 0) {
    sectionCard.classList.add("bg-warning");
  }
  sectionCard.style.display = "flex";
  sectionCard.style.flexDirection = "column";
  sectionCard.style.justifyContent = "flex-end";
  sectionCard.style.padding = "10px";

  let headerContainer = document.createElement("div");
  let h5 = document.createElement("h5");
  h5.innerHTML = avocadoData[i].title;

  let imgContainer = document.createElement("div");
  let img = document.createElement("img");
  img.setAttribute("src", avocadoData[i].image);
  img.classList.add("img-fluid");
  img.style.alignSelf = "flex-end";

  headerContainer.appendChild(h5);
  sectionCard.appendChild(headerContainer);
  imgContainer.appendChild(img);
  sectionCard.appendChild(imgContainer);
  mainContainer.appendChild(sectionCard);
}
