
import React from 'react'
import ReminderList from './reminderList'

class Remind extends React.Component{

    handleClick = () => {
        this.props.history.push('/addReminder')
    }
    render(){
        return(
            <div className="space">
                <button onClick={this.handleClick} type="button" class="btn btn-success" >add reminder</button><br/>
                <hr></hr>
                <h3 className="d-flex justify-content-center">BILLS</h3>
                <ReminderList />
            </div>
        )
    }

}

export default Remind