import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date: Date) => {
    setStartDate(date);
  };

  return (
    <div>    
      <DatePicker className='bg-transparent px-2 max-w-[80%] border border-info rounded-xl' selected={startDate} onChange={handleChange as any} />
    </div>
  );
};

export default MyDatePicker;
