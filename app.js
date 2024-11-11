let serachbox = document.querySelector(".searchBox");
let searchbtn = document.querySelector(".searchbtn");
let recipecontainer = document.querySelector(".recipe-container");
let recipeDetailsContent = document.querySelector(".recipe-details-content");
let recipeCloseBtn = document.querySelector(".recipe-close-btn");


//function to get recipes
const fetchRecipes = async (query)=>{
    recipecontainer.innerHTML="<h2>Fetching Recipes...</h2>";
    try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
   // console.log(response.meals[0]);

   recipecontainer.innerHTML="";
   response.meals.forEach(meal => {
   // console.log(meal);
   const recipeDiv = document.createElement("div");
   recipeDiv.classList.add('recipe');
   recipeDiv.innerHTML=`<img src = " ${meal.strMealThumb} " > 
               <h3>${meal.strMeal}</h3>
               <p><span>${meal.strArea}</span> Dish</p>
              

   `
   const button = document.createElement('button');
   button.textContent="view Recipe";
   recipeDiv.appendChild(button);
   recipecontainer.appendChild(recipeDiv);

//    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
   //Adding EventListener to recipe button
   button.addEventListener("click",()=>{
    openRecipepopup(meal);
   })
    
   });
}
catch (error){
    recipecontainer.innerHTML="<h2>Error in Fetching Recipes...</h2>"
}
}

const openRecipepopup = (meal) =>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents</h3>
    <ul class="ingredientList">${fetchIngreients(meal)}</h2>
    <div class="recipeinstruction">
        <h3>Instruction</h3>
        <p >${meal.strInstructions}</p>
        </div>

    `
    
    recipeDetailsContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display = "none";
});

//Function to fetch ingredients and measurements
const fetchIngreients = (meal) =>{
    //console.log(meal);
    let ingredientsList = "";
    for(let i=1; i<=20; i++)
    {
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li> ${measure} ${ingredient}`
        }

        else{
            break;
        }
    }
    return ingredientsList;
}

searchbtn.addEventListener("click",(e)=>{
    e.preventDefault();     //for stop the auto submit
    const searchinput = serachbox.value.trim();
    if(!searchinput){
        recipecontainer.innerHTML=`<h2>Type the meal in search box.</h2>`
        return;
    }
    fetchRecipes(searchinput);
    //console.log("button clcked");
})