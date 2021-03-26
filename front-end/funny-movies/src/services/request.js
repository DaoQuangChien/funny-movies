// import { useEffect, useRef, useState } from "react";
import { notification } from "antd";
import axios from "axios";
import { getUserData } from "../shared";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_PATH,
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  const userData = getUserData();

  if (userData) {
    config.headers.common["access-token"] = userData.accessToken;
  }
  return config;
});
request.interceptors.response.use(
  (response) => response.data,
  (err) => {
    if (!axios.isCancel(err)) {
      notification.error({
        message: "Request Error",
        description: "Something went wrong!",
      });
    }
    return Promise.reject(err);
  }
);

export default request;

// const useAxios = (
//   { url, method, onFetched, onError, onCanceled },
//   reRunRequest
// ) => {
//   const reRunRequestRef = useRef();
//   const cancelRef = useRef();
//   // const cancel = () => cancelRef.current && cancelRef.current.cancel();
//   const [loading, setLoading] = useState(false);
//   const CancelToken = axios.CancelToken;
//   // let cancel;

//   useEffect(() => {
//     if (reRunRequest !== reRunRequestRef.current) {
//       reRunRequestRef.current = reRunRequest;
//       setLoading(true);
//       request({
//         url,
//         method,
//         cancelToken: new CancelToken(function executor(c) {
//           cancelRef.current = c;
//         }),
//       })
//         .then((res) => {
//           console.log(res);
//           onFetched && onFetched(res);
//         })
//         .catch((err) => {
//           if (axios.isCancel(err)) {
//             onCanceled && onCanceled(err);
//           } else {
//             onError && onError(err);
//           }
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [url, method, onFetched, onError, onCanceled, reRunRequest, CancelToken]);
//   return { loading, cancel: cancelRef.current };
// };

// export default useAxios;
