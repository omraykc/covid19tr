import useSWR from 'swr'

import Layout from '../components/layout';

import { site_title } from '../lib/constants'
import fetch from '../lib/fetch'

export default function Blog() {
  const { data: blogs } = useSWR("https://cdn-w1-api.herokuapp.com/?url=https://sagliktr.net/category/coronavirus/feed", fetch, { refreshInterval: 60000 })
  return (
    <Layout title="Blog">
      <section>

        {/* */}
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-4">
            <h5 className="mb-0">{site_title} / Blog</h5>
          </div>
          <hr className="mt-0"></hr>
        </div>

        {/* */}
        {blogs ?
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="blog-timeline mt-2">

                {blogs.items
                .map((blog) => (
                <div className="blog-item my-2" key={blog.id}>
                  <div className="media align-items-center pl-3">
                    <div className="d-flex position-relative align-items-center media-icon">
                      <i className="fas fa-genderless text-dark"></i>
                    </div>
                    <img src="https://cdn-w1.netlify.app/w/covid19tr/covid19-blog.jpg"
                      className="mr-3 rounded-1 img-fluid" alt={blog.title} title={blog.title}/>
                    <div className="media-body">
                      <h5 className="mb-0 font-weight-bold fs-15">
                        <a href={blog.url} className="text-dark" target="_blank" rel="external nofollow">{blog.title}</a>
                      </h5>
                      <p className="fs-14 mt-1 mb-0 d-none d-sm-block">{blog.content.replace(/(<([^>]+)>)/ig,'').substring(0, 90)}...</p>
                    </div>
                  </div>
                </div>
                ))}

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
        .fs-15{font-size:15px}
        .fs-14{font-size:14px}
        .blog-timeline{position: relative;}
        .blog-timeline:before{content: "";position: absolute;display: block;width: 1px;top: 0;bottom: 0;left: 0;background-color: #dee2e6;}
        .blog-item .media img{width: 160px;height: 90px;object-fit: cover;}
        .blog-item .media .media-icon i{left: -19px;position: absolute;background-color: #fff;}
        `}</style>

      </section>
    </Layout>
  )
}