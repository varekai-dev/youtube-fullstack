export const getKeys = <T>(obj: T) => {
	return Object.keys(obj) as Array<keyof T>
}
