import { useRouter } from 'next/router'
import useSWR from 'swr'

import Layout from '../../components/layout'

import { site_title } from '../../lib/constants'
import I18n from '../../lib/i18n'
import fetcher from '../../lib/fetcher'

export default function Country() {
  const router = useRouter()
  const { data: country } = useSWR(`https://disease.sh/v2/countries/${router.query.id}`, fetcher, { refreshInterval: 60000 })
  return (
    <Layout title="Ülkeler">
      <section>

        {/* */}
        <div>
          <div className="d-flex justify-content-between align-items-center py-4 px-4">
            <h5 className="mb-0">{site_title} / {country ? I18n(country.country) : null}</h5>
          </div>
          <hr className="mt-0"></hr>
        </div>

        {/* */}
        {country ?
        <React.Fragment>

          <div className="country-landing position-relative"></div>
          <div className="container flag-avatar mt-n5">
            <img src={country ? country.countryInfo.flag : null}/>
          </div>

          {/* */}
          <div className="container py-4">
            <div className="d-flex justify-content-between fs-12 fw-5 text-muted letter-spacing-1 text-uppercase">
              <span>Toplam Vaka Sayısı</span>
            </div>
            <div className="h2 color-1 mb-0 font-weight-bold">{country.cases.toLocaleString()}</div>
            <div className="progress my-3" style={{ height: '5px' }}>
              <div className="progress-bar bg-warning" style={{ width: (country.active / country.cases * 100).toFixed(2) + "%"  }}></div>
              <div className="progress-bar bg-success" style={{ width: (country.recovered / country.cases * 100).toFixed(2) + "%"  }}></div>
              <div className="progress-bar bg-secondary" style={{ width: (country.deaths / country.cases * 100).toFixed(2) + "%"  }}></div>
            </div>
            {/*
            cases
            todayCases
            deaths
            todayDeaths
            recovered
            todayRecovered
            active
            critical
            casesPerOneMillion
            deathsPerOneMillion
            tests
            testsPerOneMillion
            population
            continent
            oneCasePerPeople
            oneDeathPerPeople
            oneTestPerPeople
            activePerOneMillion
            recoveredPerOneMillion
            criticalPerOneMillion
            */}
          </div>

        </React.Fragment>
        :
        <div className="col-12 pt-5 mt-5">
          <div className="d-flex justify-content-center align-items-center">
            <span className="spinner-grow" style={{width: "2rem", height: "2rem"}}>
              <span className="sr-only">Loading...</span>
            </span>
          </div>
        </div>
        }

        <style jsx>{`
        .fs-12{font-size:12px}
        .fs-14{font-size:14px}
        .fs-15{font-size:15px}
        .fw-5{font-weight:500}
        .color-1{color: #364a63;}
        .color-2{color: #5e7ea9;}
        summary:focus{outline:0}
        .outline-0{outline-0}
        .country-landing{height: 100px;}
        .country-landing:before{content: ""; position: absolute; background: url(https://cdn-w1.netlify.app/covid19tr/covid19.jpg); width: 100%; height: 100%; background-position: center;}
        .letter-spacing-1{letter-spacing: 0.3em;}
        .flag-avatar{z-index: 1;position: relative;}
        .flag-avatar img{height: 90px; width: 150px; object-fit: cover; border: 4px solid #fff; border-radius: 2px;}
        `}</style>

      </section>
    </Layout>
  )
}