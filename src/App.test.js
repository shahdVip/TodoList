// App.test.js
import { render, screen , fireEvent} from '@testing-library/react';
import App from './App';

test('renders the Todo List header', () => {
  render(<App />);
  const headerElement = screen.getByText(/todo list/i);
  expect(headerElement).toBeInTheDocument();
});

test('displays "No tasks yet!" when there are no tasks', () => {
  render(<App />);
  const noTasksMessage = screen.getByText(/no tasks yet!/i);
  expect(noTasksMessage).toBeInTheDocument();
});
test('adds a new task to the list', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/enter a new task/i);
  const addButton = screen.getByText(/add task/i);

  // Simulate adding a new task
  fireEvent.change(inputElement, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  // Check if the new task is added
  const newTask = screen.getByText(/new task/i);
  expect(newTask).toBeInTheDocument();
});