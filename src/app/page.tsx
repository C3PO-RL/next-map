import dynamic from "next/dynamic";

const DynamicMapComponent = dynamic(() => import("../components/Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Home = () => {
  const center: [number, number] = [7, -66]; // Replace with your desired initial coordinates
  const zoom = 4; // Adjust the zoom level as needed

  return (
    <>
      <DynamicMapComponent center={center} zoom={zoom} />
    </>
  );
};

export default Home;
