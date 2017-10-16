import React from "react";
import renderer from "react-test-renderer";

import CounterButton from "../CounterButton";

it("renders <CounterButton /> without throwing", () => {
  const tree = renderer.create(<CounterButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
