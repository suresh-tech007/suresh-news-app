import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgurl, newsurl, author, date, source } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <span
            class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "90%", zIndex: 1 }}
          >
            {source}
          </span>
          <img
            src={
              imgurl
                ? imgurl
                : "https://i.insider.com/658b8cb3ab6f2ebb11f70079?width=1200&format=jpeg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <snall className="text-muted">
                By {author ? author : "unknow"} on{" "}
                {new Date(date).toGMTString()}{" "}
              </snall>
            </p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
