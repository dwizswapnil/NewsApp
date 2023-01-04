import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
// import { getSelectionRange } from "@testing-library/user-event/dist/utils";
// import { getDefaultNormalizer } from "@testing-library/react";

export class News extends Component {

   defaultprops = {
    country : 'in', 
    category : 'general'
    
  }

   static  propTypes = {
    country : PropTypes.string,
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f2ea78ed7c242c998c918fbe4bd7ed5&page=1`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, loading: false });
    console.log("hii");
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f2ea78ed7c242c998c918fbe4bd7ed5&page=${
      this.state.page - 1
    }`;

    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f2ea78ed7c242c998c918fbe4bd7ed5&page=${
      this.state.page + 1
    }`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    return (


      <div className="container my-3 ">

        <h1 className="text-center"> NewsPanda-Top Headlines </h1>

        {this.state.loading && <Spinner />}

      

        <div className="row">
          { !this.state.loading &&   this.state.articles.map((element) => {
            return (
              
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 85) : ""
                  }
                  imageurl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://i-invdn-com.investing.com/news/OPEC_800x533_L_1601882884.jpg"
                  }
                  newsurl={element.url}
                />
              </div>
              
            );
          })}
        </div>
        <div className="conatiner d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            class="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
        
      </div>
    );
  }
}

export default News;
