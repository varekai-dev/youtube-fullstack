import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

import { IFieldProps } from '../Field/Field.interface'

type TypeInputPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> &
	IFieldProps

export interface ITextArea extends TypeInputPropsField {}
