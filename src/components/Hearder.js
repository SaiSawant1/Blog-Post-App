import React from 'react'
import { Link } from 'react-router-dom'

const Hearder = () => {
  return (
    <header className='Header'>
        <h1>Blogs</h1>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="post">Post</Link></li>
            </ul>
        </nav>

    </header>
  )
}

export default Hearder