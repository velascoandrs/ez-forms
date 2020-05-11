import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

// Principal Form Field
export interface PrincipalFormFieldInterface {
    controlName: string;
    placeholder?: string;
    label?: string;
    type: PrincipalTypeInterface;
    validators?: ((control: AbstractControl) => ValidationErrors | null)[] | ((param: number | Array<string>) => ValidatorFn)[];
    disabled?: boolean;
    hint?: string;
    errorMessages?: { [key: string]: string };
}
// InputText Field
export interface InputTextFieldInterface extends PrincipalFormFieldInterface{
  type: InputTextInterface;
}
// TextArea Field
export interface TextAreaFieldInterface extends PrincipalFormFieldInterface{
  type: TextAreaInterface;
}
// Selection Field
export interface SelectionFieldInterface extends PrincipalFormFieldInterface{
  type: SelectionInterface;
}
// SimpleSelect Field
export interface SimpleSelectFieldInterface extends PrincipalFormFieldInterface{
  type: SimpleSelectInterface;
}
// Date Field
export interface DateFieldInterface extends PrincipalFormFieldInterface{
  type: DateInterface;
}
// File Field
export interface FileFieldInterface extends PrincipalFormFieldInterface{
  type: FileInterface;
}
// AutoComplete Field
export interface AutoCompleteFieldInterface extends PrincipalFormFieldInterface{
  type: AutoCompleteInterface;
}


export interface PrincipalTypeInterface {
    typeName: 'textArea' | 'input-text' | 'file' | 'date' | 'password' | 'radio' | 'check' | 'select' | 'autoComplete';
}
// input-text
export interface InputTextInterface extends PrincipalTypeInterface {
    typeName: 'input-text' | 'textArea';
    maxLength?: number;
    minLenght?: number;
    class?: 'password';
}
// text-area
export interface TextAreaInterface extends InputTextInterface {
    typeName: 'textArea';
    rows?: number;
}
// option
export interface OptionInterface {
    value: any;
    label: string;
}
// selection
export interface SelectionInterface extends PrincipalTypeInterface {
    typeName: 'select' | 'radio' | 'check';
    options: OptionInterface[];
}
// select
export interface SimpleSelectInterface extends PrincipalTypeInterface {
    typeName: 'select';
}
// radio
export interface RadioInterface extends SelectionInterface {
    typeName: 'radio';
}
// check
export interface CheckInterface extends SelectionInterface {
    typeName: 'check';
    minRequired?: number;
}
// date
export interface DateInterface extends PrincipalTypeInterface {
    typeName: 'date';
}


// table-headers
export interface TableHeadersInterface {
    actions: string;
    description: string;
}


// file
export interface FileInterface extends PrincipalTypeInterface {
    typeName: 'file';
    multiple?: boolean;
    accept: string;
    showFile: boolean;
    tableHeaders?: TableHeadersInterface;
}

// autoComplete
export interface AutoCompleteInterface extends PrincipalTypeInterface {
    typeName: 'autoComplete';
    completeMethod: (event: { query: string } | string, context: Component) => Observable<HashMap<any>[]>;
    showAttribute: string;
    componentReference: Component;
}

export interface HashMap<T> {
    [key: string]: T;
}
