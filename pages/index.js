import Link from 'next/link'
import useSWR from 'swr'
import moment from 'moment';

import Layout from '../components/layout';
import fetcher from '../libs/fetcher'
import { site_title } from '../libs/config'

const timeConvert = (date) => {
  var timeDifference = Math.floor(((new Date().getTime() / 1000) - date));
  var minute = Math.floor(timeDifference / 60);
  var hour = Math.floor(timeDifference / 3600);
  var day = Math.floor(timeDifference / 86400);
  if (minute < 60) {
    return minute + " dk önce güncellendi";
  } else if (hour < 24)
    return hour + " sa önce güncellendi";
  else
    return day + " g önce güncellendi";
}

export default function Index() {
  const { data: global } = useSWR("https://corona.lmao.ninja/v2/all", fetcher, { refreshInterval: 60000 })
  const { data: turkey } = useSWR("https://corona.lmao.ninja/v2/countries/tr", fetcher, { refreshInterval: 60000 })
  return (
    <Layout title="Anasayfa">
      <section>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-4">
            <h5 className="mb-0">{site_title} / İzleyici</h5>
            {global && turkey ?
            <p className="mb-0 fs-13 text-muted">{timeConvert(moment(global ? global.updated : "").unix())}</p>
            : ""}
          </div>
          <hr className="mt-0"></hr>
        </div>

        {global && turkey ?
        <div className="container">
          <div className="row">

            {/* */}
            <div className="col-12 col-md-6 global-data border-right">
              <div className="p-2 my-1 rounded-0">
                <h6 className="mb-3 color-2 fw-5">Dünya</h6>
                <div className="d-flex justify-content-between fs-12 fw-5 text-muted letter-spacing-1 text-uppercase">
                  <span>Toplam Vaka Sayısı</span>
                  {/*
                  <span></span>
                  */}
                </div>
                <div className="h2 color-1 mb-0 font-weight-bold">{global.cases.toLocaleString()}</div>

                {global ?
                <div className="progress my-3" style={{ height: '5px' }}>
                  <div className="progress-bar bg-warning" style={{ width: (global.active / global.cases * 100).toFixed(2) + "%"  }}></div>
                  <div className="progress-bar bg-success" style={{ width: (global.recovered / global.cases * 100).toFixed(2) + "%"  }}></div>
                  <div className="progress-bar bg-secondary" style={{ width: (global.deaths / global.cases * 100).toFixed(2) + "%"  }}></div>
                </div>
                : ""}

                <ul className="list-group list-group-flush">
                  <li className="d-flex justify-content-between border-0 list-group-item p-0">
                    <div className="d-flex align-items-center">
                      <span className="bg-warning p-2 rounded-1 mr-2"></span>
                      <span className="fw-5 fs-14">Onaylanmış</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fw-5 fs-14">{global.active.toLocaleString()}</span>
                      <span className="fw-5 fs-14 ml-2 px-1 bg-light-2">+{global.critical.toLocaleString()}</span>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between border-0 list-group-item p-0 my-2">
                    <div className="d-flex align-items-center">
                      <span className="bg-success p-2 rounded-1 mr-2"></span>
                      <span className="fw-5 fs-14">İyileşen</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fw-5 fs-14">{global.recovered.toLocaleString()}</span>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between border-0 list-group-item p-0">
                    <div className="d-flex align-items-center">
                      <span className="bg-secondary p-2 rounded-1 mr-2"></span>
                      <span className="fw-5 fs-14">Ölüm</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fw-5 fs-14">{global.deaths.toLocaleString()}</span>
                      <span className="fw-5 fs-14 ml-2 px-1 bg-light-2">+{global.todayDeaths.toLocaleString()}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* */}
            <div className="col-12 col-md-6">
              <div className="p-2 my-1 rounded-0">
                <h6 className="mb-3 color-2 fw-5">Türkiye</h6>
                <div className="d-flex justify-content-between align-items-center fs-12 fw-5 text-muted letter-spacing-1 text-uppercase">
                  <span>Toplam Vaka Sayısı</span>
                  <Link href={`/countries/[id]`} as={`/countries/turkey`}>
                    <i className="fas fa-long-arrow-alt-right i-link"></i>
                  </Link>
                </div>
                <div className="h2 color-1 mb-0 font-weight-bold">{turkey.cases.toLocaleString()}</div>
                <div className="progress my-3" style={{ height: '5px' }}>
                  <div className="progress-bar bg-warning" style={{ width: (turkey.active / turkey.cases * 100).toFixed(2) + "%"  }}></div>
                  <div className="progress-bar bg-success" style={{ width: (turkey.recovered / turkey.cases * 100).toFixed(2) + "%"  }}></div>
                  <div className="progress-bar bg-secondary" style={{ width: (turkey.deaths / turkey.cases * 100).toFixed(2) + "%"  }}></div>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="d-flex justify-content-between border-0 list-group-item p-0">
                    <div className="d-flex align-items-center">
                      <span className="bg-warning p-2 rounded-1 mr-2"></span>
                      <span className="fw-5 fs-14">Onaylanmış</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fw-5 fs-14">{turkey.active.toLocaleString()}</span>
                      <span className="fw-5 fs-14 ml-2 px-1 bg-light-2">+{turkey.critical.toLocaleString()}</span>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between border-0 list-group-item p-0 my-2">
                    <div className="d-flex align-items-center">
                      <span className="bg-success p-2 rounded-1 mr-2"></span>
                      <span className="fw-5 fs-14">İyileşen</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fw-5 fs-14">{turkey.recovered.toLocaleString()}</span>

                    </div>
                  </li>
                  <li className="d-flex justify-content-between border-0 list-group-item p-0">
                    <div className="d-flex align-items-center">
                      <span className="bg-secondary p-2 rounded-1 mr-2"></span>
                      <span className="fw-5 fs-14">Ölüm</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fw-5 fs-14">{turkey.deaths.toLocaleString()}</span>
                      <span className="fw-5 fs-14 ml-2 px-1 bg-light-2">+{turkey.todayDeaths.toLocaleString()}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
        :
        <div className="pt-5 mt-5">
          <div className="d-flex justify-content-center align-items-center">
            <span className="spinner-grow" style={{width: "2rem", height: "2rem"}}>
              <span className="sr-only">Loading...</span>
            </span>
          </div>
        </div>
        }

        <style jsx>{`
        .fs-12{font-size:12px}
        .fs-13{font-size:13px}
        .fs-14{font-size:14px}
        .fw-3{font-weight:300}
        .fw-5{font-weight:500}
        .fw-7{font-weight:700}
        .color-1{color: #364a63}
        .color-2{color:#5e7ea9}
        .i-link{cursor:pointer}
        .bg-light-2{background-color: #edeeef}
        .table .flag{width:21px}
        .thead-dark-2{background:#000;color: #fff;border:0}
        .rounded-1{border-radius:2.5px}
        .letter-spacing-1{letter-spacing: 0.2em}
        @media (max-width: 768px){
          .global-data{padding-bottom: 1.5rem!important;margin-bottom: 1.5rem!important;border-bottom: 1px solid #dee2e6!important;border-right: 0!important}
        }
        `}</style>
      </section>
    </Layout>
  )
}