import {useCallback} from 'react'

export const useMessage = () => {
	return useCallback(callback= text => {
		if (window.M && text) {
			window.M.toast({ html: text })
		}
	}, deps= [])
}