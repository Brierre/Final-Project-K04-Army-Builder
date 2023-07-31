import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage1 from './assets/images/[JoyFreak] warhammer-40k-tips.jpg';
import CarouselImage2 from './assets/images/3b8gj4.jpg';
import CarouselImage3 from './assets/images/06NaBT.jpg';

function ImgCarousel() {
    return (
        <Carousel>
            <Carousel.Item>
            <img src={CarouselImage1} alt="First slide" height="400px" />                <Carousel.Caption>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img src={CarouselImage2} alt="Second slide" height="400px" />
                <Carousel.Caption>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img src={CarouselImage3} alt="Third slide" height="400px" />
                <Carousel.Caption>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default ImgCarousel;