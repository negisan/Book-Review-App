import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader'

const CustomLoader: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10rem',
      }}
    >
      <PuffLoader loading={true} color={'var(--clr-primary-5)'} size={250} />
    </div>
  )
}

export default CustomLoader
