import theme from '@/themes/theme';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { RecordingTime } from './styles';

interface TimerProps {
  startTimer: boolean;
}

export const Timer: React.FC<TimerProps> = ({ startTimer }) => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (startTimer) {
      // Reset time and start the timer
      setTime({ minutes: 0, seconds: 0 });
      setIsActive(true);
    } else {
      // Stop the timer when startTimer is false
      setIsActive(false);
    }
  }, [startTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const { minutes, seconds } = prevTime;
          if (seconds === 59) {
            return { minutes: minutes + 1, seconds: 0 };
          } else {
            return { minutes, seconds: seconds + 1 };
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <RecordingTime>{`${time.minutes}:${time.seconds < 10 ? `0${time.seconds}` : time.seconds}`}</RecordingTime>
  );
};

export default Timer;
