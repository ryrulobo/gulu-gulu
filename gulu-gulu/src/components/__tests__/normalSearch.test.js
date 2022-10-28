import { render, cleanup, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import NormalSearch from "../NormalSearch";

afterEach(() => {
  cleanup();
});

const results = [
  {
    displayUrl: "test.com/results",
    name: "Test title",
    snippet: "This is test title",
  },
];

test("Render normal search", () => {
  render(<NormalSearch results={results} />);
  const normalSearchElement = screen.getByTestId("normalSearch");
  expect(normalSearchElement).toBeInTheDocument();
  expect(normalSearchElement).toContainHTML("a");
  expect(normalSearchElement).toContainHTML("p");
  expect(normalSearchElement.children).toHaveLength(1);
});

test("Matches snapshots", () => {
  const tree = renderer.create(<NormalSearch results={results} />).toJSON();
  expect(tree).toMatchSnapshot();
});
