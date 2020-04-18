import { useRouter } from 'next/router'
import useSWR from 'swr'
import moment from 'moment';

import I18n from '../../components/i18n';
import Layout from '../../components/layout';
import Nav from '../../components/nav';
import fetcher from '../../libs/fetcher'
import { site_title } from '../../libs/config'

export default function Countries() {
  const { query } = useRouter()
  const { data: country } = useSWR(`https://api.covid19api.com/live/country/${query.id}`, fetcher, { refreshInterval: 60000 })
  return (
    <Layout title="">
      <main>
        <Nav/>
        <section className="pt-4 pl-md-5 ml-md-3">
          <div className="container-fluid">
            <h5>{site_title}</h5>
            <hr className="mt-4"></hr>
          </div>
          <div className="container">
            <div className="row">

              {/* */}
              {country ?
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-sm table-centered table-nowrap">
                    <thead>
                      <tr className="fs-11 color-2">
                        <th className="fw-5 letter-spacing-1 text-uppercase border-0">Tarih</th>
                        <th className="fw-5 letter-spacing-1 text-uppercase border-0 text-right">Onaylanmış</th>
                        <th className="fw-5 letter-spacing-1 text-uppercase border-0 text-right">İyileşen</th>
                        <th className="fw-5 letter-spacing-1 text-uppercase border-0 text-right">Ölüm</th>
                        <th className="fw-5 letter-spacing-1 text-uppercase border-0 text-right">Tarih</th>
                      </tr>
                    </thead>
                    <tbody>

                      {/* */}
                      {country ? country
                      .sort((a, b) => new Date(b.Date) - new Date(a.Date))
                      .map((country,i) => (
                      <tr className={"fs-14 color-1 fw-5 " +
                        (moment(country.Date).format("YYYY/MM/DD") === moment(new Date().getTime()).format("YYYY/MM/DD") ? "bg-light-2" : "")}
                        key={i}>
                        <td className="p-2">
                          <span>{I18n(country.Country)}{country.Province ? " - " + country.Province : ""}</span>
                        </td>
                        <td className="p-2 text-right">{country.Confirmed.toLocaleString()}</td>
                        <td className="p-2 text-right">{country.Recovered.toLocaleString()}</td>
                        <td className="p-2 text-right">{country.Deaths.toLocaleString()}</td>
                        <td className="p-2 text-right">{moment(country.Date).format("DD.MM.YYYY")}</td>
                      </tr>
                      )) : ""}

                    </tbody>
                  </table>
                </div>
              </div>
              :
              <div className="col-12 pt-5 mt-5">
                <div className="d-flex justify-content-center align-items-center">
                  <span className="spinner-grow" style={{width: "2rem", height: "2rem"}}>
                    <span className="sr-only">Loading...</span>
                  </span>
                </div>
              </div>
              }

            </div>
          </div>
        </section>
        <style jsx>{`
        .fs-11{font-size:11px}
        .fs-14{font-size:14px}
        .fw-5{font-weight:500}
        .color-1{color: #364a63}
        .color-2{color:#5e7ea9}
        .bg-light-2{background: #f5f5f5;}
        .table-nowrap th,
        .table-nowrap td {white-space: nowrap;}
        .table-centered td,
        .table-centered th{vertical-align: middle !important;}
        .letter-spacing-1{letter-spacing: 0.2em}
        `}</style>
      </main>
    </Layout>
  )
}