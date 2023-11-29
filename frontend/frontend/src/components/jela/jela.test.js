import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Jela from './jela';
import { BrowserRouter as Router } from 'react-router-dom';
import "jest-location-mock";

test('prikaz sadrzaj jela', () => {
    
    const ime = "test"
    const kategorija =" testna"
    const table = document.createElement('tbody');
    const {container} = render(
        <Router>
            <Jela ime={ime} kategorija={kategorija}/>   
        </Router>
    ,{
        container: document.body.appendChild(table)
    });
    expect(container).toHaveTextContent('test')
})

test('klik na Detalji poziva detalje o jelu', () => {
     
    const ime = "test"
    const kategorija =" testna"
    const table = document.createElement('tbody');
    const komponenta = render(
        <Router>
            <Jela ime={ime} kategorija={kategorija}/>   
        </Router>
    ,{
        container: document.body.appendChild(table)
    });
    const button = komponenta.getByText('Detalji')
    fireEvent.click(button)
    expect(jest.isMockFunction(window.location.reload)).toBe(true)
})