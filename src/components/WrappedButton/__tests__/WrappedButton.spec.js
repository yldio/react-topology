import React from "react";
import renderer from "react-test-renderer";

import WrappedButton from "../WrappedButton";

it("renders <WrappedButton /> without throwing", () => {
  const tree = renderer
    .create(<WrappedButton> I am a WrappedButton</WrappedButton>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
