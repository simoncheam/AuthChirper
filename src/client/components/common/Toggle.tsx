import styled, {keyframes} from 'styled-components';
import React, {useState, useEffect} from 'react'

const ToggleWrapper = styled.div`
    width: 50px;
    min-width: 50px;
    height: 25px;
    border-radius: 25px;
    border: 1px solid #666;
    margin: auto;
    display: flex;
    background-image: linear-gradient( to bottom, ${p => p.theme.primaryColor}, ${p=> p.theme.secondaryColor});
    
`

const Notch = styled.div<NotchProps>`
    height: 21px;
    width:  21px;
    border: 1px solid #666;
    margin-top: 1px;
    background: white;
    border-radius: 50%;
    transition: transform 0.1s linear;
    transform: translate( ${ p=> p.isActive ? '26px' : '1px'})

`
interface NotchProps {
    isActive?: boolean
}

const Toggle = ({isActive, onToggle}) => {
    return (
        <ToggleWrapper onClick={onToggle}>
            <Notch isActive ={isActive}/>
            
        </ToggleWrapper>
    )
}

export {Toggle}
