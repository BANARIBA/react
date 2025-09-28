import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
  blue: "bg-blue-500 animate-pulse",
  pink: "bg-pink-500 animate-pulse",
};

type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = () => {
  const [light, setLight] = useState<TrafficLightColor>("red");
  const [countDown, setCountDown] = useState<number>(5);

  // countDown Effect
  useEffect(() => {
    if (countDown === 0) return;
    // console.log({countDown});
    const countDownInterval = setInterval(() => {
      // console.log('SetInterval Called!');
      setCountDown((prevValue) => prevValue - 1);
    }, 1000);

    // Cleanup o funcion de limpieza
    return () => {
      // console.log('useEffect cleanup!');
      clearInterval(countDownInterval);
    };
  }, [countDown]);

  // Change light color effect
  useEffect(() => {
    if (countDown > 0) return;
    setCountDown(5);
    if (light === "red") {
      setLight("green");
      return;
    }
    if (light === "yellow") {
      setLight("red");
      return;
    }
    if (light === "green") {
      setLight("yellow");
      return;
    }
  }, [countDown, light]);

  return {
    // Props
    light,
    countDown,
    colors,
    // Methods
    // Computed Values
    percentage: `${(countDown/5)*100}%`,
    greenLight: light === 'green' ? colors.green : 'bg-gray-500',
    redLight: light === 'red' ? colors.red : 'bg-gray-500',
    yellowLight: light === 'yellow' ? colors.yellow : 'bg-gray-500',
  };
}