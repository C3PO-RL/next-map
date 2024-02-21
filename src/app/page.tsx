import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

export const gerCountries = async () => {
  const { data } = await client.query({
    query: gql`
      query GetCountries {
        countries {
          name
          capital
          code
          currency
          emoji
          languages {
            code
            name
          }
        }
      }
    `,
  });

  const countries = await data.countries;
  return countries;
};

const DynamicMapComponent = dynamic(() => import("../components/Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Home = async () => {
  const countries = await gerCountries();
  console.log(countries);
  const center: [number, number] = [7, -66]; // Replace with your desired initial coordinates
  const zoom = 4; // Adjust the zoom level as needed

  return (
    <>
      <DynamicMapComponent center={center} zoom={zoom} />
      {countries[0].name}
    </>
  );
};

export default Home;
