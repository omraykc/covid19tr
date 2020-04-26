import Link from 'next/link'
import useSWR from 'swr'

import Layout from '../components/layout';

import { site_title } from '../lib/constants'
import fetcher from '../lib/fetcher'
import Timer from '../lib/timer'

export default function Index() {
  const { data: global } = useSWR("https://corona.lmao.ninja/v2/all", fetcher, { refreshInterval: 60000 })
  const { data: turkey } = useSWR("https://corona.lmao.ninja/v2/countries/tr", fetcher, { refreshInterval: 60000 })
  return (
    <Layout title="Anasayfa">
      <section>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-4">
            <h5 className="mb-0">{site_title}</h5>
            {global && turkey ?
            <p className="mb-0 fs-13 text-muted">
              <Timer date={global ? global.updated : ""}/>
            </p>
            : ""}
          </div>
          <hr className="mt-0"></hr>
        </div>

        {/* */}
        <div className="landing position-relative mb-3">
          <div className="container">
            <div className="row">
              <div className="col-12">

                {/* */}
                <div className="py-5">
                  <h1 className="mb-3 h4">Yeni Koronavirüs Hastalığı (COVID-19)</h1>
                  <p className="mb-0 fs-14 l-desc text-white-50">Koronavirusler (CoV), soğuk algınlığından Orta Doğu Solunum Sendromu (MERS-CoV) ve Şiddetli Akut Solunum Sendromu (SARS-CoV) gibi daha ciddi hastalıklara kadar çeşitli hastalıklara neden olan büyük bir virüs ailesidir. </p>
                </div>

              </div>
            </div>
          </div>
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
        .l-desc{width: 70%}
        .i-link{cursor:pointer}
        .bg-light-2{background-color: #edeeef}
        .landing:before{content: "";position: absolute;background: url(https://cdn-w1.netlify.app/covid19tr/covid19.jpg);width: 100%;height: 100%;background-position: center;}
        .landing h1{color:#fff}
        .landing img{height: 250px;width: 100%;object-fit: cover;object-position: center}
        .thead-dark-2{background:#000;color: #fff;border:0}
        .rounded-1{border-radius:2.5px}
        .letter-spacing-1{letter-spacing: 0.2em}
        @media (max-width: 768px){
          .l-desc{width: 100%}
          .global-data{padding-bottom: 1.5rem!important;margin-bottom: 1.5rem!important;border-bottom: 1px solid #dee2e6!important;border-right: 0!important}
        }
        `}</style>
      </section>
    </Layout>
  )
}