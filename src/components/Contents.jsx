import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Task from './Task'

const Contents = () => {
    const [selectedTab, setSelectedTab] = useState('INBOX');
    return (
        <section className='container'>
            <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
            <Task selectedTab={selectedTab}/>
        </section>
    )
}

export default Contents
