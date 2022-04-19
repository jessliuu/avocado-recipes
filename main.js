console.log(avocadoData[0].title);

let body = document.querySelector("body");
let mainContainer = document.createElement("main");
body.appendChild(mainContainer);

for (i = 0; i < avocadoData.length; i++) {
  let divCard = document.createElement("div");
  let h5 = document.createElement("h5");
  h5.innerHTML = avocadoData[i].title;
  let img = document.createElement("img");
  img.setAttribute("src", avocadoData[i].image);

  divCard.appendChild(h5);
  divCard.appendChild(img);
  mainContainer.appendChild(divCard);
}
