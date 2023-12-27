const express = require('express');
const axios = require('axios');
const { faker } = require('@faker-js/faker');

const router = express.Router();

const dairyIngredients = ["cream", "cheese", "milk", "butter", "creme", "ricotta", "mozzarella", "custard", "cream cheese", "condensed milk", "heavy cream"];
const glutenIngredients = ["flour", "bread", "spaghetti", "biscuits", "beer"];
const unvegetarianIngredients = ["red snapper", "chicken stock", "lamb loin chops", "chicken thighs", "salmon", "chicken", "beef", "pork", "fish", "shrimp", "lamb", "bacon", "sausage", "cream", "cheese", "milk", "butter", "creme", "ricotta", "mozzarella", "custard", "cream cheese", "condensed milk", "heavy cream", "parmigiano-reggiano"];

router.get('/', (req, res) => {
  res.end();
});

router.get('/recipes/:ingredient', async (req, res) => {
  try {
    const ingredient = req.params.ingredient;
    const apiUrl = `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`;

    const response = await axios.get(apiUrl);
    const responseData = response.data;
    const recipes = await addGifs(filtered(responseData.results)); // Call addGifs and await its result

    const glutenFree = req.query.glutenFree === 'true';
    const dairyFree = req.query.dairyFree === 'true';
    const unvegetarianFree = req.query.unvegetarianFree === 'true';

    const filteredRecipes = recipes.map(recipe => {
      const emailSubject = `Check out this recipe! ${recipe.title}`;
      const emailBody = `You can see the recipe in this video: ${recipe.href}`;

      return {
        ...recipe,
        chef: generateFakerChefName(),
        time: generateBakingTime(15, 45),
        emailSubject,
        emailBody,
      };
    }).filter(recipe => {
      if (glutenFree && recipeContainsGluten(recipe)) {
        return false;
      }

      if (dairyFree && recipeContainsDairy(recipe)) {
        return false;
      }

      if (unvegetarianFree && recipeContainsUnvegetarian(recipe)) {
        return false;
      }

      return true;
    });

    res.status(200).json({ recipes: filteredRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error Occurred' });
  }
});

function recipeContainsGluten(recipe) {
  const ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
  return ingredients.some(ingredient => glutenIngredients.includes(ingredient));
}

function recipeContainsDairy(recipe) {
  const ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
  return ingredients.some(ingredient => dairyIngredients.includes(ingredient));
}

function recipeContainsUnvegetarian(recipe) {
  const ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
  return ingredients.some(ingredient => unvegetarianIngredients.includes(ingredient));
}

function generateFakerChefName() {
  return faker.person.firstName() + ' ' + faker.person.lastName();
}

function generateBakingTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const filtered = function (arr) {
  return arr.map(recipe => ({
    title: recipe.title,
    thumbnail: recipe.thumbnail,
    href: recipe.href,
    ingredients: recipe.ingredients,
    rating: generateFakerRating(),
  }));
}

function generateFakerRating() {
  return faker.datatype.number({ min: 1, max: 5 });
}

async function addGifs(arr) { 
  const gifRequests = arr.map(function (item) {
    let title = item.title;
    let api_key = "Jcg8SsVqryBuTOh96VH3FjPuMN1i6wma";
    let url = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=" + api_key + "limit=1";
    return axios.get(url)
      .then(response => {
        let gifUrl = response.data.data[0].embed_url;
        item.gifUrl = gifUrl;
        return item;
      }).catch(error => {
        console.log(error);
        return item;
      });
  });
  return Promise.all(gifRequests);
}

module.exports = router;
