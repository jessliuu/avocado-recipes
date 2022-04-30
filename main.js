const apikey = "5bb2ba85e71141829b3107f5df442fce";

let body = document.querySelector("body");

let mainContainer = document.createElement("main");
mainContainer.classList.add("row");
body.appendChild(mainContainer);
// const url1 =
//   "https://api.spoonacular.com/recipes/findByIngredients?apiKey=5bb2ba85e71141829b3107f5df442fce&ingredients=avocado&number=100";
// const url2 =
//   "https://api.spoonacular.com/recipes/informationBulk?apiKey=5bb2ba85e71141829b3107f5df442fce&ids=633165%2C%20634048%2C%20648439%2C%201697397%2C%201512847%2C%20715543%2C%20633144%2C%20633160%2C%20650751%2C%20664997%2C%20633157%2C%20649335%2C%20664394%2C%20643455%2C%20633123%2C%20660108%2C%20715521%2C%20780000%2C%20640062%2C%20633132%2C%20645479%2C%20800754%2C%20640959%2C%20650789%2C%20654430%2C%20633120%2C%20633264%2C%20642780%2C%20633141%2C%20650471%2C%20673436%2C%20645988%2C%20663054%2C%201160166%2C%20633126%2C%20632788%2C%20633133%2C%20637999%2C%20643428%2C%20650860%2C%20633117%2C%20633119%2C%20637480%2C%20647608%2C%20650809%2C%20646632%2C%20655785%2C%20665178%2C%20715544%2C%20716437%2C%20633139%2C%20662670%2C%20644593%2C%20658495%2C%20651707%2C%20636676%2C%20643861%2C%20982371%2C%20638593%2C%20645687%2C%20656519%2C%20661431%2C%20635074%2C%20661188%2C%20638741%2C%20640311%2C%20157344%2C%20660024%2C%20661126%2C%20642395%2C%20649343%2C%20657679%2C%201096017%2C%20622825%2C%20660494%2C%20653014%2C%20157399%2C%20795751%2C%20645730%2C%20664501%2C%20633166%2C%20661864%2C%20656723%2C%20653200%2C%20663050%2C%20640990%2C%20637102%2C%20646461%2C%20679509%2C%20469862%2C%20715415%2C%20631912%2C%20651585%2C%20662243%2C%20664595%2C%20650377%2C%20639388%2C%20645608%2C%20664429";

// const fetchDataFunction = (url1, url2) => {
//   fetch(url1)
//     .then((res1) => {
//       console.log("res1 success!", res1);
//       return res1.json();
//     })
//     .then((data1) => {
//       console.log(data1);
//       let fetchAvocadoData = data1;
//       return fetch(url2);
//     })
//     .then((res2) => {
//       console.log("res2 success!", res2);
//       return res2.json();
//     })
//     .then((data2) => {
//       console.log(data2);
//       let fetchRecipeData = data2;
//       // createCards(fetchRecipeData, fetchAvocadoData);
//     })
//     .catch((e) => {
//       console.log("ERROR!", e);
//     });
// };

// fetchDataFunction();

const getDataAsync = async (ingredient) => {
  const url1 = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apikey}&ingredients=${ingredient}&number=4`;
  try {
    const response = await fetch(url1);
    const data = await response.json();
    console.log("data", data);

    let ids = [];
    for (let i = 0; i < data.length; i++) {
      ids.push(data[i].id);
    }
    console.log(ids);

    let url2 = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apikey}&ids=`;
    for (j = 0; j < ids.length; j++) {
      url2 += ids[j] + "%2C%20";
    }
    console.log(url2);
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    console.log("data2", data2);
    // let allData = [data, data2];
    // console.log(allData);
    // return allData;

    createCards(data2, data);
    setEventListener(data2, data);
    createEvent();
  } catch (error) {
    console.log("error", error);
  }
};

//getDataAsync("avocado");

// const controller = async () => {
//   const allData = await getDataAsync();
//   const ingData = allData[0];
//   const recipeData = allData[1];
//   console.log(ingData);
//   createCards(recipeData, ingData);
//   setEventListener(recipeData, ingData);
//   createEvent()
// };

console.log(appleData[2].missedIngredients[1].name);
createCards(appleRecipes, appleData);
// setEventListener(appleRecipes, appleData);

