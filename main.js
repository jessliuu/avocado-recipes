console.log(avocadoData);
console.log(recipeData);
console.log(avocadoData[2].id);
console.log(recipeData[1].id);

if (avocadoData[2].id === recipeData[1].id) {
  console.log(avocadoData[2].id);
}

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
  sectionCard.classList.add("col-sm-6");
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
  // ingredientsContainer.style.alignSelf = "flex-start";
  ingredientsContainer.classList.add("align-self-sm-start");
  ingredientsContainer.classList.add("align-self-xxl-center");

  let tags = document.createElement("p");
  tags.innerHTML = "Tags: ";

  for (x = 0; x < recipeData.length; x++) {
    let identifier = avocadoData[i].id;
    if (identifier === recipeData[x].id) {
      if (recipeData[x].vegetarian === true) {
        tags.innerHTML += "Vegetarian";
      } else {
        tags.innerHTML += "N/A";
      }
    }
  }
  sectionCard.appendChild(tags);

  let likes = document.createElement("p");
  likes.innerHTML = avocadoData[i].likes + " Likes";
  ingredientsContainer.appendChild(likes);

  let otheringredients = document.createElement("p");
  otheringredients.innerHTML = "Other ingredients:";
  ingredientsContainer.appendChild(otheringredients);

  let ingredientsList = document.createElement("ul");

  if (avocadoData[i].missedIngredients.length <= 3) {
    // console.log("inside  if");
    for (j = 0; j < avocadoData[i].missedIngredients.length; j++) {
      let eachIngredient = document.createElement("li");
      eachIngredient.innerHTML = avocadoData[i].missedIngredients[j].name;
      ingredientsList.appendChild(eachIngredient);
    }
  } else {
    let moreThan3ing = [];
    for (let b = 0; b < avocadoData[i].missedIngredients.length; b++) {
      moreThan3ing.push(avocadoData[i].missedIngredients[b]);
      console.log(moreThan3ing);
    }
    let seeMore = document.createElement("p");
    seeMore.classList.add("leading");

    // let otherIng = [];
    // otherIng.push();

    // seeMore.type = "button";
    // seeMore.classList.add("btn btn-outline-secondary");
    seeMore.innerHTML = "And more... 	&#8964;";
    seeMore.style.opacity = "70%";
    ingredientsList.appendChild(seeMore);

    for (a = 0; a < 3; a++) {
      console.log(a);
      // console.log("inside else");
      let eachIngredient = document.createElement("li");
      console.log(eachIngredient[j]);
      eachIngredient.innerHTML = avocadoData[i].missedIngredients[j].name;

      ingredientsList.appendChild(eachIngredient);
      console.log(avocadoData[i].missedIngredients[j]);

      function expand() {
        console.log(avocadoData[i].missedIngredients.length);
        let eachAddIngredient = document.createElement("li");
        for (k = 0; k < avocadoData[i].missedIngredients.length; k++) {
          console.log(avocadoData[2].missedIngredients[1]);
          eachAddIngredient.innerHTML =
            avocadoData[i].missedIngredients[k].name;
          ingredientsList.appendChild(eachAddIngredient);
        }
      }
      seeMore.addEventListener("click", expand);
    }

    // if (avocadoData[i].missedIngredients.length > 3) {

    // }

    // seeMore.addEventListener("click", expand);
  }

  ingredientsContainer.appendChild(ingredientsList);
  sectionCard.appendChild(ingredientsContainer);

  let instructions = document.createElement("a");
  instructions.innerHTML = "See recipe here";

  for (x = 0; x < recipeData.length; x++) {
    let identifier = avocadoData[i].id;
    if (identifier === recipeData[x].id) {
      instructions.setAttribute("href", recipeData[x].sourceUrl);
    }
  }
  sectionCard.appendChild(instructions);
}
