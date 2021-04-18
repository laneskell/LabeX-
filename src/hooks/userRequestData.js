import axios from "axios";
import { useState, useEffect } from "react";

const useRequestData = (url, initialState) => {
  const [data, setData] = useState(initialState);


  useEffect(() => {
    axios
      .get(url)
      .then((res) =>  { setData(res.data)})
      .catch((err) => alert(err));
  }, [url,initialState]);


  

  return data;
};

export default useRequestData;