const createEvent = () => {
  let ingredient = "";

  const search = document.getElementById("ing-search");

  search.addEventListener("change", (event) => {
    ingredient = event.target.value;
    console.log("ingredient", ingredient);
  });
  search.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      getDataAsync(ingredient);
    }
  });
};

function createCards(recipeData, avocadoData) {
  mainContainer.innerHTML = "";
  for (i = 0; i < avocadoData.length; i++) {
    for (x = 0; x < recipeData.length; x++) {
      let identifier = avocadoData[i].id;
      if (identifier === recipeData[x].id) {
        //SECTION CARD (PARENT)
        let sectionCard = createSectionCard();
        mainContainer.appendChild(sectionCard);

        //HEADER (CHILD 1)
        let header = createHeader(avocadoData, i);
        sectionCard.appendChild(header);

        //IMAGE (CHILD 2)
        let image = createImage(avocadoData, i);
        sectionCard.appendChild(image);

        //INGREDIENTS (CHILD 3)
        let ingredientsContainer = createIngredient();
        sectionCard.appendChild(ingredientsContainer);

        //Instructions (CHILD 3.1)
        let instructions = createInstructions(avocadoData, i, recipeData);
        ingredientsContainer.appendChild(instructions);
        //Likes (CHILD 3.2)
        let likes = createLikes(avocadoData, i);
        ingredientsContainer.appendChild(likes);

        //Other Ingredients - Text (CHILD 3.3.1)
        let otherIngredientsText = createOtherIngredientsText();
        ingredientsContainer.appendChild(otherIngredientsText);

        //Other Ingredient - first three (CHILD 3.3.2)
        let first3List = createFirst3(avocadoData, i);
        ingredientsContainer.appendChild(first3List);
        // let ingredientsList = createIngredientsList();
        // ingredientsContainer.appendChild(ingredientsList);

        //See More - (Child 3.3.3)
        let seeMoreText = createSeeMoreText(avocadoData, i);
        first3List.appendChild(seeMoreText);
        let hiddenSection = createHiddenSection(avocadoData, i);
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
        let tags = createTags(avocadoData, i, recipeData);
        sectionCard.appendChild(tags);
      }
    }
  }
}

//#region -Components of a card-
function createSectionCard() {
  let sectionCard = document.createElement("section");
  sectionCard.classList.add("col-lg-3");
  sectionCard.classList.add("col-sm-6");
  sectionCard.style.backgroundColor = "#a0d656";
  sectionCard.style.border = "1px solid white";
  // sectionCard.style.borderTop = "0px";
  // sectionCard.style.maxHeight = "40rem";
  sectionCard.style.display = "grid";
  sectionCard.style.gridTemplateRows = "0.5fr 2fr 2fr 0.3fr";
  // sectionCard.style.flexDirection = "column";
  // sectionCard.style.alignItems = "center";
  // sectionCard.style.justifyContent = "flex-end";
  sectionCard.style.padding = "10px";
  return sectionCard;
}

function createHeader(aData, i) {
  let headerContainer = document.createElement("div");
  let h5 = document.createElement("h5");
  if (aData[i].title.length < 35) {
    h5.innerHTML = aData[i].title;
  } else {
    let shortTitle = aData[i].title.split(" ");
    h5.innerHTML = shortTitle.slice(0, 8).join(" ") + "...";
    h5.setAttribute("data-bs-toggle", "tooltip");
    h5.setAttribute("data-bs-placement", "bottom");
    h5.setAttribute("title", aData[i].title);
    $(h5).tooltip();
  }
  // h5.style.color = "#d387ab";
  h5.style.color = "#325a27";
  headerContainer.appendChild(h5);
  headerContainer.style.alignSelf = "center";
  return headerContainer;
}

