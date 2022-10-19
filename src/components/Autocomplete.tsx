import useAutoComplete from '../hooks/useAutocomplete';

export const Autocomplete = () => {
    const { suggestions } = useAutoComplete([]);

    return (
        <div className="p-2 border" >
            Autocomplete Component
        </div>
    )
}