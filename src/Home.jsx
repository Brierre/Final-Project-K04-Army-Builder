import React from 'react';
import ImgCarousel from './ImgCarousel';
import BuilderInfoBlurb from './BuilderInfoBlurb';
import Footer from './Footer';

function Home({ isLoggedIn }) {

    return (
        <div className="home">
            <ImgCarousel />
            <BuilderInfoBlurb isLoggedIn={isLoggedIn}/>
            <Footer />
        </div>
    )
}

export default Home;