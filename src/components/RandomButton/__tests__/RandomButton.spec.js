import React from "react";
import renderer from "react-test-renderer";

import RandomButton from "../RandomButton";

it("renders <RandomButton /> without throwing", () => {
  const tree = renderer
    .create(<RandomButton> I am a RandomButton</RandomButton>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders <RandomButton /> with variants", () => {
  const tree = renderer
    .create(
      <RandomButton variants={["test"]}> I am a RandomButton</RandomButton>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
