import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Modal from './Modal';

expect.extend(toHaveNoViolations);
describe('Modal Component', () => {
  test("should follow accessibility quideline", async() => {
    const {container} = render(<Modal />)
    const accessibleAxeObject = await axe(container);
    expect(accessibleAxeObject).toHaveNoViolations()
  })
  test('should open modal when the Payment Confirmation button is clicked', async () => {
    render(<Modal />);
    const button = screen.getByTestId('modalButton');
    expect(screen.queryByText('To proceed to payment page:')).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText('To proceed to payment page:')).toBeInTheDocument();
  });
  test('closes the modal when the Escape key is pressed and focus is not on the button', () => {
    render(<Modal />);
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(screen.queryByText(/To proceed to payment page:/i)).not.toBeInTheDocument();
  });
  test('ensures screen reader accessibility', () => {
    render(<Modal />);
    fireEvent.click(screen.getByText('Payment Confirmation'));
    const modalTitle = screen.getByText(/To proceed to payment page:/i);
    expect(modalTitle).toHaveAccessibleName();
  });
  test('ensures keyboard accessibility', () => {
    render(<Modal />);
    fireEvent.click(screen.getByText('Payment Confirmation'));
    fireEvent.keyDown(document, { key: 'Escape', code: 'handleEscapePress' });
    const modalTitle = screen.queryByText(/To proceed to payment page:/i);
    expect(modalTitle).toBeInTheDocument();
  });
  test('should close modal on button click', async () => {
    render(<Modal />);
    const button = screen.getByTestId('modalButton');
    fireEvent.click(button);
    expect(screen.getByText('Payment Confirmation')).toBeVisible();
    const closeButton = screen.getByTestId('aceptButton');
    fireEvent.click(button);
    expect(closeButton).not.toBeVisible
  });
  test('should close modal on button click', async () => {
    render(<Modal />);
    const button = screen.getByTestId('modalButton');
    fireEvent.click(button);
    expect(screen.getByText('Payment Confirmation')).toBeVisible();
    const closeButton = screen.getByTestId('rejectButton');
    fireEvent.click(button);
    expect(closeButton).not.toBeVisible
  });
  test('should set focus on close modal button when modal is open', async () => {
    render(<Modal />);
    const button = screen.getByTestId('modalButton');
    fireEvent.click(button);
    const closeButton = screen.getByTestId('rejectButton');
    fireEvent.click(button);
    expect(closeButton).toHaveFocus();
  });
  test('should set focus on trigger button after close modal', async () => {
    render(<Modal />);
    const triggerButton = screen.getByTestId('modalButton');
    fireEvent.click(triggerButton);
    expect(triggerButton).not.toHaveFocus();
    const closeButton = screen.getByTestId('aceptButton');
    fireEvent.click(closeButton);
    expect(triggerButton).toHaveFocus(); 
  });
});





