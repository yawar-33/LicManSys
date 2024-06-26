import { Card, PanelContent } from "@/components";
import AddNewCustomer from "@/components/shared/addnewcustomer";
import Table from "@/components/shared/table";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {

  const [openCustomer, setOpenCustomer] = useState(false);
  const handleNewCustomer = () => {
    setOpenCustomer(true)
  }
  const handleCloseCustomer = () => {
    setOpenCustomer(false)

  }
  return (
    <PanelContent headerContent title="Dashboard">
      <div className="row">
      <div className="col-lg-3 col-6">
          <div className="small-box bg-success">
            <div className="inner">
              <h3>100</h3>
              <p>Total Customers</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
            <Link href="/" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-info">
            <div className="inner">
              <h3>100</h3>
              <p>Total Licenses</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
            <Link href="/" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          {/* <div className="small-box bg-success"> */}
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>
                53
                {/* <sup style={{ fontSize: "20px" }}>%</sup> */}
              </h3>
              <p>Expired Licenses</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
            <Link href="/" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>

        <div className="col-lg-3 col-6">
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>47</h3>
              <p>Licenses Expiring Soon</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <Link href="/" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>

        {/* <div className="x_panel">
          <div className="x_content">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target=".bs-example-modal-lg" onClick={handleNewCustomer}>
              Add New Customer
            </button>

            </div>
          </div> */}
          {openCustomer && <AddNewCustomer onClose={handleCloseCustomer} open={openCustomer} />}
        <div className="x_panel">
          <div className="x_title d-flex justify-content-between" style={{ marginBottom: "10px" }}>
            <h4 style={{ margin: 0 }}>Customers</h4>
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target=".bs-example-modal-lg" onClick={handleNewCustomer}>
              Add New Customer
            </button>          </div>
          <div className="x_content">


            <Table />

          </div>
        </div>

      </div>
    </PanelContent>
  );
}
