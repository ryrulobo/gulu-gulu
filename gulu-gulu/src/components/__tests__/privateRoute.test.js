import { render, cleanup, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";

afterEach(() => {
  cleanup();
});

localStorage.setItem("access_token", "dummy_token");
const access_token = localStorage.getItem("access_token");

test("Render private route", () => {
  render(
    <BrowserRouter>
      <PrivateRoute access_token={access_token} />
    </BrowserRouter>
  );
  const privateRouteElement = screen.getByTestId("privateRoute");
  expect(privateRouteElement).toBeInTheDocument();
});

test("Matches snapshots", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <PrivateRoute access_token={access_token} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
