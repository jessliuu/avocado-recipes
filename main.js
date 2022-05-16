console.log(recipeData[0]);
const apikey = "5bb2ba85e71141829b3107f5df442fce";

let main = document.querySelector("main");

let mainContainer = document.createElement("div");
mainContainer.classList.add("row");
main.appendChild(mainContainer);

//#region REQ 1: Dynamic Fetch
const getDataAsync = async (ingredient) => {
  const loader = document.querySelector(".loader");
  loader.classList.remove("invisible");
  let url1 = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&includeIngredients=${ingredient}&query=salad&number=20`;
  try {
    let response = await fetch(url1);
    let data = await response.json();
    let ingData = data.results;
    console.log("data1", ingData);

    let ids = [];
    for (let i = 0; i < ingData.length; i++) {
      ids.push(ingData[i].id);
    }

    let randomids = ids.sort(() => 0.5 - Math.random());

    let selectedids = randomids.slice(0, 8);

    // let data2 = [];
    // if (data1) {
    let url2 = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apikey}&ids=`;
    for (j = 0; j < selectedids.length; j++) {
      url2 += selectedids[j] + "%2C%20";
    }
    const response2 = await fetch(url2);
    let recipeData = await response2.json();
    console.log("data2", recipeData);
    // }
    return { recipeData, ingData };
  } catch (error) {
    console.log("error", error);
  }
};
//#endregion

//#region REQ 2: Event that triggers dynamic fetch
const createEvent = () => {
  let ingredient = "";

  let search = document.getElementById("ing-search");

  search.addEventListener("change", (event) => {
    ingredient = event.target.value;
    console.log("ingredient", ingredient);
  });
  search.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      controller(ingredient);
    }
  });
};
//#endregion

//#region REQ 3: Combine filters
function setEventListener(rData, aData) {
  let checkboxes = document.querySelector(".dietContainer");
  let selectedMinutes = document.querySelector(".minutes");

  checkboxes.addEventListener("change", (event) => {
    // filterByDiet(rData, aData);
    let filteredRecipes = filterByDiet(rData, aData);
    selectedMinutes.addEventListener("change", (event) => {
      filterByMinutes(filteredRecipes, aData);
    });
  });

  selectedMinutes.addEventListener("change", (event) => {
    // filterByMinutes(rData, aData);
    let filteredMinutes = filterByMinutes(rData, aData);
    checkboxes.addEventListener("change", (event) => {
      filterByDiet(filteredMinutes, aData);
    });
  });
}
//#endregion

//#region REQ 3.1: First filter by diet
function filterByDiet(rData, aData) {
  let myCheckedBoxes = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((checked) => checked.value);
  console.log(myCheckedBoxes);

  let filteredRecipes = [];

  for (let i = 0; i < rData.length; i++) {
    if (myCheckedBoxes.every((e) => rData[i].diets.includes(e))) {
      filteredRecipes.push(rData[i]);
    }
  }
  console.log(filteredRecipes);
  createCards(filteredRecipes, aData);
  return filteredRecipes;
}
//#endregion

//#region REQ 3.2: Second filter by time
function filterByMinutes(rData, aData) {
  let filteredMinutes = rData;
  const selectedMinutes = document.querySelector(".minutes").value;

  if (selectedMinutes === "lessThan30") {
    filteredMinutes = rData.filter((r) => {
      return r.readyInMinutes < 31;
    });
  } else if (selectedMinutes === "lessThan60") {
    filteredMinutes = rData.filter((r) => {
      return r.readyInMinutes > 30 && r.readyInMinutes < 61;
    });
  } else if (selectedMinutes === "lessThan120") {
    filteredMinutes = rData.filter((r) => {
      return r.readyInMinutes > 60 && r.readyInMinutes < 121;
    });
  } else if (selectedMinutes === "all") {
    filteredMinutes = rData;
  }
  console.log(filteredMinutes);
  createCards(filteredMinutes, aData);
  return filteredMinutes;
}
//#endregion

//#region REQ 4: Display cards
function createCards(recipeData, avocadoData) {
  const loader = document.querySelector(".loader");
  loader.classList.add("invisible");

  mainContainer.innerHTML = "";

  let search = document.getElementById("ing-search");
  search.value = "";
  // search.setAttribute("placeholder", "Search...");

  for (i = 0; i < avocadoData.length; i++) {
    for (x = 0; x < recipeData.length; x++) {
      let identifier = avocadoData[i].id;
      if (identifier === recipeData[x].id) {
        //SECTION CARD (PARENT)
        let sectionCard = createSectionCard();
        mainContainer.appendChild(sectionCard);

        // //HEADER (CHILD 1)
        let header = createHeader(avocadoData, i);
        sectionCard.appendChild(header);

        // //IMAGE (CHILD 2)
        let image = createImage(avocadoData, i);
        sectionCard.appendChild(image);

        // //INGREDIENTS (CHILD 3)
        let ingredientsContainer = createIngredient();
        sectionCard.appendChild(ingredientsContainer);

        // //Instructions (CHILD 3.1)
        let instructions = createInstructions(recipeData);
        ingredientsContainer.appendChild(instructions);
        //Likes (CHILD 3.2)
        let likes = createLikes(recipeData, x);
        ingredientsContainer.appendChild(likes);

        // //Other Ingredients - Text (CHILD 3.3.1)
        let otherIngredientsText = createOtherIngredientsText();
        ingredientsContainer.appendChild(otherIngredientsText);

        // // Other Ingredient - first three (CHILD 3.3.2)
        let first3List = createFirst3(recipeData);
        ingredientsContainer.appendChild(first3List);

        // // See More - (Child 3.3.3)
        let seeMoreText = createSeeMoreText(recipeData);
        first3List.appendChild(seeMoreText);
        let hiddenSection = createHiddenSection(recipeData);
        seeMoreText.appendChild(hiddenSection);

        seeMoreText.addEventListener("click", expand);

        function expand() {
          hiddenSection.classList.toggle("reveal");
          // if (hiddenSection.classList.contains("reveal")) {
          //   hiddenSection.classList.remove("reveal");
          // } else {
          //   hiddenSection.classList.add("reveal");
          // }
        }

        // //Tags (CHILD 4)
        let tags = createTags(recipeData);
        sectionCard.appendChild(tags);
      }
    }
  }
}
//#endregion

