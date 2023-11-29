import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import LoginForma from './loginForma';
import {BrowserRouter as Router} from 'react-router-dom';
import "jest-location-mock";
test('prikaz sadrzaj LoginForma', () => {
    const komponenta = render(
        <Router>
        <LoginForma/>
        </Router>
    )
    expect(komponenta.container).toHaveTextContent('Lozinka')
})
test('<LoginForma> poziva submit', () =>{
    window.alert = jest.fn();
    const komponenta = render(
        <Router> <LoginForma/></Router>
    )
    const input = komponenta.container.querySelector('[name="Username_"]')
    const input2 = komponenta.container.querySelector('[name="Pass_"]')
    const forma = komponenta.container.querySelector('form')
    fireEvent.change(input, {
        target: {value: 'test'}
    })
    fireEvent.change(input2, {
        target: {value: 'testtest'}
    })
    fireEvent.submit(forma)
    expect(jest.isMockFunction(window.location.reload)).toBe(true)
    expect(window.alert).not.toBeCalledWith('Neispravni podaci')
})