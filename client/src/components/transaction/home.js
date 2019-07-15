import React from 'react'

class Home extends React.Component{
    handleClick=() => {
        this.props.history.push('/new')

    }
    render(){
        return(
            <div>
                <h1> transaction page </h1>
                <button onClick={this.handleClick}>add</button>
                {/* <Link to='/new'>new</Link> */}
            </div>
        )
    }
}
export default Home
