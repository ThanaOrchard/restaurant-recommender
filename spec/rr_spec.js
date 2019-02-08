describe("Restaurant Recommender", function() {
    var RestaurantRecommender = require('../RestaurantRecommender');
    var restaurantRecommender;
  
    beforeEach(function() {
        restaurantRecommender = new RestaurantRecommender();
    });
  
    describe("Add Restaurant to RestaurantRecommender", function() {
      it("new restaurant name should be Billy Bob's", function() {
        expect(restaurantRecommender.addRestaurant("Billy Bob's", "burgers").name).toEqual("Billy Bob's");
      });
      it("new restaurant cuisine should be burgers", function() {
        expect(restaurantRecommender.addRestaurant("Billy Bob's", "burgers").cuisine).toEqual("burgers");
      });
    });
});