function createImage(aData, i) {
  let imgContainer = document.createElement("div");
  imgContainer.style.display = "flex";
  imgContainer.style.flexDirection = "column";
  let img = document.createElement("img");
  img.setAttribute("src", aData[i].image);
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

function createLikes(aData, i) {
  let likes = document.createElement("p");
  likes.innerHTML = aData[i].likes + " Likes";
  return likes;
}

function createTags(aData, i, rData) {
  let tags = document.createElement("p");
  tags.innerHTML = "Tags: &nbsp";
  tags.style.fontSize = "small";

  for (x = 0; x < rData.length; x++) {
    let identifier = aData[i].id;
    if (identifier === rData[x].id) {
      if (
        rData[x].vegetarian === false &&
        rData[x].vegan === false &&
        rData[x].glutenFree === false &&
        rData[x].dairyFree === false
      ) {
        tags.innerHTML += "N/A";
      } else if (rData[x].vegetarian === true) {
        tags.innerHTML +=
          '<img src="https://cdn-icons.flaticon.com/png/512/3463/premium/3463358.png?token=exp=1650558165~hmac=2f8e03cd7eaf344710a7f9cdde9f7780" width="25px"> &nbsp';
      }
      if (rData[x].vegan === true) {
        tags.innerHTML +=
          '<img src="https://cdn-icons.flaticon.com/png/512/5769/premium/5769063.png?token=exp=1650558135~hmac=5bb33e6a6c8d13633f8240903c5a2b05" width="25px"> &nbsp';
      }
      if (rData[x].glutenFree === true) {
        tags.innerHTML +=
          '<img src="https://cdn-icons.flaticon.com/png/512/4905/premium/4905936.png?token=exp=1650557905~hmac=4ef73e036ef032071907bec917029dad" width="25px"> &nbsp ';
      }
      if (rData[x].dairyFree === true) {
        tags.innerHTML +=
          '<img src="https://cdn-icons.flaticon.com/png/512/4905/premium/4905942.png?token=exp=1650557979~hmac=5926bf662a65cfc1e66acbb0b111fd2b" width="25px"> &nbsp';
      }
    }
  }
  return tags;
}

function createInstructions(aData, i, rData) {
  let instructions = document.createElement("a");
  instructions.style.alignSelf = "center";
  instructions.innerHTML = "See recipe here";
  instructions.style.color = "white";
  instructions.style.paddingBottom = "2px";

  instructions.setAttribute("href", rData[x].sourceUrl);

  return instructions;
}

function createFirst3(aData, i) {
  let first3List = document.createElement("ul");
  for (j = 0; j < 3; j++) {
    let first3 = document.createElement("li");
    first3.innerHTML = aData[i].missedIngredients[j].name;
    first3List.appendChild(first3);
  }
  return first3List;
}

function createSeeMoreText(aData, i) {
  let seeMoreText = document.createElement("p");
  if (aData[i].missedIngredients.length > 3) {
    seeMoreText.classList.add("leading");
    seeMoreText.innerHTML = "And more... 	&#8964;";
    seeMoreText.style.opacity = "70%";
  }
  return seeMoreText;
}

function createHiddenSection(aData, i) {
  let hiddenSection = document.createElement("div");
  hiddenSection.classList.add("hidden-section");

  for (j = 3; j < aData[i].missedIngredients.length; j++) {
    let ingHiddenSection = document.createElement("li");
    ingHiddenSection.innerHTML = aData[i].missedIngredients[j].name;
    hiddenSection.appendChild(ingHiddenSection);
  }
  return hiddenSection;
}
//#endregion

function createDropDown() {
  const dropDown = document.getElementById("tags");
  const diets = ["Dairy Free", "Gluten Free", "Vegan", "Vegetarian"];
  diets.forEach((diet) => {
    let option = document.createElement("option");
    option.innerHTML = diet;
    option.value = diet;
    dropDown.appendChild(option);
  });
}

function setEventListener(rData, aData) {
  let dropdown = document.querySelector(".tags");
  dropdown.addEventListener("change", (event) => {
    filterByDropDown(rData, aData);
  });
}

function filterByDropDown(rData, aData) {
  let filteredData = [];
  const dropDownValue = document.querySelector(".tags").value;
  if (dropDownValue === "Vegetarian") {
    filteredData = rData.filter((r) => {
      return r.vegetarian === true;
    });
  } else if (dropDownValue === "Vegan") {
    filteredData = rData.filter((r) => {
      return r.vegan === true;
    });
  } else if (dropDownValue === "Gluten Free") {
    filteredData = rData.filter((r) => {
      return r.glutenFree === true;
    });
  } else if (dropDownValue === "Dairy Free") {
    filteredData = rData.filter((r) => {
      return r.dairyFree === true;
    });
  } else if (dropDownValue === "all") {
    filteredData = rData;
  }
  console.log(filteredData);

  createCards(filteredData, aData);
}
