import React from 'react';

const Loader = ({size , color}) => {
  return (
    <div className="flex justify-center items-center ">
      <div className={`animate-spin rounded-full h-${size} w-${size} border-t-4 border-${color}-500 border-opacity-75`}></div>
    </div>
  );
};

export default Loader;