console.log(avocadoData);
console.log(recipeData);
console.log(avocadoData[2].id);
console.log(recipeData[1].id);

if (avocadoData[2].id === recipeData[1].id) {
  console.log(avocadoData[2].id);
}

let body = document.querySelector("body");
body.classList.add("container-fluid");

let nav = document.querySelector("nav");
nav.style.display = "flex";
nav.style.alignItems = "center";

let mainContainer = document.createElement("main");
mainContainer.classList.add("row");
// mainContainer.style.display = "flex";
// mainContainer.style.justifyContent = "space-evenly";
body.appendChild(mainContainer);

//
//

function createCards() {
  for (i = 1; i < recipeData.length; i++) {
    //SECTION CARD (PARENT)
    let sectionCard = createSectionCard();
    mainContainer.appendChild(sectionCard);

    //HEADER (CHILD 1)
    let header = createHeader();
    sectionCard.appendChild(header);

    //IMAGE (CHILD 2)
    let image = createImage();
    sectionCard.appendChild(image);

    //INGREDIENTS (CHILD 3)
    let ingredientsContainer = createIngredient();
    sectionCard.appendChild(ingredientsContainer);

    //Instructions (CHILD 3.3)
    let instructions = createInstructions();
    ingredientsContainer.appendChild(instructions);
    //Likes (CHILD 3.1)
    let likes = createLikes();
    ingredientsContainer.appendChild(likes);

    //Other Ingredients - Text (CHILD 3.2.1)
    let otherIngredientsText = createOtherIngredientsText();
    ingredientsContainer.appendChild(otherIngredientsText);

    //Other Ingredient - first three (CHILD 3.2.2)
    let first3List = createFirst3();
    ingredientsContainer.appendChild(first3List);
    // let ingredientsList = createIngredientsList();
    // ingredientsContainer.appendChild(ingredientsList);

    //See More - (Child 3.2.3)
    let seeMoreText = createSeeMoreText();
    first3List.appendChild(seeMoreText);
    let hiddenSection = createHiddenSection();
    seeMoreText.appendChild(hiddenSection);

    seeMoreText.addEventListener("click", expand);

    function expand() {
      if (hiddenSection.classList.contains("reveal")) {
        hiddenSection.classList.remove("reveal");
      } else {
        hiddenSection.classList.add("reveal");
      }
    }

    //Tags (CHILD 4)
    let tags = createTags();
    sectionCard.appendChild(tags);
  }
}

createCards();

function createSectionCard() {
  let sectionCard = document.createElement("section");
  sectionCard.classList.add("col-lg-3");
  sectionCard.classList.add("col-sm-6");
  sectionCard.style.border = "1px solid #d387ab";
  sectionCard.style.borderTop = "0px";
  // sectionCard.style.maxHeight = "40rem";
  sectionCard.style.display = "grid";
  sectionCard.style.gridTemplateRows = "0.5fr 2fr 2fr 0.3fr";
  // sectionCard.style.flexDirection = "column";
  // sectionCard.style.alignItems = "center";
  // sectionCard.style.justifyContent = "flex-end";
  sectionCard.style.padding = "10px";
  return sectionCard;
}

function createHeader() {
  let headerContainer = document.createElement("div");
  let h5 = document.createElement("h5");
  if (avocadoData[i].title.length < 35) {
    h5.innerHTML = avocadoData[i].title;
  } else {
    let shortTitle = avocadoData[i].title.split(" ");
    h5.innerHTML = shortTitle.slice(0, 8).join(" ") + "...";
    h5.setAttribute("data-bs-toggle", "tooltip");
    h5.setAttribute("data-bs-placement", "bottom");
    h5.setAttribute("title", avocadoData[i].title);
    $(h5).tooltip();
  }
  h5.style.color = "#d387ab";
  headerContainer.appendChild(h5);
  headerContainer.style.alignSelf = "center";
  return headerContainer;
}

