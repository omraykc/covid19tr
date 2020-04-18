import Layout from '../components/layout';
import { site_title } from '../libs/config'

export default function Demo() {
  return (
    <Layout title="Demo">
      <section>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-4">
            <h5 className="mb-0">{site_title} / Demo</h5>
          </div>
          <hr className="mt-0"></hr>
        </div>
        <div className="container">
          <div className="row">

            {/* */}
            <div className="col-12">
              <div className="text-center">
                <p className="fs-14 mb-0">Demo</p>
              </div>
            </div>

          </div>
        </div>
        <style jsx>{`
        .fs-14{font-size:14px}
        `}</style>
      </section>
    </Layout>
  )
}