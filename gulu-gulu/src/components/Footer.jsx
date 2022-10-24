export default function Footer() {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="text-center p-5 border-t border-gray-300">
      <p>© 2022 GuluGulu</p>
      <a
        href="javascript:void(0)"
        className="hover:underline text-blue-700"
        onClick={backToTop}
      >
        Back to top
      </a>
    </div>
  );
}
