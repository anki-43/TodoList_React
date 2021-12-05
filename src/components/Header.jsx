import React from 'react'
import logo from '../assets/images/1560.png'
const Header = () => {
    return (
        <header className='header'>
            <nav>
                <div className='logo'>
                    <img src={logo} alt='Todolist'/>
                    <span>Todo List</span>
                </div>
            </nav>
        </header>
    )
}

export default Header
