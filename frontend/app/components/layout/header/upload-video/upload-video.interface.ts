import { Dispatch, SetStateAction } from 'react'

export interface IUploadModal {
	isOpen: boolean
	videoId: string
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
