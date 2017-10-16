import React from "react";
import renderer from "react-test-renderer";

import PushButton from "../PushButton";

it("renders <PushButton /> without throwing", () => {
  const tree = renderer
    .create(<PushButton> I am a PushButton</PushButton>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
