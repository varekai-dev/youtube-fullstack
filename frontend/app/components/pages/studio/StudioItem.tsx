import cn from 'classnames'
import { FC, HTMLAttributes, PropsWithChildren } from 'react'

import styles from './Studio.module.scss'

const StudioItem: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
	children,
	className
}) => {
	return <div className={cn(styles.item, className)}>{children}</div>
}

export default StudioItem
