import Link from 'next/link'
import useSWR from 'swr'

import I18n from '../../components/i18n';
import Layout from '../../components/layout';
import fetcher from '../../libs/fetcher'
import { site_title } from '../../libs/config'

export default function Countries() {
  const { data: countries } = useSWR("https://api.covid19api.com/summary", fetcher, { refreshInterval: 60000 })
  return (
    <Layout title="Ülkeler">
      <section>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-4">
            <h5 className="mb-0">{site_title} / Ülkeler</h5>
          </div>
          <hr className="mt-0"></hr>
        </div>
        <div className="container">
          <div className="row">

            {/* */}
            {countries ?
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-sm table-centered table-nowrap">
                  <thead>
                    <tr className="fs-11 color-2">
                      <th className="fw-5 letter-spacing-1 text-uppercase border-0">Konum</th>
                      <th className="fw-5 letter-spacing-1 text-uppercase border-0 text-right">Onaylanmış</th>
                      <th className="fw-5 letter-spacing-1 text-uppercase border-0 text-right">İyileşen</th>
                      <th className="fw-5 letter-spacing-1 text-uppercase border-0 text-right">Ölüm</th>
                    </tr>
                  </thead>
                  <tbody>

                    {/* */}
                    {countries ? countries.Countries && countries.Countries.filter((country) => country.TotalConfirmed >= "1")
                    .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
                    .map((country,i) => (
                    <tr className={"fs-14 color-1 fw-5 " + "country-" + country.Slug} key={i}>
                      <td className="p-2">
                        <div className="d-flex align-center">
                          <span className="mr-1">{i + 1}</span>
                          <img src={"https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/" + country.CountryCode.toLowerCase() + ".png"} className="flag mr-2"></img>
                          <Link href={`/countries/[id]`} as={`/countries/${country.Slug}`}>
                            <span className="country-title">{I18n(country.Country)}</span>
                          </Link>
                        </div>
                      </td>
                      <td className="p-2 text-right">{country.TotalConfirmed.toLocaleString()}</td>
                      <td className="p-2 text-right">{country.TotalRecovered.toLocaleString()}</td>
                      <td className="p-2 text-right">{country.TotalDeaths.toLocaleString()}</td>
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
        .country-title{cursor:pointer}
        .country-title:hover{color:#b7b7b7}
        .country-turkey{background-color: #edeeef}
        .table-nowrap th,
        .table-nowrap td {white-space: nowrap}
        .table-centered td,
        .table-centered th{vertical-align: middle !important}
        .flag{width:21px}
        .letter-spacing-1{letter-spacing: 0.2em}
        `}</style>
      </section>
    </Layout>
  )
}