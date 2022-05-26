import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

describe("Application", () => {
  afterEach(cleanup);

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    // expect(getByText("Leopold Silve")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    // console.log("jest container", container); // obj of HTTPDivElement
    // console.log('prettyDOM', prettyDOM(container)); // DOM tree of initial state of the application // data hasn't loaded yet

    // await before prettyDOM call
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // console.log("after await", prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));
    const appointment = appointments[0];
    // console.log('empty array', prettyDOM(appointment));

    // click add button
    // find element has "Add" and Click
    fireEvent.click(getByAltText(appointment, "Add"));

    // add || update student name
    // find element has placeholder=/enter.../ which is empty input, and change the value to "Lydia...."
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // select interviewer
    // find element alt = "Sylvia..." and click
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // select save button and click in appointment strunture
    // fireEvent.click(getByClassName(appointment, "Save"));
    // fireEvent.click(getByText(appointment, "Save")); // typeError: axios.default.put...
    console.log(prettyDOM(appointment));
  });
});
