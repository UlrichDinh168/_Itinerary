
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { useSelector } from 'react-redux';
import { expect, jest, test } from '@jest/globals';
import Itineraries from './Itineraries';
import { mockItinerary } from '../../test/index'

jest.mock('react-redux', () => {
    return {
        useSelector: jest.fn().mockReturnValue([]),
        useDispatch: () => jest.fn(),
    };
});


test('Display "No results" when no values', () => {
    render(<Itineraries />)
    const text = screen.queryAllByText('No results')
    expect(text.length).toBe(1)
})

test('Display data when successfully fetched', () => {
    // @ts-ignore
    useSelector.mockReturnValue([mockItinerary, mockItinerary])
    render(<Itineraries />)
    screen.queryByTestId('itinerary-test-0')
})