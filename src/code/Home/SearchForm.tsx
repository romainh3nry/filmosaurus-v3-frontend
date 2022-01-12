import React from 'react';
import { Form, Button, InputLabel, InputText} from '../Style';

type SearchFormProps = {
    label: string,
    searchTerm: string,
    onChange: (event:React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
};

export const SearchForm = ({label, searchTerm, onChange, onSubmit,}: SearchFormProps) => {
    return (
        <Form onSubmit={onSubmit} textAlign='center'>
            <InputLabel>{label}</InputLabel>
            <InputText type="text" value={searchTerm} onChange={onChange}/>
            <Button border='1px solid #171212' type="submit" disabled={!searchTerm}>Search</Button>
        </Form>
    )
};
