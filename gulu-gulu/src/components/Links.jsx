import { Link, useLocation } from "react-router-dom";

export default function Links() {
  const links = [
    { url: "/search", text: "🔎 All" },
    { url: "/images", text: "📸 Images" },
    { url: "/news", text: "📰 News" },
  ];

  const location = useLocation();

  return (
    <div
      className="flex sm:justify-around justify-between items-center mt-4 xs:w-[10px] xsm:w-[10px]"
      data-testid="links"
    >
      {links.map(({ url, text }, index) => (
        <Link to={url} key={index}>
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
