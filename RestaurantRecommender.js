class RestaurantRecommender {
    // use the values in constructor to create properties that are equal to arguments
    constructor(){//searchFilter){//inquirer, allRestaurants, searchFilter) {
      //this.inquirer = inquirer; // user
      this.allRestaurants = [];// = allRestaurants; // array of all restaurants
      // this.searchFilter = searchFilter; // filter
      // extra main properties
      // uhhhh
      this.allUsers = []; // array of all users
      this.allRatings = []; // array where all ratings go
    }
    // DEBUG / OVERRIDE STUFF
    // toString override
    toString() {
      let printString = "\nRESTAURANTS:\n";
      for (let i = 0; i < this.allRestaurants.length; i++) {
        printString += this.allRestaurants[i].name + " | " + this.allRestaurants[i].cuisine + " | " + this.allRestaurants[i].avgRating + "\n";
      }
      printString += "\nUSERS:\n"
      for (let i = 0; i < this.allUsers.length; i++) {
        printString += this.allUsers[i].name + "\n";
      }
      printString += "\nRATINGS:\n"
      for (let i = 0; i < this.allRatings.length; i++) {
        printString += this.allRatings[i].user.name + " | " + this.allRatings[i].restaurant.name + " | " + this.allRatings[i].score + "\n";
      }
      return printString;
    }
    printHTML() {
        let printString = "<br>RESTAURANTS:<br>";
        for (let i = 0; i < this.allRestaurants.length; i++) {
          printString += this.allRestaurants[i].name + " | " + this.allRestaurants[i].cuisine + " | " + this.allRestaurants[i].avgRating + "<br>";
        }
        printString += "<br>USERS:<br>"
        for (let i = 0; i < this.allUsers.length; i++) {
          printString += this.allUsers[i].name + "<br>";
        }
        printString += "<br>RATINGS:<br>"
        for (let i = 0; i < this.allRatings.length; i++) {
          printString += this.allRatings[i].user.name + " | " + this.allRatings[i].restaurant.name + " | " + this.allRatings[i].score + "<br>";
        }
        return printString;
      }

    // add restaurant
    addRestaurant(name, cuisine) {
      let newRestaurant = new Restaurant(name, cuisine);
      this.allRestaurants.push(newRestaurant);
      console.log("ADDED RESTAURANT: " + this.allRestaurants[this.allRestaurants.length - 1].name);
      console.log(newRestaurant);
      return newRestaurant;
    }
    // add user
    addUser(name) {
      // TODO do we need more properties?
      this.allUsers.push(new User(name));
      console.log("ADDED USER: " + this.allUsers[this.allUsers.length - 1].name);
    }
    // add ratings
    addRating(user, restaurant, score) {
      this.allRatings.push(new Rating(user, restaurant, score));
      console.log("ADDED RATING: " + this.allRatings[this.allRatings.length - 1].user.name + " | " + this.allRatings[this.allRatings.length - 1].restaurant.name + " | " + this.allRatings[this.allRatings.length - 1].score);
    }
    // calculate average rating
    avgRating(restaurant) {
      let ratingSum = 0;
      let totalRatings = 0;
      console.log("CHECKING AVERAGE FOR: " + restaurant.name);
      for (let i = 0; i < this.allRatings.length; i++) {
        console.log("CHECKING AGAINST: " + this.allRatings[i].restaurant.name);
        if (this.allRatings[i].restaurant === restaurant) {
          ratingSum += this.allRatings[i].score;
          totalRatings++;
          console.log("ADD TO SUM");
        }
      }
      console.log("AVERAGE FOR " + restaurant.name + ": " + (ratingSum / totalRatings));
      if (totalRatings === 0) {
        return null; // what to display on UI?
      }
      return ratingSum / totalRatings;
    }
    // find average ratings for all restaurants
    allAvgRatings() {
      for (let i = 0; i < this.allRestaurants.length; i++) {
        this.allRestaurants[i].avgRating = this.avgRating(this.allRestaurants[i]);
      }
    }
  
    // create a function to return the suggested restaurants by applying the filter to the list of all restaurants
    suggestedRestaurants(minStarRating, desiredCuisines) {
      let filter = new Filter(minStarRating, desiredCuisines, this.allRestaurants);
      return filter.prune();
      
  
  
      // return the property of allRestaurants, access it from the property on the instance
      // "this." allows us to access properties in sister functions in a class
      //return this.searchFilter.prune(); // TEST RETURN // TODO: use actual filter eventually (apply it to allRestaurants)
    }
  }
  
  class Filter {
    constructor(minStarRating, desiredCuisines, unfilteredRestaurants) {
      this.minStarRating = minStarRating; // rating
      this.desiredCuisines = desiredCuisines; // array of all categories
      this.unfilteredRestaurants = unfilteredRestaurants; // array of all unfiltered restaurants
    }
    // loops through all unfiltered restaurants and returns only the restaurants that match the minStarRating and desiredCuisines
    prune() {
      let prunedRestaurants = [];
      for (let i = 0; i < this.unfilteredRestaurants.length; i++) {
        console.log("Checking: " + this.unfilteredRestaurants[i].name);
        // check that this restaurant meets the rating and cuisine requirements
        if (this.unfilteredRestaurants[i].avgRating >= this.minStarRating
        && this.desiredCuisines.includes(this.unfilteredRestaurants[i].cuisine)) {
          prunedRestaurants.push(this.unfilteredRestaurants[i]);
          console.log("Added: " + this.unfilteredRestaurants[i].name);
        }
      }
      // DEBUG PRINTING
      console.log("\nSUGGESTED RESTAURANT(S):");
      for (let i = 0; i < prunedRestaurants.length; i++) {
      console.log(prunedRestaurants[i].name);
      }
      return prunedRestaurants;
  
      //return this.unfilteredRestaurants.filter((restaurant) => restaurant.averageRating >= LMAO); // TODO FIGURE OUT HOW THIS ACTUALLY WORKS // r is wat
      //return this.unfilteredRestaurants[0]; // TEST RETURN // TODO: actually prune through all the restaurants
    }
    /*
    condition(restaurant) {
      // LMAO
    }
    */
  }
  
  class Rating {
    constructor(user, restaurant, score) {
      this.user = user; // user
      this.restaurant = restaurant; // restaurant
      this.score = score; // rating 1-5
    }
  }
  
  class User {
    constructor(name) {
      this.name = name;
    }
  }
  
  class Restaurant {
    constructor(name, cuisine) {
      this.name = name; // string
      this.cuisine = cuisine; // category
      this.avgRating = 0; // float
    }
    // no function needed, just a "struct" to hold data
  }
  
  // Add RestaurantRecommender
  const restaurantRecommender = new RestaurantRecommender();
  
  // Add Some Restaurants
  restaurantRecommender.addRestaurant('Chuckey Cheese', 'pizza');//, 3);
  restaurantRecommender.addRestaurant('Fallao', 'ethiopian');//, 5);
  restaurantRecommender.addRestaurant('Taco Time', 'mexican');//, 2);
  restaurantRecommender.addRestaurant('Taqueria Los Pericos', 'mexican');//, 'mexican', 5);
  
  // Add Some Users
  restaurantRecommender.addUser("Blitzy");
  restaurantRecommender.addUser("Bapple");
  restaurantRecommender.addUser("User_234098");
  
  // Add Some Ratings
  restaurantRecommender.addRating(restaurantRecommender.allUsers[0], restaurantRecommender.allRestaurants[0], 4);
  restaurantRecommender.addRating(restaurantRecommender.allUsers[0], restaurantRecommender.allRestaurants[3], 5);
  restaurantRecommender.addRating(restaurantRecommender.allUsers[2], restaurantRecommender.allRestaurants[0], 2);
  restaurantRecommender.addRating(restaurantRecommender.allUsers[2], restaurantRecommender.allRestaurants[2], 2);
  restaurantRecommender.addRating(restaurantRecommender.allUsers[1], restaurantRecommender.allRestaurants[1], 5);
  restaurantRecommender.addRating(restaurantRecommender.allUsers[1], restaurantRecommender.allRestaurants[2], 3);
  restaurantRecommender.addRating(restaurantRecommender.allUsers[1], restaurantRecommender.allRestaurants[3], 5);
  
  // Average Rating
  restaurantRecommender.allAvgRatings();
  //restaurantRecommender.avgRating(restaurantRecommender.allRestaurants[0]);
  
  
  // Add Filter
  //const filter = new Filter(3, 'mexican', restaurants);
  //console.log(filter);
  
  // Test Filter
  restaurantRecommender.suggestedRestaurants(2, 'mexican');
  
  //console.log(restaurantRecommender);
  //console.log(restaurantRecommender.allUsers[0].name);
  //console.log("\n" + restaurantRecommender);
  console.log(restaurantRecommender.toString());
  
  // NOTES: printing allRatings[] doesnt reveal a lot of information since the objects dont have properties, but they exist and work as intended otherwise
  
  
  
  
  
  
  //const restaurants = [chuckeys, fallao, tacoTime, pericos];
  
  
  
  
  
  
  
  
  ////const recommender = new RestaurantRecommender('Modest Mouse', restaurants, LMAO); // TODO LATER
  
  //console.log(filter.prune());




//
// jQuery
//
/*
$(document).ready(function() {
    // jQuery code goes here
    $("button").click(function() {
        $(".print-info").text(""); // clears text before appending
        $(".print-info").append(restaurantRecommender.printHTML()); // appending may be redundant but worry about this later
    });
});
*/

module.exports = RestaurantRecommender;