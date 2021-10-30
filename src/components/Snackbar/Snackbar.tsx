import { AlertColor, Snackbar as MUISnackbar } from '@mui/material';
import { Alert } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Bus from 'services/bus';
import { Flash, OrNull } from 'typings/shared';

export const Snackbar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [type, setType] = useState<AlertColor>('success');
    const [translationNamespace, setTranslationNamespace] = useState<OrNull<string>>(null);
    const { t } = useTranslation(translationNamespace ?? '');

    useEffect(() => {
        let unmounted = false;
        let timeout: OrNull<NodeJS.Timeout> = null;
        Bus.addListener('flash', ({ message, type }: Flash): void => {
            if (!unmounted) {
                setOpen(true);
                setMessage(message);
                setType(type);
                const found = message.match(/^([a-zA-Z_]+):.+/);
                if (found && found[1]) {
                    setTranslationNamespace(found[1]);
                }
                timeout = setTimeout(() => {
                    if (!unmounted) {
                        setOpen(false);
                    }
                }, 4000);
            }
        });
        return (): void => {
            unmounted = true;
            if (null !== timeout) {
                clearTimeout(timeout);
            }
        };
    }, []);

    const handleClose = (event?: React.SyntheticEvent, reason?: string): void => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <MUISnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type}>
                {translationNamespace ? t(message) : message}
            </Alert>
        </MUISnackbar>
    );
};