function createImage() {
  let imgContainer = document.createElement("div");
  imgContainer.style.display = "flex";
  imgContainer.style.flexDirection = "column";
  let img = document.createElement("img");
  img.setAttribute("src", avocadoData[i].image);
  img.classList.add("img-fluid");
  img.style.alignSelf = "center";
  imgContainer.appendChild(img);
  return imgContainer;
}

function createIngredient() {
  let ingredientsContainer = document.createElement("div");
  // ingredientsContainer.classList.add("align-self-sm-start");
  ingredientsContainer.style.display = "flex";
  ingredientsContainer.style.flexDirection = "column";
  return ingredientsContainer;
}
function createOtherIngredientsText() {
  let otherIngredientsText = document.createElement("p");
  otherIngredientsText.innerHTML = "Other ingredients:";
  return otherIngredientsText;
}

function createLikes() {
  let likes = document.createElement("p");
  likes.innerHTML = avocadoData[i].likes + " Likes";
  return likes;
}

function createTags() {
  let tags = document.createElement("p");
  tags.innerHTML = "Tags: &nbsp";
  tags.style.fontSize = "small";

  for (x = 0; x < recipeData.length; x++) {
    let identifier = avocadoData[i].id;
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
          '<img src="https://cdn-icons.flaticon.com/png/512/3463/premium/3463358.png?token=exp=1650558165~hmac=2f8e03cd7eaf344710a7f9cdde9f7780" width="25px"> &nbsp';
      }
      if (recipeData[x].vegan === true) {
        tags.innerHTML +=
          '<img src="https://cdn-icons.flaticon.com/png/512/5769/premium/5769063.png?token=exp=1650558135~hmac=5bb33e6a6c8d13633f8240903c5a2b05" width="25px"> &nbsp';
      }
      if (recipeData[x].glutenFree === true) {
        tags.innerHTML +=
          '<img src="https://cdn-icons.flaticon.com/png/512/4905/premium/4905936.png?token=exp=1650557905~hmac=4ef73e036ef032071907bec917029dad" width="25px"> &nbsp ';
      }
      if (recipeData[x].dairyFree === true) {
        tags.innerHTML +=
          '<img src="https://cdn-icons.flaticon.com/png/512/4905/premium/4905942.png?token=exp=1650557979~hmac=5926bf662a65cfc1e66acbb0b111fd2b" width="25px"> &nbsp';
      }
    }
  }
  return tags;
}

function createInstructions() {
  let instructions = document.createElement("a");
  instructions.style.alignSelf = "center";
  instructions.innerHTML = "See recipe here";
  instructions.style.paddingBottom = "2px";

  for (x = 0; x < recipeData.length; x++) {
    let identifier = avocadoData[i].id;
    if (identifier === recipeData[x].id) {
      instructions.setAttribute("href", recipeData[x].sourceUrl);
    }
  }
  return instructions;
}

function createFirst3() {
  let first3List = document.createElement("ul");
  for (j = 0; j < 3; j++) {
    let first3 = document.createElement("li");
    first3.innerHTML = avocadoData[i].missedIngredients[j].name;
    first3List.appendChild(first3);
  }
  return first3List;
}

function createSeeMoreText() {
  let seeMoreText = document.createElement("p");
  if (avocadoData[i].missedIngredients.length > 3) {
    seeMoreText.classList.add("leading");
    seeMoreText.innerHTML = "And more... 	&#8964;";
    seeMoreText.style.opacity = "70%";
  }
  return seeMoreText;
}

function createHiddenSection() {
  let hiddenSection = document.createElement("div");
  hiddenSection.classList.add("hidden-section");

  for (j = 3; j < avocadoData[i].missedIngredients.length; j++) {
    let ingHiddenSection = document.createElement("li");
    ingHiddenSection.innerHTML = avocadoData[i].missedIngredients[j].name;
    hiddenSection.appendChild(ingHiddenSection);
  }
  return hiddenSection;
}
