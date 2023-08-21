import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  // state hm tab use karte hai jab koi chiz baar baar aapko chahiye change ho screen pe
  static defualtProps ={
    country : 'in',
    pageSize : 8,
    category:'general'
  }
// defaultprops ya proptypes dono likkh skte hai 
  static propTypes ={
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category : PropTypes.string
  }

   capitlizeText=(word) =>
  {
      return word.charAt(0).toUpperCase() + word.slice(1);
  }

  constructor(props) {
    //can set the states of all items by using constructor
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    } 
    document.title=`${this.capitlizeText(this.props.category)}-NEWSKART`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=60e39aca68904c928f803856b879eef4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
   
    this.updateNews();
  }

  handlePrevClick = async () => {
   
    this.setState({page: this.state.page - 1});
    this.updateNews();
  };

  handleNextClick = async () => {
   
    this.setState({page: this.state.page + 1});
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center " style={{ margin: '35px 0px', marginTop: '90px' }}>NEWSKART - Top {this.capitlizeText(this.props.category)} Headlines   </h1>

        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                {/*md-medium devices mein 4 col le legi */}
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-sm btn-dark "
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-sm btn-dark mx-2"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>

        {/* calling handleNextClick with this.handleNextClick becoz we are using classes */}
      </div>
    );
  }
}

export default News;
