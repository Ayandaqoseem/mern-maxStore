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
  if (products && products.length) {
    for (let i = 0; i < products.length; i++) {
      if (products[i]._id === id) {
        return products[i].cartQuantity;
      }
    }
  }
  return 0;
};

// Extract id and cart quantity from cartItems
export function extractIdAndCartQuantity(products) {
  return products.map(function (product) {
    return {
      _id: product._id,
      cartQuantity: product.cartQuantity,
    };
  });
}

// validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
