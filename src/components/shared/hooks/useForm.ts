import {ChangeEvent, useCallback, useState} from "react";


type OnChangeType = (e: ChangeEvent<HTMLInputElement>) => void;

export function useForm<Type>(inputs: Type): [Type, OnChangeType] {
    const [state, setState] = useState<Type>(inputs)

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>)=>{
        const name = e.target.name
        const value = e.target.value
        setState({...state, [name]: value})
    }, [state])

    return [state, onChange]
}