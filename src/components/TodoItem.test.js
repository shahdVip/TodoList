import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react'; // Import act from react, not from react-dom/test-utils
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import userEvent from '@testing-library/user-event';



test("deletes a task when the delete button is clicked", () => {
    const handleDelete = jest.fn();
    const handleEdit = jest.fn();
    const handleToggle = jest.fn();
    const task = { id: 1, text: "Old Task", isCompleted: false };

    // Mock the window.confirm to simulate the user clicking "OK" (true)
    window.confirm = jest.fn().mockReturnValue(true);

    render(
        <TodoItem
            task={task}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onToggle={handleToggle}
        />
    );

    // Click the "Delete Task" button
    const deleteButton = screen.getByLabelText("Delete Task");
    fireEvent.click(deleteButton);

    // Check that the onDelete function was called with the correct task id
    expect(handleDelete).toHaveBeenCalledWith(1);
});



test('toggles task completion when checkbox is clicked', () => {
    const tasks = [{ id: 1, text: 'Toggle this task', isCompleted: false }];
    const handleToggle = jest.fn();

    render(<TodoList tasks={tasks} onToggle={handleToggle} onDelete={() => {}} onEdit={() => {}} />);

    // Click the checkbox
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    // Check if the handleToggle function was called
    expect(handleToggle).toHaveBeenCalledWith(1);
});
test('displays "No tasks" message when the list is empty', () => {
    const emptyTasks = [];
    render(<TodoList tasks={emptyTasks} onDelete={() => {}} onToggle={() => {}} onEdit={() => {}} />);

    const message = screen.getByText(/no tasks/i);
    expect(message).toBeInTheDocument();
});



test("edits a task when the save button is clicked", async () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const onToggle = jest.fn();
    const task = { id: 1, text: "Old Task", isCompleted: false };

    render(<TodoItem task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />);

    // Click the "Edit Task" button to show the input field
    const editButton = screen.getByLabelText("Edit Task");
    userEvent.click(editButton);

    // Now wait for the textbox input to appear (since it's rendered conditionally)
    const input = await screen.findByRole("textbox");

    // Type a new task text into the input
    userEvent.clear(input); // Clear any pre-existing value
    userEvent.type(input, "Updated Task");

    // Click the "Save Task" button to save the updated task
    const saveButton = screen.getByLabelText("Save Task");
    userEvent.click(saveButton);

    // Check if the onEdit function was called with the correct arguments
    expect(onEdit).toHaveBeenCalledWith(1, "Updated Task");
});

const onDeleteMock = jest.fn();
const onToggleMock = jest.fn();
const onEditMock = jest.fn();

test('shows confirmation dialog and deletes the task when confirmed', () => {
    const task = { id: 1, text: 'Test task', isCompleted: false };

    // Mock the window.confirm method to simulate user confirmation
    window.confirm = jest.fn().mockReturnValue(true);

    render(<TodoItem task={task} onDelete={onDeleteMock} onToggle={onToggleMock} onEdit={onEditMock} />);

    // Find and click the delete button
    const deleteButton = screen.getByLabelText(/delete task/i);
    fireEvent.click(deleteButton);

    // Check if window.confirm was called
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this task?');

    // Check if onDelete was called with the correct task ID
    expect(onDeleteMock).toHaveBeenCalledWith(1);
});

test('does not delete the task if deletion is canceled', () => {
    const task = { id: 1, text: 'Test task', isCompleted: false };

    // Mock the window.confirm method to simulate user cancelation
    window.confirm = jest.fn().mockReturnValue(false);

    render(<TodoItem task={task} onDelete={onDeleteMock} onToggle={onToggleMock} onEdit={onEditMock} />);

    // Find and click the delete button
    const deleteButton = screen.getByLabelText(/delete task/i);
    fireEvent.click(deleteButton);

    // Check if window.confirm was called
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this task?');

    // Check that onDelete was NOT called
    expect(onDeleteMock).not.toHaveBeenCalled();
});



test('cancels the editing of the task and resets the text', () => {
    const task = { id: 1, text: 'Task to be edited', isCompleted: false };

    render(<TodoItem task={task} onDelete={onDeleteMock} onToggle={onToggleMock} onEdit={onEditMock} />);

    // Find and click the edit button to start editing
    const editButton = screen.getByLabelText(/edit task/i);
    fireEvent.click(editButton);

    // Find and change the input value
    const input = screen.getByDisplayValue(/Task to be edited/i);
    fireEvent.change(input, { target: { value: 'Updated Task' } });

    // Find and click the cancel button
    const cancelButton = screen.getByLabelText(/Cancel Edit/i);
    fireEvent.click(cancelButton);

    // Check if the task text is reset to the original
    expect(screen.getByText('Task to be edited')).toBeInTheDocument();

    // Ensure that the save button does not appear anymore
    expect(screen.queryByLabelText(/Save Task/i)).not.toBeInTheDocument();
});
