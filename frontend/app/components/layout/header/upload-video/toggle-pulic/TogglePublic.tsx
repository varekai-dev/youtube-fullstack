import { Switch } from '@headlessui/react'
import cn from 'classnames'
import React, { useState } from 'react'

import styles from './TogglePublic.module.scss'

const TogglePublic = () => {
	const [isEnabled, setEnabled] = useState(false)
	return (
		<Switch
			checked={isEnabled}
			onChange={setEnabled}
			className={cn(styles.switch, {
				'bg-blue-600': isEnabled,
				'bg-gray-200': !isEnabled
			})}
		>
			<span className='sr-only'>Enable notifications</span>
			<span
				className={cn(styles.point, {
					'translate-x-6': isEnabled,
					'translate-x-1': !isEnabled
				})}
			/>
		</Switch>
	)
}

export default TogglePublic
