'use client'

import Image from 'next/image'
import Modal from './modal'

interface ImageModalProps {
  src: string | null
  isOpen?: boolean
  onClose: () => void
}

export const ImageModal: React.FC<ImageModalProps> = ({
  src,
  isOpen,
  onClose,
}) => {
  if (!src) {
    return null
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-80 h-80">
        <Image
          src={src}
          fill
          alt="Image"
        />
      </div>
    </Modal>
  )
}
