import { useState, useMemo, useEffect } from 'react';

const useWithErrorHandler = (axios) => {
  const [error, setError] = useState(null);

  const reqInterceptor = axios.interceptors.request.use((req) => {
    setError(null);

    return req;
  });

  const resInterceptor = axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      console.log(error);
      setError(error);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor);

      axios.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor, axios.interceptors]);

  const leaveErrorHandler = () => {
    setError(null);
  };
  return { error, leaveErrorHandler };
};

export default useWithErrorHandler;
