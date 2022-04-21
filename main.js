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

//
//
//START HERE

for (i = 1; i < avocadoData.length; i++) {
  //SECTION CARD (PARENT)
  let sectionCard = document.createElement("section");
  sectionCard.classList.add("col-md-3");
  sectionCard.classList.add("col-sm-6");
  sectionCard.style.border = "1px solid #d387ab";
  sectionCard.style.borderTop = "0px";
  sectionCard.style.display = "flex";
  sectionCard.style.flexDirection = "column";
  sectionCard.style.alignItems = "center";
  sectionCard.style.justifyContent = "flex-end";
  sectionCard.style.padding = "10px";

  //HEADER (CHILD 1)
  let headerContainer = document.createElement("div");
  let h5 = document.createElement("h5");
  h5.innerHTML = avocadoData[i].title;
  h5.style.color = "#d387ab";

  //IMAGE (CHILD 2)
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

  //INGREDIENTS (CHILD 3)

  let ingredientsContainer = document.createElement("div");
  ingredientsContainer.classList.add("align-self-sm-start");
  ingredientsContainer.classList.add("align-self-xxl-center");

  //Likes (CHILD 3.2)
  let likes = document.createElement("p");
  likes.innerHTML = avocadoData[i].likes + " Likes";
  ingredientsContainer.appendChild(likes);

  //Other Ingredientss (CHILD 3.3)
  let otheringredients = document.createElement("p");
  otheringredients.innerHTML = "Other ingredients:";
  ingredientsContainer.appendChild(otheringredients);

  //Other Ingredient List (CHILD 3.3.1)
  let ingredientsList = document.createElement("ul");

  if (avocadoData[i].missedIngredients.length > 3) {
    let seeMore = document.createElement("p");
    seeMore.classList.add("leading");
    seeMore.innerHTML = "And more... 	&#8964;";
    seeMore.style.opacity = "70%";
    ingredientsList.appendChild(seeMore);
    for (j = 0; j < avocadoData[i].missedIngredients.length; j++) {
      if (j < 3) {
        let eachIngredient = document.createElement("li");
        eachIngredient.innerHTML = avocadoData[i].missedIngredients[j].name;
        ingredientsList.appendChild(eachIngredient);
      } else {
        let moreThan3ing = [];
        moreThan3ing.push(avocadoData[i].missedIngredients[j].name);
        let hiddenSection = document.createElement("p");
        hiddenSection.classList.add("hidden-section");
        hiddenSection.innerHTML = moreThan3ing;
        seeMore.appendChild(hiddenSection);
        // hiddenSection.style.display = "none";

        function expand() {
          if (hiddenSection.classList.contains("reveal")) {
            hiddenSection.classList.remove("reveal");
          } else {
            hiddenSection.classList.add("reveal");
          }
        }
        seeMore.addEventListener("click", expand);
      }
    }
  } else {
    for (j = 0; j < avocadoData[i].missedIngredients.length; j++) {
      let eachIngredient = document.createElement("li");
      eachIngredient.innerHTML = avocadoData[i].missedIngredients[j].name;
      ingredientsList.appendChild(eachIngredient);
    }
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

  //Tags (CHILD 3.1)
  let tags = document.createElement("p");
  tags.innerHTML = "</br>Tags: ";

  for (x = 0; x < recipeData.length; x++) {
    let identifier = avocadoData[i].id;
    // let strOfTags = []
    if (identifier === recipeData[x].id) {
      if (
        recipeData[x].vegetarian === false &&
        recipeData[x].vegan === false &&
        recipeData[x].glutenFree === false &&
        recipeData[x].dairyFree === false
      ) {
        tags.innerHTML += "N/A";
      } else if (recipeData[x].vegetarian === true) {
        tags.innerHTML +=
          'Vegetarian <img src="https://cdn-icons.flaticon.com/png/512/3463/premium/3463358.png?token=exp=1650558165~hmac=2f8e03cd7eaf344710a7f9cdde9f7780" width="25px">';
      }
      if (recipeData[x].vegan === true) {
        tags.innerHTML +=
          'Vegan <img src="https://cdn-icons.flaticon.com/png/512/5769/premium/5769063.png?token=exp=1650558135~hmac=5bb33e6a6c8d13633f8240903c5a2b05" width="25px"> ';
      }
      if (recipeData[x].glutenFree === true) {
        tags.innerHTML +=
          'Gluten Free <img src="https://cdn-icons.flaticon.com/png/512/4905/premium/4905936.png?token=exp=1650557905~hmac=4ef73e036ef032071907bec917029dad" width="25px">  ';
      }
      if (recipeData[x].dairyFree === true) {
        tags.innerHTML +=
          'Diary Free <img src="https://cdn-icons.flaticon.com/png/512/4905/premium/4905942.png?token=exp=1650557979~hmac=5926bf662a65cfc1e66acbb0b111fd2b" width="25px">';
      }
    }
  }
  sectionCard.appendChild(tags);
}
