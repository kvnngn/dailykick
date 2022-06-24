import React, { MouseEventHandler } from 'react';
import { DialogProps } from '@mui/material';
import { LoadingButtonProps } from '@mui/lab';

type OnClose = {
  bivarianceHack(event?: {}, reason?: 'backdropClick' | 'escapeKeyDown'): void;
}['bivarianceHack'];

export type DialogAction = Pick<
  LoadingButtonProps,
  'color' | 'disabled' | 'loading' | 'type' | 'startIcon' | 'endIcon'
> & {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | OnClose;
};

type DefaultModalProps = Pick<DialogProps, 'open'> & {
  onSubmit?: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  Actions?: Array<DialogAction>;
  onClose?: OnClose;
};

export type ConfirmModalProps = DefaultModalProps & {
  title: string;
  content: string;
};

export type CCModalProps = Pick<DialogProps, 'open'> & {
  onClose?: OnClose;
};
