import { Card, PanelContent } from "@/components";
import Table from "@/components/themes/table";
import Link from "next/link";

export default function Dashboard() {
  return (
    <PanelContent headerContent title="Dashboard">
      <div className="row">
        <div className="col-lg-4 col-6">
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
        <div className="col-lg-4 col-6">
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

        <div className="col-lg-4 col-6">
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


        <Table />
      </div>
    </PanelContent>
  );
}
