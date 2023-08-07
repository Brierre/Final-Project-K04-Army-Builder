import React from 'react';
import ImgCarousel from './ImgCarousel';
import BuilderInfoBlurb from './BuilderInfoBlurb';
import Footer from './Footer';

function Home({ isLoggedIn }) {

    return (
        <>
            <ImgCarousel />
            <BuilderInfoBlurb isLoggedIn={isLoggedIn}/>
            <Footer />
        </>
    )
}

export default Home;