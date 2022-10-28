import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MemoryRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import HomeNavbar from "../HomeNavbar";

afterEach(() => {
  cleanup();
});

const history = createMemoryHistory();
const setSearchType = jest.fn();
const setNavbar = jest.fn();

test("Render Home Navbar", () => {
  render(
    <Router>
      <HomeNavbar />
    </Router>
  );
  const navElement = screen.getByTestId("navbar");
  expect(navElement).toBeInTheDocument();
  expect(navElement).toHaveTextContent("Normal Search");
  expect(navElement).toContainHTML("button");
  expect(navElement).toContainHTML("svg");
  expect(navElement).toContainHTML("path");
  expect(navElement).toContainHTML("ul");
  expect(navElement).toContainHTML("li");
});

test("Matches snapshots", () => {
  const tree = renderer
    .create(
      <Router>
        <HomeNavbar />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
