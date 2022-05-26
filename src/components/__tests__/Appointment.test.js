import React from 'react';
import { render } from '@testing-library/react';
import Appointment from "components/Appointment";

describe('Appointment', () => {
  it('renders without crashing', () => {
    render(<Appointment />);
  });

  test('it = test', () => {
    render(<Appointment />);
  });

  xit('xit is skip test', () => {
    renter(<Appointment />);
  });

  test.skip('skip test', () => {
    render(<Appointment />);
  });

  it.skip('skip test', () => {
    render(<Appointment />);
  });
});