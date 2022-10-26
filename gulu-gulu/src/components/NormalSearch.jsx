export default function NormalSearch({ results }) {
  return (
    <div className="flex flex-wrap justify-center space-y-5 sm:px-56 p-5">
      {results.map(({ displayUrl, name, snippet }, index) => (
        <div key={index} className="w-full">
          <a href={displayUrl} target="_blank" rel="noreferrer">
            {displayUrl && (
              <p className="text-sm">
                {displayUrl.length > 80
                  ? displayUrl.substring(0, 30)
                  : displayUrl}
              </p>
            )}
            <p className="text-lg hover:underline text-blue-700">{name}</p>
          </a>
          <p>{snippet}</p>
        </div>
      ))}
    </div>
  );
}
