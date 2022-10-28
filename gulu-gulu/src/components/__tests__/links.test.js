import { render, cleanup, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import Links from "../Links";

afterEach(() => {
  cleanup();
});

const links = [
  { url: "/search", text: "🔎 All" },
  { url: "/images", text: "📸 Images" },
  { url: "/news", text: "📰 News" },
];

test("Render links", () => {
  render(
    <BrowserRouter>
      <Links links={links} />
    </BrowserRouter>
  );
  const linksElement = screen.getByTestId("links");
  expect(linksElement).toBeInTheDocument();
  expect(screen.getByText("🔎 All")).toBeInTheDocument();
  expect(screen.getByText("📸 Images")).toBeInTheDocument();
  expect(screen.getByText("📰 News")).toBeInTheDocument();
  expect(linksElement).toContainHTML("p");
  expect(linksElement.children).toHaveLength(3);
});

test("Matches snapshots", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Links links={links} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
