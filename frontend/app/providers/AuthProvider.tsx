import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import {
	Dispatch,
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState
} from 'react'

import { AuthService } from '@/services/auth/auth.service'

interface IData {
	user: {
		_id: string
		email: string
	} | null
	accessToken: string
}

interface IContext extends IData {
	setData: Dispatch<React.SetStateAction<IData>> | null
}

export const defaultValueAuthState = {
	user: null,
	accessToken: ''
}

export const AuthContext = createContext<IContext>({} as IContext)

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [data, setData] = useState<IData>(defaultValueAuthState)
	const { pathname } = useRouter()
	const accessToken = Cookies.get('accessToken')
	useEffect(
		() => {
			const user = localStorage.getItem('user')
			if (accessToken && user) {
				setData({
					user: JSON.parse(user),
					accessToken
				})
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	useEffect(() => {
		if (!accessToken && !data.user) {
			AuthService.logout()
			setData(defaultValueAuthState)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	return (
		<AuthContext.Provider value={{ ...data, setData }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
