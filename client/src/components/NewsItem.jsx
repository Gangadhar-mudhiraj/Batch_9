export default function NewsItem({ news }) {
    console.log(news.title);
    return (
        <>
            {news.title !== "[Removed]" && (
                <div
                    className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 py-2 px-2"
                    style={{ maxWidth: "345px" }}
                >
                    <img
                        src={news.urlToImage}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "200px", width: "325px" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{news.title.slice(0, 50)}</h5>
                        <p className="card-text">
                            {news.description
                                ? news.description.slice(0, 90)
                                : "News will be loaded soon"}
                        </p>
                        <a href={news.url} className="btn btn-primary">
                            Read More
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
