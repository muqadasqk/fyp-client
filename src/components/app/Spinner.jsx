import { spinner } from '@assets'
import { Overlay } from '@components'

const Spinner = ({ size }) => {
    return (
        <Overlay>
            <img src={spinner} alt="Loading spinner" width={size} />
        </Overlay>
    )
}

export default Spinner