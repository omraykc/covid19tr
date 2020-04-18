import Layout from '../components/layout';
import Nav from '../components/nav';
import { site_title } from '../libs/config'

export default function Error() {
  return (
    <Layout title="404">
      <main className="positon-relative">
        <Nav/>
        <section className="pt-4 pl-5 ml-3">
          <div className="container-fluid">
            <h5>{site_title} / 404</h5>
            <hr className="mt-4"></hr>
          </div>
        </section>
        <section className="pl-5 ml-3">
          <div className="container">
            <div className="row">

              {/* */}
              <div className="col-12">
                <div className="text-center">
                  <p className="fs-14 mb-0">Aradığın sayfayı bulamadık.</p>
                </div>
              </div>

            </div>
          </div>
        </section>
        <style jsx>{`
        .fs-14{font-size:14px}
        `}</style>
      </main>
    </Layout>
  )
}