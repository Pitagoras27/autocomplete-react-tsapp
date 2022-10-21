import { useEffect, useState } from 'react';
import { countries } from "../data/countries";
import { formatData } from '../helpers';

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getContriesData = async () => {
      setLoading(true);
      try {
        const getData = await fetch('https://countriesnow.space/api/v0.1/countries');
        const { data } = await getData.json();
        setData(formatData(data));
        setLoading(false);
        
      } catch (error) {
        setLoading(false);
        setData(countries);
      }

    };

    getContriesData();
  }, [])

  return {
    loading,
    data
  }
}
