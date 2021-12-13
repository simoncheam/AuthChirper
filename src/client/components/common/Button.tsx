import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const largeStyles = ({ large }) => {

    if (large) {

        return css`
            padding: 10px;
            border-radius: 5px;
            font-size: 1.5em;
    
        `
    } else {

        return css`
            /* if p is NOT large */
            padding: 8px;
            border-radius: 4px;
            font-size: 1em;
    `
    }
}

const Button = styled.button<ButtonProps>`
    color: white;
    background: ${p => p.secondary ? p.theme.secondaryColor : p.theme.primaryColor} ;
    font-weight: bold;

    ${largeStyles}

    box-shadow: none;
    border: none;
    width: 100%;
    display: block;
    white-space: none;

    &:disabled{
        background: #eee;
        color: #666;
    }
`;

interface ButtonProps  {
    large?: boolean | string,
    secondary?: boolean
}


export { Button };