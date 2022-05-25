import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Form from "components/Appointment/Form";

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  // two ways to access the student name <input> element
  // 1
  it('renders without student name if not provided', () => {
    const {getByPlaceholderText} = render(<Form interviewers={interviewers}/>)

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });
  // 2
  it("renders with initial student name", () => {
    const {getByTestId} = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones"/>
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  //3
  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const fn = jest.fn() // onSave

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the student prop should be blank or undefined */
    const {getByText} = render(
      <Form 
      interviewers={interviewers} onSave={fn}
      />
    )
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"))

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(fn).not.toHaveBeenCalled();
  });

  // 4
  it("validates that the interviewer cannot be null", () => {
    /* 1. Create the mock onSave function */
    const fn = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the interviewer prop should be null */
    const {getByText} = render(
      <Form 
        interviewers={interviewers}
        onSave={fn}
        student="Lydia Miller-Jones"
      />
    )
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"))

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(fn).not.toHaveBeenCalled();
  });

  // 5
  it("calls onSave function when the name and interviewer is defined", () => {
    /* 1. Create the mock onSave function */
    const fn = jest.fn();
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const {queryByText} = render(
      <Form 
        interviewers={interviewers}
        student="tester"
        onSave={fn}
        interviewer={interviewers[0]}
      />
    )
    /* 3. Click the save button */
    fireEvent.click(queryByText("Save"))

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("tester", interviewers[0]);
  });



});