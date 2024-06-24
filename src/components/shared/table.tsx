

import React from "react";

const Table = () => {

    return (
        <div className="col-md-12 col-sm-12  ">
            <div className="x_panel">
                {/* <div className="x_title">
            <h2>Table design <small>Custom design</small></h2>
            <ul className="nav navbar-right panel_toolbox">
              <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Settings 1</a>
                  <a className="dropdown-item" href="#">Settings 2</a>
                </div>
              </li>
              <li><a className="close-link"><i className="fa fa-close"></i></a>
              </li>
            </ul>
            <div className="clearfix"></div>
          </div> */}

                <div className="x_content">

                    {/* <p>Add class <code>bulk_action</code> to table for bulk actions options on row select</p> */}

                    <div className="table-responsive">
                        <table className="table table-striped jambo_table bulk_action">
                            <thead>
                                <tr className="headings">
                                    <th className="column-title">Id </th>
                                    <th className="column-title">Licenses Start Date </th>
                                    <th className="column-title">Licenses End Date </th>
                                    <th className="column-title">Licenses # </th>
                                    <th className="column-title">Bill to Name </th>
                                    <th className="column-title">Status </th>
                                    <th className="column-title">Amount </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="even pointer">

                                    <td className=" ">121000040</td>
                                    <td className=" ">May 23, 2014 11:47:56 PM </td>
                                    <td className=" ">July 23, 2016 10:47:56 PM </td>
                                    <td className=" ">121000210 <i className="success fa fa-long-arrow-up" style={{ color: "#ffc107 " }}></i></td>
                                    <td className=" ">John Blank L</td>
                                    <td className=" ">Paid</td>
                                    <td className="a-right a-right ">$7.45</td>

                                </tr>
                                <tr className="odd pointer">
                                    <td className=" ">121000039</td>
                                    <td className=" ">July 24, 2016 10:47:56 AM</td>
                                    <td className=" ">May 23, 2019 11:30:12 PM</td>
                                    <td className=" ">121000208 <i className="success fa fa-long-arrow-up" style={{ color: "#ffc107 " }}></i>
                                    </td>
                                    <td className=" ">John Blank L</td>
                                    <td className=" ">Paid</td>
                                    <td className="a-right a-right ">$741.20</td>
                                </tr>
                                <tr className="even pointer">

                                    <td className=" ">121000038</td>
                                    <td className=" ">May 25, 2019 10:55:33 PM</td>
                                    <td className=" ">July 24, 2021 10:55:33 PM</td>
                                    <td className=" ">121000203 <i className="success fa fa-long-arrow-down" style={{ color: "#dc3545" }}></i>
                                    </td>
                                    <td className=" ">Mike Smith</td>
                                    <td className=" ">Paid</td>
                                    <td className="a-right a-right ">$432.26</td>
                                </tr>
                                <tr className="odd pointer">
                                    <td className=" ">121000037</td>
                                    <td className=" ">July 24, 2014 10:52:44 PM</td>
                                    <td className=" ">Aug 24, 2014 10:52:44 PM</td>
                                    <td className=" ">121000204 <i className="success fa fa-long-arrow-down" style={{ color: "#dc3545" }}></i></td>
                                    <td className=" ">Mike Smith</td>
                                    <td className=" ">Paid</td>
                                    <td className="a-right a-right ">$333.21</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Table