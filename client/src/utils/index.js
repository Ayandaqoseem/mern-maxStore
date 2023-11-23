export function calculateAverageRating(ratings) {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return 0;
  }

  var totalStars = 0;
  for (var i = 0; i < ratings.length; i++) {
    var rating = ratings[i];
    if (rating.hasOwnProperty("star")) {
      totalStars += rating.star;
    }
  }
  return totalStars / ratings.length;
}

export const getCartQuantityId = (products, id) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id === id) {
      return products[i].cartQuantity;
    }
  }
  return 0;
};
