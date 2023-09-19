async function getRandomRecipe(ingredient){

    if (ingredient == "idk") {
        var recipeURL = "https://www.themealdb.com/api/json/v1/1/random.php"
    }
    else {
        var recipeURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredient}`

        var response = await fetch(recipeURL)
        var recipeJSON = await response.json()

        RecipeID = Math.floor((Math.random()*recipeJSON.meals.length)) // determines the number of returned recipes in order to return one at random
        RecipeIDCode = recipeJSON.meals[RecipeID].idMeal

        recipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${RecipeIDCode}`
    }

    response = await fetch(recipeURL)
    recipeJSON = await response.json()

    console.log (recipeJSON)

    //This section of the function will update the HTML on the webpage
    document.querySelector("#recipeTitle").innerText = recipeJSON.meals[0].strMeal
    document.querySelector("#foodPic").alt = recipeJSON.meals[0].strMeal
    document.querySelector("#foodPic").src = recipeJSON.meals[0].strMealThumb
    document.querySelector("#foodPic").className = "visible"

    //Assembles the list of ingrediants with the quantity in order to
    // populate the recipe HTML
    var ingredientList = ""
    var ingredientIDX = "0"
    var measureIDX = "0"
    for (var i = 1; i <= 20; i++){
        ingredientIDX = `strIngredient${i}`
        measureIDX = `strMeasure${i}`

        if (recipeJSON.meals[0][ingredientIDX] == "") {break}

        console.log(recipeJSON.meals[0][ingredientIDX] )

        // ingredientList = ingredientList + `${recipeJSON.meals[0][measureIDX]} ${recipeJSON.meals[0][ingredientIDX]} \n`
        ingredientList = ingredientList + `<li>${recipeJSON.meals[0][measureIDX]} ${recipeJSON.meals[0][ingredientIDX]}</li>`
        }

    document.getElementById("ingredientList").innerHTML = ingredientList

    document.getElementById("instructions").innerText = recipeJSON.meals[0].strInstructions

    //if the API returns a Youtube Link, include this on the page
    // if (recipeJSON.meals[0].strYoutube != null) {
    //     document.getElementById("videoContainer").classList.remove("invisible")
    //     document.getElementById("videoFrame").src = recipeJSON.meals[0].strYoutube
    // }


    //if the API Includes a source Link, provide it to the user.  otherwise, this will remain hidden
    if (recipeJSON.meals[0].strSource != null){
        document.getElementById("sourceLink").href = recipeJSON.meals[0].strSource
        document.getElementById("sourceLink").className = "visible"
    }

}
