import { FC } from "react"
import { Container } from "./Container"
import {ModeToggle} from "./ToggleTheme"

interface Props {
	
}

export const Header: FC<Props> = () => {
	return (
		<Container>
			<div className="w-full flex items-center justify-between mt-4">
				Posts
				<ModeToggle/>
			</div>
		</Container>
	)
}