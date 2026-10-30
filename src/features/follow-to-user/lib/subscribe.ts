import { useState } from "react";

export const useSubscribe = () => {
  // const [children, setChildren] = useState('Хочешь больше?')
  // const [count, setCount] = useState(5)
  const [auth, setAuth] = useState(false)
  

  const subscribe = () => {
    // setCount(count - 1)
    // setChildren(`ещё ${count}`)
    // if (count < 1) {
      // setCount(5)
      // setChildren('Хочешь больше?')
      setAuth(true)
    // }
  };

  return { subscribe, auth, setAuth };
};
