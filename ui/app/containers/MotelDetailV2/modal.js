import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// create a new modal component
const ModalComponent = props => {
  const { modal, toggle, className, modalTitle, children, footer } = props;
  const [modalState, setModalState] = useState(modal);

  useEffect(() => {
    setModalState(modal);
  }, [modal]);

  return (
    <Modal isOpen={modalState} toggle={toggle} className={className} scrollable>
      <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export default ModalComponent;

ModalComponent.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
};
