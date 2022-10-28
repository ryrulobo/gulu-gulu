import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";

import Footer from "../Footer";

afterEach(() => {
  cleanup();
});

const backToTop = jest.fn();
global.scrollTo = backToTop;

test("Render footer", () => {
  render(<Footer />);
  const footerElement = screen.getByTestId("footer");
  expect(footerElement).toBeInTheDocument();
  expect(footerElement).toHaveTextContent("© 2022 GuluGulu");
  expect(footerElement).toContainHTML("p");
  expect(footerElement).toContainHTML("button");
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(backToTop).toHaveBeenCalled();
});

test("Matches snapshots", () => {
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});
