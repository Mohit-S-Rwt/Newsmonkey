import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const capializeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  
  const  updateNews = async()=>{
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=85e8865f68cb441bb2e8539c91977ac5&page=${page}&pageSize=${props.pageSize}`;
    // loading: true;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title = `${capializeFirstLetter( props.category)} - NewsMonkey`;
    updateNews()
    
  }, [])
  
  // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=85e8865f68cb441bb2e8539c91977ac5&page=1&pageSize=${props.pageSize}`;
  // this.setState({ loading: true });
  // let data = await fetch(url);
  // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
      // articles: parsedData.articles,
      // totalResults: parsedData.totalResults,
      // loading: false,
    // });
    
    // handlePrevclick = async () => {
      // console.log("previous click");
      // // let url = `https://newsapi.org/v2/top-headlines?country=${
        // props.country
        // }&category=${
          // props.category
          // }&apiKey=85e8865f68cb441bb2e8539c91977ac5&page=${
            // this.state.page - 1
            // }&pageSize=${props.pageSize}`;
            
            // this.setState({ loading: true });
            // let data = await fetch(url);
            // let parsedData = await data.json();
            // console.log(parsedData);
            // this.setState({
              // page: this.state.page - 1,
              // articles: parsedData.articles,
              // loading: false,
              // });
              // this.setState({ page: this.state.page - 1 });
              // this.updateNews();
              // };
              // handleNextclick = async () => {
    // console.log("next click");
    // if (
      // !(
        // this.state.page + 1 >
        // // Math.ceil(this.state.totalResults / props.pageSize)
        // )
        // ) {
          // // let url = `https://newsapi.org/v2/top-headlines?country=${
            // props.country
            // }&category=${
              // props.category
              // }&apiKey=85e8865f68cb441bb2e8539c91977ac5&page=${
                // this.state.page + 1
                // }&pageSize=${props.pageSize}`;
                
                // this.setState({ loading: true });
                // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
      // page: this.state.page + 1,
      // articles: parsedData.articles,
      // loading: false,
      // });
      // }
      // this.setState({ page: this.state.page + 1 });
      // this.updateNews();
      // };
      
      const fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=85e8865f68cb441bb2e8539c91977ac5&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page +1)
        
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };
      
      
      return (
        <>
        <div className="text-center" style={{ margin: "35px 0px" , marginTop:'90px'}}>
          <h1>NewsMonkey - Top{capializeFirstLetter( props.category)} Headlines</h1>
        </div>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

         
          <div className="row">
            {/* {loading &&} */}
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
                
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between"> */}
          {/* <button */}
            {/* // disabled={this.state.page <= 1} */}
            {/* // type="button" */}
            {/* // className="btn-btn-dark" */}
            {/* // onClick={this.handlePrevclick} */}
          {/* // > */}
            {/* &larr; previous */}
          {/* </button> */}
          {/* <button */}
            {/* // disabled={ */}
              {/* // this.state.page + 1 > */}
              {/* // Math.ceil(this.state.totalResults / props.pageSize) */}
            {/* // } */}
            {/* // type="button" */}
            {/* // className="btn-btn-dark" */}
            {/* // onClick={this.handleNextclick} */}
          {/* // > */}
            {/* next &rarr; */}
          {/* </button> */}
        {/* </div> */}
       </>
    )
  }



News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
