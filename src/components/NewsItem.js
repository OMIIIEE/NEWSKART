import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date,source } = this.props; //destructuring ...here this.props object hai jo ki description display karayega

    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1' }}>
                {source}
              </span>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}{" "}
              
            </h5>
            <p className="card-text">{description}</p>

            <p className="card-text">
              <small className="text-body-primary">
                by {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>

            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
