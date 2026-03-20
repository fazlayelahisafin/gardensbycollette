'use client'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import image1 from '../public/images/image1.jpg'
import image2 from '../public/images/image2.jpg'
import image3 from '../public/images/image3.jpg'
import image4 from '../public/images/images4.jpg'
import classes from './page.module.css'

export default function HomePage() {

  // Slider images
  const images = [
    { image: image1, alt: 'image-1' },
    { image: image2, alt: 'image-2' },
    { image: image3, alt: 'image-3' },
    { image: image4, alt: 'image-4' }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i < images.length - 1 ? i + 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      {/* Hero / Image Slider */}
      <section className={classes.hero}>
        {images.map((img, i) => (
          <div
            key={i}
            className={`${classes.heroImage} ${i === index ? classes.active : ''}`}
          >
            <Image
              src={img.image}
              alt={img.alt}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}

        <div className={classes.heroOverlay}>
          <h1>Flowers and Landscaping Services</h1>
          <p>Contact us for any type of service and flower purchase</p>

          <div className={classes.buttonGroup}>
            <Link href="/browse-flowers" className={classes.heroBtn}>Browse Flowers</Link>
            <Link href="/request-service" className={classes.heroBtn}>Request Service</Link>
          </div>
        </div>
      </section>

      {/* Landscaping Services */}
      <section className={classes.services}>
        <h2>Our Landscaping Services</h2>
        <div className={classes.servicesgrid}>
          <div className={classes.servicecard}>
            <h3>Garden Design</h3>
            <p>Beautiful and sustainable garden designs tailored to your home.</p>
          </div>
          <div className={classes.servicecard}>
            <h3>Lawn Care</h3>
            <p>Professional lawn maintenance for a green, healthy yard.</p>
          </div>
          <div className={classes.servicecard}>
            <h3>Plant Installation</h3>
            <p>Expert installation of flowers, shrubs, and trees.</p>
          </div>
        </div>
      </section>


      <section className={classes.about}>
        <h2>Why Choose Gardens By Collette</h2>
        <p>We combine passion, expertise, and high-quality plants to bring your garden dreams to life.</p>
      </section>


      <section className={classes.contactcta}>
        <h2>Ready to Transform Your Garden?</h2>
        <Link href="/request-service">Get Started</Link>
      </section>


      <footer className={classes.footer}>
        <p>© 2026 Gardens By Collette | 📍 123 Garden Street, Toronto | ☎ +1 (437) 555-1234 | ✉ info@gardensbycollette.com</p>
      </footer>
    </div>
  )
}