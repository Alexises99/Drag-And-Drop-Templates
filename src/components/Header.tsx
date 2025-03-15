import StyledButton from './StyledButton'
import { FormattedMessage } from './FormattedMessage/FormattedMessage'
import zaraLogo from '/logo.svg'
import { useDialogContext } from '@hooks/useDialogContext'

export default function Header() {
  const { openDialog } = useDialogContext()
  return (
    <header
      className="sticky top-0 z-1000 flex items-end justify-between bg-white py-2"
      role="banner"
    >
      <img
        src={zaraLogo}
        alt="Zara logo"
        className="max-h-14"
        width={134}
        height={56}
        loading="eager"
      />
      <StyledButton
        extraProps={{
          onClick: () => openDialog('form'),
          'aria-haspopup': 'dialog'
        }}
        type="button"
      >
        <FormattedMessage id="header.create-product" />
      </StyledButton>
    </header>
  )
}
