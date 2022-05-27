import { FC } from 'react'

import { IUploadField } from '@/components/ui/UploadField/upload-field.interface'
import { useUploadFile } from '@/components/ui/UploadField/useUploadFile'

import styles from './UploadField.module.scss'

const UploadField: FC<IUploadField> = ({
	title,
	onChange,
	folder,
	setValue,
	setIsChosen,
	accept
}) => {
	const { uploadFile } = useUploadFile(onChange, folder, setValue, setIsChosen)

	return (
		<div className={styles.file}>
			{title && <h1>{title}</h1>}
			<label>
				<span className='sr-only'>Choose File</span>
				<input type='file' accept={accept} onChange={uploadFile} />
			</label>
		</div>
	)
}

export default UploadField
