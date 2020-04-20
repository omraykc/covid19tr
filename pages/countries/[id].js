import { useRouter } from 'next/router'
import useSWR from 'swr'
import moment from 'moment'

import Layout from '../../components/layout'

import { site_title } from '../../lib/constants'
import I18n from '../../lib/i18n'
import fetcher from '../../lib/fetcher'

export default function Countries() {
  const router = useRouter()
  const { data } = useSWR(`https://api.covid19api.com/live/country/${router.query.id}`, fetcher, { refreshInterval: 60000 })
  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-4">
            <h5 className="mb-0">{site_title} / {router.query.id}</h5>
          </div>
          <hr className="mt-0"></hr>
        </div>
        <div className="container">
          <div className="row">

            {/* */}
            {data ?
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
                    {data ? data
                    .sort((a, b) => new Date(b.Date) - new Date(a.Date))
                    .map((data,i) => (
                    <tr className={"fs-14 color-1 fw-5 " +
                      (moment(data.Date).format("YYYY/MM/DD") === moment(new Date().getTime()).format("YYYY/MM/DD") ? "bg-light-2" : "")}
                      key={i}>
                      <td className="p-2">
                        <span>{I18n(data.Country)}{data.Province ? " - " + data.Province : ""}</span>
                      </td>
                      <td className="p-2 text-right">{data.Confirmed.toLocaleString()}</td>
                      <td className="p-2 text-right">{data.Recovered.toLocaleString()}</td>
                      <td className="p-2 text-right">{data.Deaths.toLocaleString()}</td>
                      <td className="p-2 text-right">{moment(data.Date).format("DD.MM.YYYY")}</td>
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
      </section>
    </Layout>
  )
}