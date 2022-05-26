import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM } from "@testing-library/react";

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
    console.log("jest container", container) // obj of HTTPDivElement
    console.log('prettyDOM', prettyDOM(container)) // DOM tree of initial state of the application // data hasn't loaded yet
    
    // await before prettyDOM call
    await waitForElement(() => getByText(container, "Archie Cohen"))

    console.log("after await", prettyDOM(container))



  });
})
