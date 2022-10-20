import { ChangeEvent, useState } from 'react';
import { Country, PredictibleSelector } from './../interfaces';

export default function useAutoComplete<T>(initialState: PredictibleSelector) {
    const { data, text, suggestions } = initialState;
    const [search, setSearch] = useState({ text, suggestions });
    const [isComponentVisible, setIsComponentVisible] = useState(true);

    const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, "i");
            suggestions = data.sort().filter((v: Country) => regex.test(v.country));
        }
        setIsComponentVisible(true);
        setSearch({ suggestions, text: value });
    };

    const suggestionSelected = (value: Country) => {
        setIsComponentVisible(false);
    
        setSearch({
            text: value.country,
            suggestions: []
        });
    };
    
    const { suggestions: results } = search;

    return {
        search,
        results,
        isComponentVisible,
        setSearch,
        onTextChanged,
        suggestionSelected
    }
}
