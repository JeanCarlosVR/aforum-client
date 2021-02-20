import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    //@ts-ignore
    render(<App apolloClient={null} />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
