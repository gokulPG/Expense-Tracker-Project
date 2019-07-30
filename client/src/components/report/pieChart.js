import React from 'react'
import { Chart } from "react-google-charts"



class PieChart extends React.Component{
    
    render(){
            let res={},category=""
        return (
           <div className="bomborder">
                <h3>PIE-CHART<i class="fa fa-pie-chart" aria-hidden="true"></i></h3>
                  {    
                   this.props.transactions.forEach((transaction) => {
                        category = transaction.category.name
                        if(res.hasOwnProperty(category)){
                            res[category] = res[category] + 1
                        }else{
                            res[category] = 1
                        }
                   })}
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div><b><h3>Loading!!!</h3></b></div>}
                data={[
                        ['Category', 'levels'],
                        ['Food' , res['Food']],
                        ['HealthCare' , res['HealthCare']],
                        ['Personal', res['Personal']],
                        ['Family', res['Family']],
                        ['Transport', res['Transport']],
                        ['Shopping', res['Shopping']],
                        ['Clothes', res['Clothes']],
                    ]}
                    options={{
                        title: 'Expenses By Category',
                    }}
                rootProps={{ 'data-testid': '1' }}
                />
             </div>   
    )
}
}

export default PieChart

