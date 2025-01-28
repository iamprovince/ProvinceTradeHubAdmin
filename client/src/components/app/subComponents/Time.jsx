import { useState, useEffect } from "react";

const UtcTime = () => {
  const [utcTime, setUtcTime] = useState(new Date().toUTCString());

  useEffect(() => {
    const timer = setInterval(() => {
      setUtcTime(new Date().toUTCString());
    }, 1000);

    // Clear the timer on component unmount
    return () => clearInterval(timer);
  }, []);

  return <>{utcTime}</>;
};

export default UtcTime;
