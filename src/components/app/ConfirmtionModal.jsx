import { Button, Overlay } from '@components'
import { capitalize } from '@utils'
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const ConfirmationModal = ({ onClose, modalTitle, prompt, promptText, icon, confirmBtnText, onConfirm, buttonColor, model }) => {
    const { loading } = useSelector((state) => state[model]);

    const handleConfirm = async () => {
        if (await onConfirm()) onClose(false);
    }

    return (
        <Overlay
            onClose={() => onClose(false)}
            title={capitalize(modalTitle)}
            zIndex="z-50"
            width="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%]"
        >
            <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-secondary rounded-full p-4">{icon}</div>

                <h5 className="font-semibold text-primary">{prompt}</h5>
                <p className="text-sm text-secondary -mt-3 mb-3">{promptText}</p>

                <div className="flex flex-col sm:flex-row gap-2 w-full justify-between pt-6 border-t border-primary">
                    <Button
                        className={clsx("w-full", buttonColor)}
                        onClick={handleConfirm}
                        isLoading={loading}
                    >
                        Yes, {capitalize(confirmBtnText)}
                    </Button>

                    <Button
                        className="w-full button-secondary"
                        onClick={() => onClose(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Overlay>
    )
}

export default ConfirmationModal
