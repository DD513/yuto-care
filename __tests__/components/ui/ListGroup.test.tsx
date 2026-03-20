import React from "react";
import { Text, View } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { ListGroup } from "@/components/ui/ListGroup";

type MockChildProps = {
  label: string;
  isLast?: boolean;
};

function MockChild({ label, isLast }: MockChildProps) {
  return (
    <View testID={`child-${label}`}>
      <Text>{label}</Text>
      <Text testID={`isLast-${label}`}>{String(isLast)}</Text>
    </View>
  );
}

describe("ListGroup", () => {
  it("renders children", () => {
    render(
      <ListGroup>
        <MockChild label="A" />
        <MockChild label="B" />
      </ListGroup>,
    );

    expect(screen.getByText("A")).toBeTruthy();
    expect(screen.getByText("B")).toBeTruthy();
  });

  it("filters out falsy children", () => {
    render(
      <ListGroup>
        <MockChild label="A" />
        {null}
        {false}
        {undefined}
        <MockChild label="B" />
      </ListGroup>,
    );

    expect(screen.getByText("A")).toBeTruthy();
    expect(screen.getByText("B")).toBeTruthy();
  });

  it("injects isLast=false into non-last child", () => {
    render(
      <ListGroup>
        <MockChild label="A" />
        <MockChild label="B" />
      </ListGroup>,
    );

    expect(screen.getByTestId("isLast-A").props.children).toBe("false");
  });

  it("injects isLast=true into last child", () => {
    render(
      <ListGroup>
        <MockChild label="A" />
        <MockChild label="B" />
      </ListGroup>,
    );

    expect(screen.getByTestId("isLast-B").props.children).toBe("true");
  });

  it("does not override child isLast when already provided", () => {
    render(
      <ListGroup>
        <MockChild label="A" isLast />
        <MockChild label="B" />
      </ListGroup>,
    );

    expect(screen.getByTestId("isLast-A").props.children).toBe("true");
    expect(screen.getByTestId("isLast-B").props.children).toBe("true");
  });

  it("applies className to wrapper", () => {
    const { UNSAFE_getByType } = render(
      <ListGroup className="mt-6">
        <MockChild label="A" />
      </ListGroup>,
    );

    const wrapper = UNSAFE_getByType(View);
    expect(wrapper.props.className).toContain("mt-6");
  });
});
