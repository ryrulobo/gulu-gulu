import { render, cleanup, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import ImageSearch from "../ImageSearch";

afterEach(() => {
  cleanup();
});

const results = [
  {
    hostPageUrl: "test.com",
    thumbnailUrl: "test.com/image.png",
    name: "this is test title",
  },
];

test("Render image search", () => {
  render(<ImageSearch results={results} />);
  const imageSearchElement = screen.getByTestId("imageSearch");
  expect(imageSearchElement).toBeInTheDocument();
  expect(imageSearchElement).toContainHTML("a");
  expect(imageSearchElement).toContainHTML("img");
  expect(imageSearchElement).toContainHTML("p");
  expect(imageSearchElement.children).toHaveLength(1);
});

test("Matches snapshots", () => {
  const tree = renderer.create(<ImageSearch results={results} />).toJSON();
  expect(tree).toMatchSnapshot();
});
