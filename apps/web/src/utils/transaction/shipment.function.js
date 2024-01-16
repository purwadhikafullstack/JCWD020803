import axios from 'axios';
import { useEffect, useState } from 'react';

export const shipmentFunction = () => {
  const [shipmentData, setShipmentData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/transaction');
      setShipmentData(response.data.response);
    } catch (err) {
      console.log(err);
    }
  };

  const postData = async () => {
    try {
      await axios.post('http://localhost:8000/api/transaction');
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    shipmentData,
    fetchData,
    postData,
  };
};
