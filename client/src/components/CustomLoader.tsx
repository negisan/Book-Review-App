import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader'

const CustomLoader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '30%',
        left: '50%',
      }}
    >
      <PuffLoader loading={true} color={'var(--clr-primary-5)'} size={100} />
    </div>
  )
}

export default CustomLoader
