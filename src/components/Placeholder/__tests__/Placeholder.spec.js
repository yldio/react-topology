import React from "react";
import renderer from "react-test-renderer";

import Placeholder from "../Placeholder";

it("renders <Placeholder /> without throwing", () => {
  const tree = renderer.create(<Placeholder />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders <Placeholder /> with props", () => {
  const tree = renderer.create(<Placeholder type="animal" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders <Placeholder /> with invalid props", () => {
  const tree = renderer.create(<Placeholder type="doesnotexist" />).toJSON();
  expect(tree).toMatchSnapshot();
});
