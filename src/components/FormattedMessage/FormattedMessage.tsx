import { FormattedMessage as IntlFormattedMessage } from 'react-intl'
import message from '../../locales/es.json'

import type { Props } from 'react-intl/src/components/message'
import { type ReactNode } from 'react'

export type IntlMessageKeys = keyof typeof message

type FormattedMessageProps = Props<Record<string, ReactNode>> & {
  id: IntlMessageKeys
}

export function FormattedMessage({ id, ...rest }: FormattedMessageProps) {
  return <IntlFormattedMessage id={id} defaultMessage={message[id]} {...rest} />
}
