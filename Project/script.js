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

    }
