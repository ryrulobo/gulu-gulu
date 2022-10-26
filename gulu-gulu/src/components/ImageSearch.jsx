export default function ImageSearch({ results }) {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {results.map(({ hostPageUrl, thumbnailUrl, name }, index) => (
        <a
          className="sm:p-3 p-5"
          href={hostPageUrl}
          key={index}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={thumbnailUrl}
            alt={"name"}
            loading="lazy"
            className="max-w-36 max-h-48 hover:scale-105 ease-in duration-100"
          />
          <div className="hover:underline">
            <p className="text-sm mt-2">
              {name && name.length > 40 ? name.substring(0, 40) : name}
            </p>
            <p className="text-sm">
              {hostPageUrl && hostPageUrl.length > 40
                ? hostPageUrl.substring(0, 40)
                : hostPageUrl}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
