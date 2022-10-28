import { render, cleanup, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import Loading from "../Loading";

afterEach(() => {
  cleanup();
});

test("Render loading", () => {
  render(<Loading />);
  const loadingElement = screen.getByTestId("loading");
  expect(loadingElement).toBeInTheDocument();
  expect(loadingElement).toContainHTML("svg");
  expect(loadingElement).toContainHTML("rect");
  expect(loadingElement).toContainHTML("animate");
});

test("Matches snapshots", () => {
  const tree = renderer.create(<Loading />).toJSON();
  expect(tree).toMatchSnapshot();
});
