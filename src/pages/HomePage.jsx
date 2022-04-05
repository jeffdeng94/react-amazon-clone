import React from 'react'
import Product from '../components/Product'
import uniqid from 'uniqid';
export default function Home() {
  return (
    <div className='home'>
      <div className="home-container">
        <img className='home-image' src="https://images-na.ssl-images-amazon.com/images/G/01/adlp/builder/BFF-V1-01-Hero-T-59d56e74-90ad-47d3-b893-5d1b6665011b._CB417386572_.jpg" alt="banner" />
        <div className="home-row">
        <Product
                    id={1111}
                    title='ULTIMATE EARS BOOM 3 Portable Bluetooth Speaker SUNSET Silver'
                    price={129.99}
                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYpYRhOVZ64ARQlp96ri6pem3QD1YSP7YGWrHuExDtUT2nmOyMrI39xouY1qPlGcfD874&usqp=CAU'
                    rating={5}
                    unid={uniqid()}
        />
          <Product
                      id={2222}
                      title='Apple AirPods Pro'
                      price={129.99}
                      image='https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1622837670-71zny7btrll-ac-sl1500-1622837659.jpg'
                      rating={5}
                      unid={uniqid()}
          />
        </div>
        <div className="home-row">
        <Product
                    id={3333}
                    title='Fire TV Stick | Alexa Voice Remote with TV Controls | HD streaming device'
                    price={69.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/51ZdmnHKukL._AC_UL320_SR320,320_.jpg'
                    rating={4}
                    unid={uniqid()}
        />
          <Product
                      id={4444}
                      title='Skechers Tote Shoulder Bag for Woman, Grocery Bags Shopping Handbag Gym Bag for Ladys'
                      price={29.99}
                      image='https://www.samedaycreativesolutions.com/uploads/6/1/8/9/61893285/amazon-product-photography-services-requirements-product-photography-studio-miami-53_4.jpg'
                      rating={3}
                      unid={uniqid()}
                      />
          <Product
                      id={5555}
                      title='Google Nest Thermostat - Smart Thermostat for Home - Programmable WiFi Thermostat - Snow'
                      price={59.99}
                      image='https://www.junglescout.com/wp-content/uploads/2018/05/Nest-Collage-1.png'
                      rating={5}
                      unid={uniqid()}
          />
        </div>
        <div className="home-row">
        <Product
                    id={6666}
                    title='Sony Playstation 5 Disc Console AU Version'
                    price={629.99}
                    image='https://m.media-amazon.com/images/I/61ISjgFTbRL.jpg'
                    rating={5}
                    unid={uniqid()}
        />
        </div>
      </div>
    </div>
  )
}
