import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Profil from './profil';
import {BrowserRouter as Router} from 'react-router-dom';

test('prikaz sadrzaj Korisnik', () => {
    const komponenta = render(
        <Router>
        <Profil/>
        </Router>
    )
    expect(komponenta.container).toHaveTextContent('E-mail')
})