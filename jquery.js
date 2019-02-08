$(document).ready(function() {
    // jQuery code goes here
    $(".button-info").click(function() { // INFO
        $(".print-info").text(""); // clears text before appending
        $(".print-info").append(restaurantRecommender.printHTML()); // appending may be redundant but worry about this later
    });
    $(".button-recommend").click(function() { // RECOMMENDATION 1
        $(".print-recommend").text(""); // clears text before appending
        $(".print-recommend").append(restaurantRecommender.suggestedRestaurants(3, 'mexican')[0].name); // appending may be redundant but worry about this later
    });
    $(".button-recommend-2").click(function() { // RECOMMENDATION 2
      $(".print-recommend-2").text(""); // clears text before appending
      $(".print-recommend-2").append(restaurantRecommender.suggestedRestaurants(2, ['mexican', 'pizza'])[0].name + "<br>"); // appending may be redundant but worry about this later
      $(".print-recommend-2").append(restaurantRecommender.suggestedRestaurants(2, ['mexican', 'pizza'])[1].name + "<br>");
      $(".print-recommend-2").append(restaurantRecommender.suggestedRestaurants(2, ['mexican', 'pizza'])[2].name + "<br>");
    });
    $(".button-add").click(function() { // ADD RESTAURANT AND RATINGS
        $(".print-add").text(""); // clears text before appending
        $(".print-add").append(restaurantRecommender.addRestaurant('Pizza Express', 'pizza')); // appending may be redundant but worry about this later
        $(".print-recommend-2").append(restaurantRecommender.addRating(restaurantRecommender.allUsers[0], restaurantRecommender.allRestaurants[4], 5));
        $(".print-recommend-2").append(restaurantRecommender.addRating(restaurantRecommender.allUsers[2], restaurantRecommender.allRestaurants[4], 4));
        $(".print-recommend-2").append(restaurantRecommender.allAvgRatings());
        // REFRESH OTHER BUTTONS
        $(".print-info").text(""); // clears text before appending
        $(".print-info").append(restaurantRecommender.printHTML()); // appending may be redundant but worry about this later
        //
        $(".print-recommend-2").text(""); // clears text before appending
        $(".print-recommend-2").append(restaurantRecommender.suggestedRestaurants(2, ['mexican', 'pizza'])[0].name + "<br>"); // appending may be redundant but worry about this later
        $(".print-recommend-2").append(restaurantRecommender.suggestedRestaurants(2, ['mexican', 'pizza'])[1].name + "<br>");
        $(".print-recommend-2").append(restaurantRecommender.suggestedRestaurants(2, ['mexican', 'pizza'])[2].name + "<br>");
        $(".print-recommend-2").append(restaurantRecommender.suggestedRestaurants(2, ['mexican', 'pizza'])[3].name + "<br>");
        $(".button-add").prop("disabled", true);
        $(".button-add").text("Pizza Express Added!");
    });
});