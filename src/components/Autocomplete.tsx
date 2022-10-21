import { FC, useEffect, useState } from 'react';
import { useKeyPress, useAutocomplete } from '../hooks';
import { Data, PredictibleSelector } from '../interfaces';
import { generateId } from "../helpers"
import { ItemSuggestion } from './';
import { Country } from '../interfaces/data';
export interface CountryApi {
    iso2:    string;
    iso3:    string;
    country: string;
    cities:  any[];
}

export const Autocomplete: FC<Data> = ({ data }) => {
    const downPress = useKeyPress("ArrowDown");
    const upPress = useKeyPress("ArrowUp");
    const enterPress = useKeyPress("Enter");
    const exit = useKeyPress("Escape");
    const backspace = useKeyPress("Backspace");
    const [cursor, setCursor] = useState(0);

    const {
        search,
        isComponentVisible,
        results,
        onTextChanged,
        setSearch,
        suggestionSelected,
        setIsComponentVisible
    } = useAutocomplete<PredictibleSelector>({
        data,
        text: "",
        suggestions: []
    });
    useEffect(() => {
        if ((results.length && downPress) || backspace) {
            setCursor(prevState => {
                // ? This validation is to recalculate index of filtered results when user use the backspace key
                if( results.length === 1 || backspace) {
                    return 0;
                }
                return prevState < results.length - 1 ? prevState + 1 : prevState;
            })
        }
    }, [downPress, results, backspace]);
    
    useEffect(() => {
        if (results.length && exit) {
            setIsComponentVisible(false)
        }
    }, [exit]);

    useEffect(() => {
        if (results.length && upPress) {
            setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
        }
    }, [upPress]);

    useEffect(() => {
        if (results.length && enterPress) {
            const result = Object.values(results[cursor])[1]
            setSearch({
                text: result,
                suggestions: []
            })
        }
    }, [cursor, enterPress]);

    return (
        <>
            <label className="input-sizer">
                <span>Country:</span>
                <input
                    id="input"
                    autoComplete="off"
                    value={search.text}
                    onChange={onTextChanged}
                    placeholder="searching..."
                    type={"text"}
                />
            </label>
            {  
                results.length > 0 && isComponentVisible && (
                    <ul className="autocomplete-container">
                        {
                            results.map((suggestion: any, index) => (
                                <ItemSuggestion
                                    key={`${generateId()}-${suggestion.iso3}`}
                                    suggestion={suggestion}
                                    index={index}
                                    cursor={cursor}
                                    suggestionSelected={suggestionSelected}
                                />
                            ))
                        }
                    </ul>
                )
            }
        </>
    )
}