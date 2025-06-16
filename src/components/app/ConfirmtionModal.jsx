import { Button, closeModal, Overlay } from '@components'
import { capitalize } from '@utils'
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const ConfirmationModal = ({ onClose, prompt, promptText, icon, confirmBtnText, onConfirm, buttonColor, model }) => {
    const { loading } = useSelector((state) => state[model]);

    const handleConfirm = async () => {
        if (await onConfirm()) onClose(false);
    }

    return (
        <Overlay onClose={onClose} width="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%]" hasHeader={false} zIndex="z-50">
            <div className="flex flex-col gap-4">
                <div className="p-4 pr-0 w-full">
                    <h5 className="font-semibold text-primary">{prompt}</h5>
                    <p className="text-sm text-secondary -mt-2">{promptText}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full justify-end">
                    <Button className="button-secondary text-sm" onClick={e => closeModal(e)}>
                        Cancel
                    </Button>
                    <Button className={clsx("text-sm", buttonColor)} onClick={handleConfirm} isLoading={loading}>
                        {icon} {capitalize(confirmBtnText)}
                    </Button>
                </div>
            </div>
        </Overlay>
    )
}

export default ConfirmationModal
