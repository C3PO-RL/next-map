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
  const [loading, setLoading] = useState<boolean>(false);

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

  return <div>{data && data[0]?.name}</div>;
};

export default MapPopup;
