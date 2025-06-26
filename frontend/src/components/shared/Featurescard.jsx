import React from 'react'

const Featurescard = ({link, name, desciption}) => {

  return (
    <div 
        className='border border-gray-200 rounded-md p-8 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col gap-2 items-center max-w-[330px]'
    >
        <div className='h-80px items-center'>
            <img src={link} alt="cardImage" />
        </div>

        <div className='font-semibold text-xlg'>
            {name}
        </div>
        <div className='text-center'>
            {desciption}
        </div>
    </div>
  )
}

export default Featurescard