import { Text, TextProps } from "app/components"
import React, { useEffect, useState } from "react"

interface CountdownProps extends TextProps{
  initialDate: string,
}
type timeLeftType = {
  days: number | 0,
  hours: number | 0,
  minutes: number | 0,
  seconds: number | 0,
}

export const Countdown: React.FC<CountdownProps> = ({initialDate, ...props}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(initialDate.replace(' ', 'T')) - +new Date();
    let timeLeft:timeLeftType = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = () => {
    const { days, hours, minutes, seconds }:timeLeftType = timeLeft;
    const formattedTime = [
      days > 0 && `${days}g`,
      hours > 0 && `${hours}s`,
      minutes > 0 && `${minutes}d`,
      seconds > 0 && `${seconds}`
    ].filter(Boolean).join(' ');

    return formattedTime || "Süre Bitti!";
  };

  return (
      <Text {...props}  text={formatTimeLeft()}/>
    )
}
