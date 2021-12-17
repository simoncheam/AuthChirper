import React, { useState, useContext } from 'react';

import styled, { ThemeContext } from 'styled-components'; //lets us have access to theme from within header componenet
import { Link as ReactRouterDomLink, useLocation } from 'react-router-dom';
import { Toggle } from './Toggle'

const HeaderWrapper = styled.header`
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    padding: 0 16px;
    position: fixed;
    top: 0;
    background-image: linear-gradient (to right, ${p => p.theme.primaryColor}, ${p => p.theme.secondaryColor});
    border-bottom: 3px solid ${p => p.theme.secondaryColor};
    
`
const Menu = styled.nav<MenuProps>`
    display: ${p => p.open ? 'block' : 'none'};
    position: absolute;
    width: 100%;
    top: 60px;
    left: 0;
    padding: 8px;
    box-sizing: border-box;
    font-family: 'Open Sans';
    border-bottom: 3px solid ${p => p.theme.secondaryColor};
    background: ${p => p.theme.bodyBackgroundColor};
    
    //media query - responsive design
    @media(min-width: 768px) {
        display: flex;
        background: none;
        left: initial;
        margin:  auto 0 auto auto;
        top: initial;
        position: relative;
        width: initial;
        border-bottom: none;
        
    }

`;

interface MenuProps {
    open?: boolean
};

const Link = ({ isActive, children, ...props }) => {
    return (
        
        <ReactRouterDomLink to={props.to} {...props}>
            {children}
        </ReactRouterDomLink>
    )
}

interface props {

};


const StyledLink = styled(Link)`
    //border-top: 5px solid black;
    padding: 4px 8px;
    display: block;
    text-align: center;
    box-sizing: border-box;
    margin: auto 0;
    font-weight: ${p => p.isActive ? 'bold' : 'normal'};
    color: ${p => p.theme.bodyFontColor};

`

const MobileMenuIcon = styled.div`
    margin: auto 0 auto auto;
    width: 25px;
    min-width: 25px;
    padding: 5px;
    >div{
        height: 3px;
        background: ${p => p.theme.bodyFontColor};
        margin: 5px 0;
        width: 100%;
    }
    @media(min-width: 768px){
        display: none;
    }

`


const Header = () => {
    const { pathname } = useLocation();

    const [menuOpen, setMenuOpen] = useState(false)

    const { id, setTheme } = useContext(ThemeContext);

    return (

        <HeaderWrapper>
            <MobileMenuIcon onClick={() => setMenuOpen(s => !s)}>
                <div />
                <div />
                <div />
            </MobileMenuIcon>


            <Menu open={menuOpen}>

                <StyledLink to="/" isActive={pathname === '/'}>
                    Home
                </StyledLink>
                <StyledLink to="/login" isActive={pathname === '/login'} >
                    Login
                </StyledLink>

                <StyledLink to="/create" isActive={pathname === '/create'} >
                    Create
                </StyledLink>



            {/* If logged in show additional links */}



                <Toggle isActive={id === 'dark'} onToggle={setTheme} />
            </Menu>
        </HeaderWrapper>


    )
}

export { Header }



