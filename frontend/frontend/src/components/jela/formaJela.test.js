import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import FormaJela from './formaJela';

test('prikaz sadrzaj FormaJela', () => {
    const naslov= "test"
    const komponenta = render(
            <FormaJela naslov={naslov}/>   
    )
    expect(komponenta.container).toHaveTextContent('test')
})
