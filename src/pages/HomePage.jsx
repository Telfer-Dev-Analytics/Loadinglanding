import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Mission } from '../components/Mission';
import { Metrics } from '../components/Metrics'; // Import the new component
import { Events } from '../components/Events';
import { Team } from '../components/Team';
import { Blog } from '../components/Blog';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';
import { Sponsors } from '../components/Sponsors';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <>
      <Hero />
      <Mission />
      <Metrics />
      <Events />
      <Sponsors />
      <Team />
      {/*<Blog />*/ /* Uncommment this to reveal a blog post preview on the main page once a blog post has been added*/}
      <FAQ />
      {/*<Contact />*/}
    </>
  );
};

export default HomePage;