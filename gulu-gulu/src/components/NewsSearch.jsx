import moment from "moment";

export default function NewsSearch({
  results,
  isLogin,
  bookmarkData,
  setBookmarkData,
}) {
  return (
    <div
      className="flex flex-wrap justify-center space-y-6 sm:px-56 p-5"
      data-testid="newsSearch"
    >
      {results.map(
        ({ datePublished, provider, image, name, description, url }, index) => (
          <div className="grid grid-flow-col gap-5" key={index}>
            <div className="w-full">
              <a href={url} target="_blank" rel="noreferrer">
                {provider && provider[0] && (
                  <p className="text-sm">{provider[0].name}</p>
                )}
                <p className="text-lg hover:underline text-blue-700">{name}</p>
              </a>
              <p>{description}</p>
              <p className="text-sm mt-1">
                {moment(datePublished).startOf("day").fromNow()}
              </p>
            </div>
            <div className="flex justify-center items-center">
              {image && image.thumbnail && (
                <img
                  src={image.thumbnail.contentUrl}
                  alt={image.thumbnail.contentUrl}
                  loading="lazy"
                  className="w-30 rounded"
                />
              )}
            </div>
            <div className="flex justify-center items-center pl-1">
              {isLogin ? (
                <button
                  onClick={() => {
                    setBookmarkData({
                      ...bookmarkData,
                      datePublished,
                      provider: provider[0].name,
                      image: !image ? "" : image.thumbnail.contentUrl,
                      name,
                      description,
                      url,
                    });
                  }}
                >
                  <svg
                    id="icon"
                    className="w-6 h-6 hover:fill-blue-500 stroke-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                </button>
              ) : null}
            </div>
          </div>
        )
      )}
    </div>
  );
}
