import { useEffect, useState } from 'react';
import { Layout } from '../../components/customers/Index';
import { MainCarousel } from '../../components/carousel/Index';
import { CardHome } from '../../components/card-home/Index';

function Home() {
  return (
    <Layout>
      <MainCarousel />
      <CardHome />
    </Layout>
  );
}
export default Home;
