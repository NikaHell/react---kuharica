import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import Jela from './Jela';
import {BrowserRouter as Router} from 'react-router-dom';

test('prikaz sadrzaj Jela', () => {
    const komponenta = render(
        <Router>
        <Jela/>
        </Router>
    )
    expect(komponenta.container).toHaveTextContent('Naziv')
})