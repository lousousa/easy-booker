import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { ModalProps } from '../types'

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
  }

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={handleContentClick}>
        <ButtonClose onClick={onClose}>Close</ButtonClose>

        {children}
      </ModalContent>
    </ModalOverlay>,
    document.body
  )
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`

const ModalContent = styled.div`
  background-color: #fff;
  max-width: 100%;
  padding: 12px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, .1);
  position: relative;
`

const ButtonClose = styled.a`
  position: absolute;
  right: 12px;
  top: 12px;
  cursor: pointer;
`
