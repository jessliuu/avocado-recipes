console.log(avocadoData);
console.log(avocadoData[0].missedIngredients[2].name);

let body = document.querySelector("body");
body.classList.add("container-fluid");
body.style.fontFamily = "Avenir Book";

let nav = document.querySelector("nav");
nav.style.display = "flex";
nav.style.alignItems = "center";
// nav.style.justifyContent = "center";

let mainContainer = document.createElement("main");
mainContainer.classList.add("row");
// mainContainer.style.display = "flex";
// mainContainer.style.justifyContent = "space-evenly";
body.appendChild(mainContainer);

for (i = 1; i < avocadoData.length; i++) {
  // console.log(avocadoData[i].id);
  let sectionCard = document.createElement("section");
  sectionCard.classList.add("col-md-3");
  sectionCard.style.border = "1px solid #d387ab";
  sectionCard.style.borderTop = "0px";
  // if (i % 2 === 0) {
  //   sectionCard.style.backgroundColor = "#eec0c6";
  // }
  sectionCard.style.display = "flex";
  sectionCard.style.flexDirection = "column";

  sectionCard.style.alignItems = "center";
  sectionCard.style.justifyContent = "flex-end";
  sectionCard.style.padding = "10px";

  let headerContainer = document.createElement("div");
  let h5 = document.createElement("h5");
  h5.innerHTML = avocadoData[i].title;
  h5.style.color = "#d387ab";

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

  let ingredientsContainer = document.createElement("div");
  ingredientsContainer.style.alignSelf = "flex-start";
  let likes = document.createElement("p");
  likes.innerHTML = "<br>" + avocadoData[i].likes + " Likes";
  ingredientsContainer.appendChild(likes);

  let otheringredients = document.createElement("p");
  otheringredients.innerHTML = "Other ingredients:";
  ingredientsContainer.appendChild(otheringredients);

  let ingredientsList = document.createElement("ul");

  if (avocadoData[i].missedIngredients.length <= 3) {
    for (j = 0; j < avocadoData[i].missedIngredients.length; j++) {
      let eachIngredient = document.createElement("li");
      eachIngredient.innerHTML = avocadoData[i].missedIngredients[j].name;
      ingredientsList.appendChild(eachIngredient);
    }
  } else {
    for (j = 0; j < 3; j++) {
      let eachIngredient = document.createElement("li");
      eachIngredient.innerHTML = avocadoData[i].missedIngredients[j].name;
      ingredientsList.appendChild(eachIngredient);
    }
  }

  if (avocadoData[i].missedIngredients.length > 3) {
    let seeMore = document.createElement("li");
    seeMore.innerHTML = "See more...";
    ingredientsList.appendChild(seeMore);
  }
  ingredientsContainer.appendChild(ingredientsList);
  sectionCard.appendChild(ingredientsContainer);
}
