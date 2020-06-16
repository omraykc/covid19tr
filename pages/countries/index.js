import useSWR from 'swr'
import Link from 'next/link'

import Layout from '../../components/layout'

import { site_title } from '../../lib/constants'
import I18n from '../../lib/i18n'
import fetcher from '../../lib/fetcher'

export default function Countries() {
  const { data: countries } = useSWR("https://disease.sh/v2/countries?sort=cases", fetcher, { refreshInterval: 60000 })
  return (
    <Layout title="Ülkeler">
      <section>

        {/* */}
        <div>
          <div className="d-flex justify-content-between align-items-center py-4 px-4">
            <h5 className="mb-0">{site_title} / Ülkeler</h5>
          </div>
          <hr className="mt-0"></hr>
        </div>

        {/* */}
        <div className="container my-4">
          <div className="row">

            {countries ? countries
            .map((country,i) => (
            <div className="col-12 col-md-6 col-lg-4" key={i}>
              <div className="border rounded-0 mb-3">
                <div className="position-relative p-3">

                  <div className="d-flex justify-content-between">
                    <h6 className="mb-3 color-2 fw-5">{i + 1} - {I18n(country.country)}</h6>
                    <img src={country.countryInfo.flag} className="flag-bg"/>
                  </div>

                  <div className="d-flex justify-content-between align-items-center fs-12 fw-5 text-muted letter-spacing-1 text-uppercase">
                    <span>Toplam Vaka Sayısı</span>
                    <Link href={`/countries/[id]`} as={`/countries/${country.country}`}>
                      <i className="fas fa-long-arrow-alt-right i-link"></i>
                    </Link>
                  </div>
                  <div className="h4 color-1 mb-0 font-weight-bold">{country.cases.toLocaleString()}</div>
                </div>
              </div>
            </div>
            )) :
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
        .fs-10{font-size:10px}
        .fs-11{font-size:11px}
        .fs-12{font-size:12px}
        .fs-14{font-size:14px}
        .fs-15{font-size:15px}
        .fw-5{font-weight:500}
        .color-1{color: #364a63;}
        .color-2{color: #5e7ea9;}
        summary:focus{outline:0}
        .outline-0{outline-0}
        .i-link{cursor: pointer}
        .letter-spacing-1{letter-spacing: 0.3em;}
        .flag-bg{height: 20px;width: 30px;object-fit: cover;}
        `}</style>

      </section>
    </Layout>
  )
}