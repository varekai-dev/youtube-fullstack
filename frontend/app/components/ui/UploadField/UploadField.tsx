import { FC } from 'react'

import styles from './UploadField.module.scss'
import { IUploadField } from './upload-field.interface'
import { useUploadFile } from './useUploadFile'

const UploadField: FC<IUploadField> = ({
	title,
	onChange,
	folder,
	setValue
}) => {
	const { uploadFile } = useUploadFile(onChange, folder, setValue)
	return (
		<div className={styles.file}>
			{title && <h1>{title}</h1>}
			<label>
				<span className='sr-only'>Choose File</span>
				<input type='file' onChange={uploadFile} />
			</label>
		</div>
	)
}

export default UploadField
