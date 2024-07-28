import { FC, ReactNode } from "react"

interface Props {
	children: ReactNode
}

export const Container: FC<Props> = ({children}) => {
	return (
		<div style={{minWidth: "780px"}} className="min-h-full">
			{children}
		</div>
	)
}