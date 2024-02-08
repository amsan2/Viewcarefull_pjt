import React, { useState } from 'react';
import useHealthStore from '../../stores/HealthStore';
import DateBox from './DateBox';
import FlexRowContainer from '../common/FlexRowContainer';

function Week() {
  const { week, selectedDate, setSelectedDate } = useHealthStore();
  const [startX, setStartX] = useState<number | null>(null);
  const [moved, setMoved] = useState<boolean>(false);

  function renderDate() {
    const result = [];
    for (let i = 0; i < 7; i++) {
      result.push(<DateBox key={i} date={week[i]} moved={moved} />);
    }

    return result;
  }

  function handleChangeWeek(prev: boolean) {
    if (selectedDate === null) {
      return null;
    }
    if (prev === true) {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() - 7);
      setSelectedDate(newDate);
    } else if (prev === false) {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + 7);
      setSelectedDate(newDate);
    }
  }

  return (
    <FlexRowContainer
      $margin="10px 0"
      onMouseDown={(e) => {
        console.log(e.pageX)
        setStartX(e.pageX);
        setMoved(false);
      }}
      onMouseUp={(e) => {
        console.log(11111111)
        if (startX !== null && startX > e.pageX) {
          setMoved(true);
          handleChangeWeek(false);
        } else if (startX !== null && startX < e.pageX) {
          setMoved(true);
          handleChangeWeek(true);
          setStartX(null);
        }
      }}
      onTouchStart={(e) => {
        setStartX(e.touches[0].pageX);
        setMoved(false);
      }}
      onTouchEnd={(e) => {
        if (startX !== null && startX > e.changedTouches[0].pageX) {
          setMoved(true);
          handleChangeWeek(false);
        } else if (startX !== null && startX < e.changedTouches[0].pageX) {
          setMoved(true);
          handleChangeWeek(true);
          setStartX(null);
        }
      }}
    >
      {renderDate()}
    </FlexRowContainer>
  );
}

export default Week;
