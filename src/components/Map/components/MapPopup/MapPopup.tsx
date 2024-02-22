import GET_COUNTRY_BY_ISO from "@/lib/queries/queries";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import React, { useEffect, useState } from "react";

interface MapPopupProps {
  ISOCode: string;
}
const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});
const getCountryData = async (ISOCode: string) => {
  const { loading, error, data } = await client.query({
    query: GET_COUNTRY_BY_ISO,
    variables: { isoCode: ISOCode },
  });

  return { loading, error, data };
};
const MapPopup: React.FC<MapPopupProps> = ({ ISOCode }) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getInfo = async () => {
      const { loading, data } = await getCountryData(ISOCode);
      console.log(data, loading);
      if (loading) {
        setLoading(true);
      }
      if (!loading) {
        setLoading(false);
        setData(data.countries);
      }
    };

    getInfo();
  }, [ISOCode, data]);
  console.log(data, loading);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col">
        <p>Flag: {data[0]?.emoji}</p>
        <p>Name: {data[0]?.name}</p>
      </div>
      <div className="flex flex-col">
        <p>Capital: {data[0]?.capital}</p>
        <p>Currency: {data[0]?.currency}</p>
      </div>
    </div>
  );
};

export default MapPopup;
