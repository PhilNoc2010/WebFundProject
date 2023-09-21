function getVideoID(ytURL){
    //Extracts the Video ID from a given YouTube URL so that the proper embed link can be created
    var idx = ytURL.search("v=") + 2
    var videoID = ytURL.substring(idx,idx + 11)

    return videoID
}

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
    document.getElementById("titleBox").classList.remove("justify-content-center")
    document.getElementById("titleBox").classList.add("justify-content-between")
    document.querySelector("#foodPic").alt = recipeJSON.meals[0].strMeal
    document.querySelector("#foodPic").src = recipeJSON.meals[0].strMealThumb
    document.querySelector("#foodPic").height = 400
    document.querySelector("#foodPic").className = "visible"

    //Assembles the list of ingrediants with the quantity in order to
    // populate the recipe HTML
    var ingredientList = ""
    var ingredientIDX = "0"
    var measureIDX = "0"
    for (var i = 1; i <= 20; i++){
        ingredientIDX = `strIngredient${i}`
        measureIDX = `strMeasure${i}`
        if (recipeJSON.meals[0][ingredientIDX] == "" || recipeJSON.meals[0][ingredientIDX] == null) {break}
        ingredientList = ingredientList + `<li>${recipeJSON.meals[0][measureIDX]} ${recipeJSON.meals[0][ingredientIDX]}</li>`
        }

    document.getElementById("ingredientList").innerHTML = ingredientList

    // some api data is not formatted in a readable way, so these steps will replace periods with
    //new line characters to improve readability

    var text = recipeJSON.meals[0].strInstructions
    var reformattedText = text.replaceAll(". ", ".\n")

    document.getElementById("instructions").innerText = reformattedText

    // if the API returns a Youtube Link, include this on the page
    if (recipeJSON.meals[0].strYoutube != null) {

        document.getElementById("videoContainer").classList.remove("invisible")

        var ytLink = getVideoID(recipeJSON.meals[0].strYoutube)
        var embedLink = `https://www.youtube.com/embed/${ytLink}?controls=0`

       document.getElementById("videoFrame").src = embedLink
       document.getElementById("videoFrame").height = 315

    }

    //if the API Includes a source Link, provide it to the user.  otherwise, this will remain hidden
    if (recipeJSON.meals[0].strSource != null){
        document.getElementById("sourceLink").href = recipeJSON.meals[0].strSource
        document.getElementById("sourceLink").className = "visible"
    }

}


