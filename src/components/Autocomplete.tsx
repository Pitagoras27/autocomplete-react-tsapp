import { FC } from 'react';
import { generateId } from '../helpers';
import useAutoComplete from '../hooks/useAutocomplete';
import { Country, Data, PredictibleSelector } from '../interfaces';
export interface CountryApi {
    iso2:    string;
    iso3:    string;
    country: string;
    cities:  any[];
}

export const Autocomplete: FC<Data> = ({ data }) => {
    const {
        search,
        isComponentVisible,
        results,
        onTextChanged,
        setSearch,
        suggestionSelected
    } = useAutoComplete<PredictibleSelector>({
        data,
        text: "",
        suggestions: []
    });

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
                    size={4}
                    type={"text"}
                />
            </label>
            {  
                results.length > 0 && isComponentVisible && (
                    <ul className="autocomplete-container">
                        {
                            results.map((item: any) => (
                                <li key={`${generateId()}-${item.iso3}`}>
                                    <button
                                        key={item.iso3}
                                        onClick={() => suggestionSelected(item)}
                                    >
                                        {item.country}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </>
    )
}