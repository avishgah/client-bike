
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect } from 'react';
import axios from 'axios';

export default function Statistic() {

    useEffect(()=>{
        axios.get('https://localhost:7207/api/OrderBike')
        .then(res => {
            console.log("orderbikeeeeeeeeeeeeeeeeeeeee")
            console.log(res.data)
            
let cnt=0;
let arrnum=[]
let arrmonth=[]
            for(let i=3;i<res.data.length-1;i++){
                if(res.data[i]!=null)
                { 
                    if(res.data[i].dateEnd!=null  )  
                    {     
                       
                        // const dateEnd = new Date(res.data[i].dateEnd);
                        //  const month = res.data[i].dateEnd?.toLocaleDateString('en-US', { month: 'numeric' });
                        let month=res.data[i].dateEnd.slice(1,7)
                        month=month.slice(4,6)
                        let month2=res.data[i+1].dateEnd.slice(1,7)
                        month2=month2.slice(4,6)
                        console.log("i "+i+" month "+month+" month2 "+month2)
                        console.log(month);
                        if(month==month2)
                        {
                            
                            cnt++;
                        }
                        else
                        {
                        console.log("monthhhhhhhhhhhhh");
                        arrmonth.push(month);
                        arrnum.push(cnt);
                        cnt=0;}
                    }
                }
            }
        

            console.log("arrmonth")
            console.log(arrmonth)
        }).catch(err => console.log(err))
    },[])
  return <>
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['11', '12', '01'] }]}
      series={[{ data: [1,32,11] }]}
      width={500}
      height={300}
    />
  </>
}
