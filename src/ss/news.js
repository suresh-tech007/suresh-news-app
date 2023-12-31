import React, { Component } from "react";
import NewsItem from "./NewsItem";

import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 6,
    category: "general",
    // pagesize:5,
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pagesize: PropTypes.number, // Updated to lowercase 'pagesize'
  };
  
  constructor(props) {
    super(props);
    console.log("this is a constructor in my news app ");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category} By suresh news`;
  }

  async updatedata() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&category=${this.props.category}&apiKey=4d68c4278a094047ae7b6d2379a382b7&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updatedata();
   
  }
  handlenextClick = async () => {
    
    this.setState({ page: this.state.page + 1 });
    this.updatedata();
  };

  handleprevClick = async () => {
    
    this.setState({ page: this.state.page - 1 });
    this.updatedata();
  };
 fetchMoreData = async  () => {
   this.setState({
    page: this.state.page+1,
   })
   let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&category=${this.props.category}&apiKey=4d68c4278a094047ae7b6d2379a382b7&page=${this.state.page}&pageSize=${this.props.pagesize}`;
   this.setState({ loading: true });
   let data = await fetch(url);
   let parsedata = await data.json();
   this.setState({
     articles: this.state.articles.concat(parsedata.articles),
     totalResults: parsedata.totalResults,
     loading: false,
   });
  };
  render() {
    return (<>
      
      <div className="container my-3 text-center">
        <h2>{`Top ${this.props.category} Headlines `} </h2>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}

          loader={<h4>Loading...</h4>}
        >
          <div className="row mx-5">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-3 mx-4 my-4  " key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description?element.description.slice(0, 88): ""}
                    author={element.author}
                    date={element.publishedAt}
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
       

      </div>
      </>
    );
  }
}

export default News;
