import React from 'react'
import styled from 'styled-components'

const MachineFrame = styled.div`
    background-color: gray;
    height: 600px;
    width: 400px;
`
const SodaContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const SodaImage = styled.div`
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
`

const Soda = ({ img }) => (
    <SodaImage style={{backgroundImage: `url(${img})`}} />
)

const LeftMachine = ({ sodas }) => {
    return (
        <MachineFrame>
            <SodaContainer>
                {sodas.map(s => <Soda img={s.img} />)}
            </SodaContainer>
        </MachineFrame>
    )
}

export default LeftMachine