let loadFood = async()=>{
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'
    let res = await fetch(url);
    let data = await res.json();
    displayMeal(data.meals);
}

let displayMeal = (meals)=>{
    meals.forEach(meal => {
        console.log(meal);
        let {strMealThumb, strMeal, strInstructions }= meal
        let  foodContainer = document.getElementById('foodContainer')
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
            <div class="card-actions justify-end">
                <button
                    class="btn bg-yellow-400 text-black font-semibold border-none hover:bg-slate-300 my-3 sm:my-0">
                    View Details
                </button>
            </div>
        </div>
    </div>
        `;
        let foodTitle = document.getElementById('foodTitle')
        foodTitle.innerHTML = `${meal.strMeal}`
    });
}
// call the loadFood function
loadFood()