
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect } from 'react';
import axios from 'axios';

export default function Statistic() {

    useEffect(() => {
        axios.get('https://localhost:7207/api/OrderBike')
            .then(res => {
                console.log("orderbikeeeeeeeeeeeeeeeeeeeee")
                console.log(res.data)

                let cnt = 0;
                let arrnum = []
                let arrmonth = []
                for (let i = 3; i < res.data.length - 1; i++) {
                    if (res.data[i] != null) {
                        if (res.data[i].dateEnd != null) {


                            let endDateString1 = res.data[i].dateEnd;
                            let endDateString2 = res.data[i + 1].dateEnd;

                            console.log(endDateString1);
                            console.log(endDateString2);
                            // Create a Date object from the string
                            let endDate1 = new Date(endDateString1);
                            let endDate2 = new Date(endDateString2);

                            // Get the month (0-indexed, where 0 is January and 11 is December)
                            let month1 = endDate1.getMonth();
                            let month2 = endDate2.getMonth();

                            // If you want the month number starting from 1, you can add 1
                            let monthNumber1 = month1 + 1;
                            let monthNumber2 = month2 + 1;

                            if (monthNumber1 == monthNumber2) {
                                arrmonth.push(monthNumber1);
                            }
                            else {
                                arrmonth.push(monthNumber1);
                                arrnum.push(cnt);
                                cnt = 0;
                            }
                        }
                    }
                    console.log("arrmonth", arrmonth)
                    console.log("arrnum", arrnum)
                }


                console.log("arrmonth")
                console.log(arrmonth)
            }).catch(err => console.log(err))
    }, [])


    return <>
        <div style={{ marginLeft: "29%" }}>
            <BarChart
                xAxis={[{ scaleType: 'band', data: ['חודש 11', 'חודש 12', 'חודש 01'] }]}
                series={[{ data: [7, 32, 15] }]}
                width={500}
                height={400}
            />
        </div>

    </>
}
