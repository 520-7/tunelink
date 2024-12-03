import React from 'react';
import { render } from '@testing-library/react-native';
import SearchScreen from '../../src/screens/SearchScreen.tsx';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
} as any;

const mockRoute = {
  key: 'test-key',
  name: 'Search',
  params: { userId: 'testUserId' },
} as any; // Adjust `any` if you have a specific type for the route

describe('SearchScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <SearchScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>
    );
    expect(getByPlaceholderText('Enter genre...')).toBeTruthy();
  });
});
