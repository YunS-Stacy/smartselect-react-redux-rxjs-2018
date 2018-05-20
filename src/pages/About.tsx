import * as React from 'react';
import Layout from '../components/Layout';
const About = () => (
  <div
    className="app-container"
  >
    <Layout>
      <section className="section-projects">
        <article className="article-project">
          <a className="article-link-wrapper">
            <header className="header-article">
              <code className="header-index">Fig. 1</code>
              <h3 className="title-article">
                <span className="oh">
                  <span className="">Building</span>
                </span>
                <span className="oh">
                  <span className="">a</span>
                </span>
                <span className="oh"><span className="">modern</span></span>
                <span className="oh"><span className="">web</span></span>
              </h3>
              <hr className="separator-article"/>
              <div className="footer-article">
                <span className="footer-text">SEE THIS PROJECT</span>
                <span> →</span>
              </div>
            </header>

            <figure className="figure-article">
              <img
                className="img-article"
                src="http://madebychaun.com/wp-content/uploads/2017/02/work-formidable-ft.jpg"
                alt="SmartSeletct"
              />
            </figure>
          </a>
        </article>
      </section>
    </Layout>
  </div>
);

export default About;