//#region REQ 4.1: Components of a card
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
  otherIngredientsText.innerHTML = "You will need:";
  return otherIngredientsText;
}

function createLikes(rData, x) {
  let likes = document.createElement("p");
  likes.innerHTML = rData[x].aggregateLikes + " &#128077;";
  return likes;
}

function createTags(rData) {
  let tags = document.createElement("p");
  tags.innerHTML = "Tags: &nbsp";
  tags.style.fontSize = "small";

  if (
    rData[x].vegetarian === false &&
    rData[x].vegan === false &&
    rData[x].glutenFree === false &&
    rData[x].dairyFree === false
  ) {
    tags.innerHTML += "N/A";
  } else if (rData[x].vegetarian === true) {
    tags.innerHTML += '<img src="./vegetarian.png" width="25px"> &nbsp';
  }
  if (rData[x].vegan === true) {
    tags.innerHTML += '<img src="./vegan.png" width="25px"> &nbsp';
  }
  if (rData[x].glutenFree === true) {
    tags.innerHTML += '<img src="./gluten.png" width="25px"> &nbsp ';
  }
  if (rData[x].dairyFree === true) {
    tags.innerHTML += '<img src="./dairy.png" width="25px"> &nbsp';
  }
  return tags;
}

function createInstructions(recipeData) {
  let instructions = document.createElement("a");
  instructions.style.alignSelf = "center";
  instructions.innerHTML = "See recipe here";
  instructions.style.color = "white";
  instructions.style.paddingBottom = "2px";

  instructions.setAttribute("href", recipeData[x].spoonacularSourceUrl);

  return instructions;
}

function createFirst3(rData) {
  let first3List = document.createElement("ul");
  let numberOfMissingIng = 3;
  if (rData[x].extendedIngredients.length < 3) {
    numberOfMissingIng = rData[x].extendedIngredients.length;
  }
  for (j = 0; j < numberOfMissingIng; j++) {
    let first3 = document.createElement("li");
    first3.innerHTML = rData[x].extendedIngredients[j].name;
    first3List.appendChild(first3);
  }
  return first3List;
}

function createSeeMoreText(rData) {
  let seeMoreText = document.createElement("p");
  if (rData[x].extendedIngredients.length > 3) {
    seeMoreText.classList.add("leading");
    seeMoreText.innerHTML = "And more... 	&#8964;";
    seeMoreText.style.opacity = "70%";
  }
  return seeMoreText;
}

function createHiddenSection(rData) {
  let hiddenSection = document.createElement("div");
  hiddenSection.classList.add("hidden-section");
  let numberOfHiddenIng = 6;
  if (rData[x].extendedIngredients.length < 6) {
    numberOfHiddenIng = rData[x].extendedIngredients.length - 3;
  }
  for (j = 3; j < numberOfHiddenIng; j++) {
    let ingHiddenSection = document.createElement("li");
    ingHiddenSection.innerHTML = rData[x].extendedIngredients[j].name;
    hiddenSection.appendChild(ingHiddenSection);
  }
  return hiddenSection;
}
//#endregion

//#region REQ 5: Controller function
const controller = async (ingredient) => {
  const allData = await getDataAsync(ingredient);
  console.log(allData);
  createCards(allData.recipeData, allData.ingData);
  setEventListener(allData.recipeData, allData.ingData);
};

controller("avocado");
createEvent();
//#endregion

//#region other things that were attempted
// FETCH/THEN - NOT USING ASYNC/AWAIT
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

//TESTING USING LOCAL DATA
// createCards(recipeData, avocadoData);

// setEventListener(recipeData, avocadoData);
// createEvent();

// DROPDOWN FILTER (REPLACED WITH CHECKBOXES REQ 3.1)
// function filterByDropDown(rData, aData) {
//   const dropDownValue = document.querySelector(".tags").value;
//   let filteredrData = rData.filter((r) => {
//     return (
//       dropDownValue === "all" ||
//       (dropDownValue === "Vegetarian" && r.vegetarian === true) ||
//       (dropDownValue === "Vegan" && r.vegan === true) ||
//       (dropDownValue === "Gluten Free" && r.glutenFree === true) ||
//       (dropDownValue === "Dairy Free" && r.dairyFree === true)
//     );
//   });
//   createCards(filteredrData, aData);
// }
//#endregion
