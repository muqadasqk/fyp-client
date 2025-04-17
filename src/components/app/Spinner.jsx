import { spinner } from '@assets'
import { Overlay } from '@components'

const Spinner = ({ size }) => {
    return (
        <Overlay >
          <div className='items-center justify-center'>
          <img src={spinner} alt="Loading spinner" width={size} />
          </div>
        </Overlay>
    )
}

export default Spinner