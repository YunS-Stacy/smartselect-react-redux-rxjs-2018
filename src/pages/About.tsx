import * as React from 'react';
import Layout from '../components/Layout';

class About extends React.Component {
  state = {
    open: false,
  };

  render() {
    return(
      <div
        className="app-container"
      >
        <Layout>
          <section className="section-projects">
            <article className="article-wrapper">
              <div
                className="modal-project"
                style={{
                  zIndex: 1,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  left: 0,
                  top: 0,
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,.75)',
                }}
                hidden={this.state.open}
                onClick={() => {
                  this.setState({
                    open: !this.state.open,
                  });
                }}
              >
                <iframe
                  style={{
                    border: 'none',
                    width: '50%',
                    height: 'auto',
                  }}
                  src="https://www.figma.com/embed?embed_host=share
                  &url=https://www.figma.com/proto/ILX9LVRWcyUBkRubZq2PJmCH/FeasibilityAppUX?
                  scaling=contain&node-id=2%3A29"
                  allowFullScreen={true}
                />
              </div>

              <a
                className="article-link"
                onClick={() => {
                  this.setState({
                    open: !this.state.open,
                  });
                }}
              >
                <header className="article-heading">
                  <code className="article-index">SELECTED WORKS 01/03</code>
                  <h3 className="article-title">Real Estate Feasibility App</h3>
                  <hr className="article-separator"/>
                  <div className="article-text">
                    <div className="text-column">
                      <h5>Roles</h5>
                      <ul className="list">
                        <li>UI/UX Design</li>
                        <li>Web Development</li>
                      </ul>
                    </div>
                    <div className="text-column">
                      <h5>Skills</h5>
                      <ul className="list">
                      {['React + Redux', 'RxJS', 'JavaScript', 'HTML/CSS', 'Adobe Creative Suite'].map(item =>
                      <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="article-footer">
                    <span className="footer-text">SEE THIS PROJECT</span>
                    <span> →</span>
                  </div>
                </header>

                <figure className="article-figure">
                  <img
                    className="article-img"
                    src="http://madebychaun.com/wp-content/uploads/2017/02/work-formidable-ft.jpg"
                    alt="SmartSeletct"
                  />
                </figure>

                {/* https://yuns-stacy.github.io/geotrellis-angular-demo/dashboard */}
              </a>
            </article>
          </section>
        </Layout>
      </div>
    );
  }
}

export default About;
