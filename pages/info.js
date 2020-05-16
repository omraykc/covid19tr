import Layout from '../components/layout';

import { site_title } from '../lib/constants'

export default function Info() {
  return (
    <Layout title="Bilgi">
      <section>

        {/* */}
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-4">
            <h5 className="mb-0">{site_title} / Bilgi</h5>
          </div>
          <hr className="mt-0"></hr>
        </div>

        {/* */}
        <div className="container">
          <div className="row">
            <div className="col-12">

              {/* */}
              <div className="mt-4">
                <h5>İletişim</h5>
                <div>
                  <img src="https://img.shields.io/badge/discord-%C3%87a%C4%9Fatay%234442-7289DA.svg" title="Discord'da bana ulaşın"/>
                </div>
                <div>
                  <img src="https://img.shields.io/badge/mail-cagatayldzz@gmail.com-%23373737.svg"/>
                </div>
              </div>

            </div>
          </div>
        </div>

        <style jsx>{`
        .fs-15{font-size:15px}
        .fs-14{font-size:14px}
        `}</style>

      </section>
    </Layout>
  )
}