import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import axios from "axios";





export default function Banner() {

    // state
    const[slides, setSlides] = useState([]);

    useEffect(() => {
        loadSlides()
    }, []);

    const loadSlides = async () => {
        try {
            const { data } = await axios.get('/slides')
            console.log("show data =>", data);
            setSlides(data)
        } catch (err) {
          console.log(err);  
        }
    }
    
    return (
        <div>
            <Carousel
                className="carousel"
                autoPlay={true}
                animation="slide"
                indicators={false}
                navButtonsAlwaysInvisible={true}
                cycleNavigation={true}
                navButtonsProps={{
                    style: {
                        background: "#fff",
                        color: "#494949",
                        borderRadius: 0,
                        marginTop: -22,
                        height: "104px"
                    }
                }}
                
            >
                {slides?.map((s) => {
                    return (
                        <>
                            <img 
                                key={s._id}
                                src={`${process.env.REACT_APP_API}/slide/photo/${s._id}`}
                                alt={s.name}
                                className="bannerImg"
                            />
                        </>
                    )
                })}
            </Carousel>
        </div>
    )
}