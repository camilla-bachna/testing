import { render, screen } from '@testing-library/react';
import Form from './components/Form';
import userEvent from '@testing-library/user-event';

describe('When user fills in and submits form', () => {
  it('submit method is called with title and content', () => {
    /* mock function: we need to pass the function that will execute when submit is done  */

    const submit = jest.fn();
    render(<Form submit={submit} />);

    /* getByLabelText: look for inputs through their label, test also accessibility */

    const titleInput = screen.getByLabelText(/title/i);
    userEvent.type(titleInput, 'My awesome post');

    const contentInput = screen.getByLabelText(/content/i);
    userEvent.type(contentInput, 'Lorem ipsum dolor sit amet');

    const button = screen.getByRole('button', { name: /submit/i });
    userEvent.click(button);

    expect(submit).toHaveBeenCalledWith({
      title: 'My awesome post',
      content: 'Lorem ipsum dolor sit amet',
    });
  });
});

/* Example using fireEvent 
import { fireEvent, render, screen } from '@testing-library/react';
import Form from './components/Form';

describe('Form component', () => {
  it('calls submit method with title and content', () => {
    const submit = jest.fn();
    render(<Form submit={submit} />);

    const title = screen.getByLabelText(/title/i);
    fireEvent.change(title, { target: { value: 'My awesome post' } });

    const content = screen.getByLabelText(/content/i);
    fireEvent.change(content, {
      target: { value: 'Lorem ipsum dolor sit amet' },
    });

    const button = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(button);

    expect(submit).toHaveBeenCalledWith({
      title: 'My awesome post',
      content: 'Lorem ipsum dolor sit amet',
    });
  });
});
*/
