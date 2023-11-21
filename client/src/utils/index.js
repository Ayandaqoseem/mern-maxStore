


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