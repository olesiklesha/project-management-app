import React from 'react';
import Portal from '../Portal';

interface IModalProps {
  isOpened: boolean;
  onCancel: () => void;
  children: JSX.Element | JSX.Element[];
}

export default function Modal({ isOpened, onCancel, children }: IModalProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <>
      {isOpened && (
        <Portal>
          <div className="modal-overlay" onClick={handleClick} data-testid="overlay">
            <div className="modal-window" data-testid="modal-window">
              {children}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
