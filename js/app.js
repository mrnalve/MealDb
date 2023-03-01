let loadFood = async (mealName) => {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  let res = await fetch(url);
  let data = await res.json();
  displaySixMeal(data.meals);
};

// search specific food
let searchBtn = () => {
  let searchField = document.getElementById("searchField");
  let searchFieldValue = searchField.value;
  loadFood(searchFieldValue);
};

// show 6 meal in card
let displaySixMeal = (meals) => {
  let foodContainer = document.getElementById("foodContainer");
  foodContainer.innerHTML = "";
  // console.log(meals);
  let noFoundAlert = document.getElementById("noFoundAlert");
  if (meals == null) {
    noFoundAlert.style.display = "block";
    return;
  } else {
    noFoundAlert.style.display = "none";
  }
  meals.forEach((meal) => {
    let { strMealThumb, strMeal, strInstructions, idMeal } = meal;
    foodContainer.innerHTML += `
        <div class="card card-side bg-base-100 shadow-2xl w-[45%]">
        <figure>
            <img class="w-60 h-80 image-full" src="${strMealThumb}" alt="Movie" />
        </figure>
        <div class="card-body w-40">
            <h2 id="foodTitle" class="card-titlen text-2xl text-slate-600 font-bold">
                ${strMeal}
            </h2>
            <p class="text-xl text-slate-500 font-light">
                ${strInstructions.slice(0, 120)}...
            </p>
            <!-- The button to open modal -->
            <div class="card-actions justify-end">
                <label onclick="loadDetails('${idMeal}')"
                for="my-modal" class="btn bg-yellow-400 text-black font-semibold border-none hover:bg-slate-300 my-3 sm:my-0">
                    View Details
                </label>
            </div>
        </div>
    </div>
        `;
    let foodTitle = document.getElementById("foodTitle");
    foodTitle.innerHTML = `${meal.strMeal}`;
  });
};

// load details
let loadDetails = (foodId) => {
  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => modalDisplay(data.meals[0]));
};
// display all details with modal
let modalDisplay = (meals) => {
  let modalBox = document.getElementById("modalBox");
  modalBox.innerHTML = ""; // clear previous content
  let modalDiv = document.createElement("div");
  let {
    strMealThumb,
    strCategory,
    strArea,
    strMeal,
    strInstructions,
    strYoutube,
  } = meals;
  modalDiv.innerHTML = `
            <h2 id="foodTitle" class="card-titlen text-2xl text-slate-600 font-bold mb-3">
                ${strMeal}
            </h2>
            <figure>
                <img class="w-full h-72" src="${strMealThumb}" alt="Movie" />
            </figure>
            <p class="text-xl font-semibold text-slate-900 my-2">Category: <span class="font-normal text-gray-900 text-[16px]">${strCategory}</span></p>
            <p class="text-xl font-semibold text-slate-900">Area : <span class="font-normal text-gray-900 text-[16px]">${strArea}</span></p>
            <p class="text-xl font-semibold text-slate-900 my-2">Instructions : <span class="font-normal text-gray-900 text-[16px]">${strInstructions}</span></p>
            <p class="text-xl font-semibold text-slate-900 mb-2">Youtube : <span class="font-normal text-gray-900 text-[16px]">${strYoutube}</span></p>
            <div class="modal-action">
                <label for="my-modal" class="btn">Close</label>
            </div>
    `;
  modalBox.appendChild(modalDiv);
};
// call the loadFood function
loadFood("fish");

// press enter and show the meals
document.getElementById("searchField").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchBtn();
  }
});
