import clsx from 'clsx'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface MobileItemProps {
  label: string
  href: string
  icon: IconType
  active?: boolean
  onClick?: () => void
}

const MobileItem: React.FC<MobileItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick()
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `
      flex
      group
      items-center
      justify-center
      text-sm
      leading-6
      font-semibold
      w-full
      gap-x-3
      p-4
      text-gray-600
      hover:text-black
      hover:bg-gray-100
      `,
        active && ' bg-gray-100 text-black'
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  )
}

export default MobileItem
