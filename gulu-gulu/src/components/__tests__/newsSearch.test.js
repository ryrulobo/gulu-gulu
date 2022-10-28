import { render, cleanup, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import NewsSearch from "../NewsSearch";

afterEach(() => {
  cleanup();
});

const results = [
  {
    datePublished: "2022-10-27T19:04:14.922Z",
    provider: "test.com",
    image: { thumbnail: { contentUrl: "test.com/image-thumbnail" } },
    name: "news title",
    description: "this is test title",
    url: "test.com/news-test",
  },
];

const isLogin = true;

test("Render news search", () => {
  render(<NewsSearch results={results} isLogin={isLogin} />);
  const newsSearchElement = screen.getByTestId("newsSearch");
  expect(newsSearchElement).toBeInTheDocument();
  expect(newsSearchElement).toContainHTML("a");
  expect(newsSearchElement).toContainHTML("img");
  expect(newsSearchElement).toContainHTML("p");
  expect(newsSearchElement).toContainHTML("button");
  expect(newsSearchElement).toContainHTML("svg");
  expect(newsSearchElement).toContainHTML("path");
});

test("Matches snapshots", () => {
  const tree = renderer
    .create(<NewsSearch results={results} isLogin={isLogin} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
