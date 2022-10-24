import { Link, useLocation } from "react-router-dom";

export default function Links() {
  const links = [
    { url: "/search", text: "🔎 All" },
    { url: "/images", text: "📸 Images" },
    { url: "/news", text: "📰 News" },
  ];

  const location = useLocation();

  return (
    <div className="flex sm:justify-around justify-between items-center mt-4">
      {links.map(({ url, text }) => (
        <Link to={url}>
          <p
            className={
              location.pathname === url
                ? "text-blue-700 border-b-2 border-blue-700 pb-1 pr-5"
                : "text-gray-700 pb-0 pr-5"
            }
          >
            {text}
          </p>
        </Link>
      ))}
    </div>
  );
}
