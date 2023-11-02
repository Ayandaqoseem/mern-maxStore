import { Link } from "react-router-dom";

function removeHTMLTags(input) {
  const regex = /<[^>]+>/g;
  return input.replace(regex, "");
}

export default function CarouselItem({ 
    url, 
    name, 
    price, 
    description,
    regularPrice
 }) {
  const desc = removeHTMLTags(description);
  return (
    <div className="carouselItem">
      <Link to="/">
        <img className="product--image" src={url} alt="product" />
        <p className="price">
          <span>{regularPrice > 0 && 
            <del>
                {regularPrice?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                })}
            </del>}</span><br />
          {price?.toLocaleString("en-US", {
            style: "currency",
            currency: "NGN",
          })}
        </p>
        <h5>{name?.substring(0, 16)}...</h5>
        <p className="--mb">{desc?.substring(0, 26)}...</p>
      </Link>
      <button className="--btn --btn-primary --btn-block">Add To Cart</button>
    </div>
  );
}
