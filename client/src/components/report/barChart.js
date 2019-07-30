import React from 'react'
import { Chart } from 'react-google-charts'
import Moment from 'react-moment'
import moment from 'moment'

class BarChart extends React.Component{

    render(){
            let mondayExpense=0, tuesdayExpense=0, wednesdayExpense=0, thursdayExpense=0, fridayExpense=0, saturdayExpense=0,sundayExpense=0 
            return(
                    <div className="bomborder">
                            <h3>BAR-CHART <i class="fa fa-bar-chart" aria-hidden="true"></i></h3>
                            {
                                 this.props.transactions.forEach((transaction) => {
                                    let dt = moment(transaction.date, "YYYY-MM-DD HH:mm:ss")
                                     let dayname = dt.format('dddd')
                                     if(transaction.amount < 100000){
                                         
                                     if(dayname == "Monday"){

                                         mondayExpense = mondayExpense+ transaction.amount

                                     }else if(dayname == "Tuesday"){
                                         console.log(tuesdayExpense)
                                         tuesdayExpense = tuesdayExpense+ transaction.amount

                                    }else if(dayname == "Wednesday"){

                                        wednesdayExpense = wednesdayExpense+ transaction.amount

                                    }else if(dayname == "Thursday"){

                                            thursdayExpense = thursdayExpense+ transaction.amount

                                    }else if(dayname == "Friday"){

                                            fridayExpense = fridayExpense+ transaction.amount

                                    }else if(dayname == "Saturday"){

                                            saturdayExpense = saturdayExpense+ transaction.amount

                                    }else if(dayname == "Sunday"){
                                        
                                            sundayExpense = sundayExpense+ transaction.amount
                                        }
                                }})}
                                
                                <Chart
                                    width={'500px'}
                                    height={'300px'}
                                    chartType="BarChart"
                                    loader={<div><b><h3>Loading!!!</h3></b></div>}
                                    data={[
                                        [
                                        'Days',
                                        'Amount',
                                        { role: 'style' },
                                        {
                                            sourceColumn: 0,
                                            role: 'annotation',
                                            type: 'string',
                                            calc: 'stringify',
                                        },
                                        ],
                                        ['Sunday',sundayExpense, '#b87333', null],
                                        ['Monday',mondayExpense, 'silver', null],
                                        ['Tuesday', tuesdayExpense, 'gold', null],
                                        ['Wednesday',wednesdayExpense, 'color: #e5e4e2', null],
                                        ['Thursday',thursdayExpense, '#b87333', null],
                                        ['Friday',fridayExpense, 'silver', null],
                                        ['Saturday', saturdayExpense, 'gold', null],
                                    ]}
                                    options={{
                                        title: 'Transactions By Days',
                                        width: 500,
                                        height: 300,
                                        bar: { groupWidth: '95%' },
                                        legend: { position: 'none' },
                                    }}
                                /> 
                </div>    
            )
        }
    }

    export default BarChart