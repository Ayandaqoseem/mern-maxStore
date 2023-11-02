import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";
import "./carousel.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function ProductCarousel({ products }) {
  return (
    <div className="homeSection">
      <Carousel
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        customTransition="all 500ms ease"
        transitionDuration={1000}
        
      >
        {/* <div className="carouselItem">
          <NavLink to={`/product/${p.slug}`}>
           
            
                <img
                  src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                  alt={p.name}
                />
             

              <p className="price">
                {p?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "NGN",
                })}
              </p>
              <h4 className="productName">{p?.name?.substring(0, 18)}...</h4>
              <p className="desc">{p?.description?.substring(0, 18)}...</p>
            
          </NavLink>
          <button className="btn btn-primary">Add To Cart</button>
        </div> */}
        {products}
      </Carousel>
    </div>
  );
}
