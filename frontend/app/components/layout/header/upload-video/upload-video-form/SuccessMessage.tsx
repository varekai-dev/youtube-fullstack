import { FC } from 'react'

const SuccessMessage: FC = () => {
	return (
		<div className='absolute top-5 text-lg left-1/4 flex items-center p-2 z-10 shadow-block animate-scaleIn w-1/2 bg-green-500 text-white text-center mx-auto'>
			Video successfully uploaded!
		</div>
	)
}

export default SuccessMessage
