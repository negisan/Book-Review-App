import React from 'react'
import styled from 'styled-components'
const Error: React.FC = () => {
  return (
    <Wrapper>
      <section>
        <h1>404</h1>
        <h3>お探しのページは存在しません...</h3>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
  }
`

export default Error
