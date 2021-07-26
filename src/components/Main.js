import React , { useState, useEffect } from 'react'
import axios from 'axios'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
function Main() {

    const [ data, setData ] = useState([])
    useEffect(() => {
        axios.get("https://api.covid19api.com/summary")
        .then(res => {
            // console.log(res.data)
            setData(res.data.Countries)
        })
        .catch(err =>{
            console.log(err+"Error Found!!!")
        })
        $(document).ready(()=>{
            $("#mytable").DataTable()
        })
    }, [data])
    const tableData = data.map((res) => {
        return (
            <tr>
                <td>{res.Country}</td>
                <td>{res.TotalConfirmed}</td>
                <td>{res.TotalConfirmed - res.TotalDeaths - res.TotalRecovered}</td>
                <td>{res.TotalDeaths}</td>
                <td>{res.TotalRecovered}</td>
            </tr>
        )
    })

    return (
        <div>
            <h1>Covid Report</h1>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <table id="mytable" className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Confirmed Cases</th>
                                <th>Active Cases</th>
                                <th>Recovered Cases</th>
                                <th>Deaths</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Main
