import { useState } from 'react';

export default function useAutoComplete(initialState) {
    const [suggestions, setSuggestions] = useState(initialState)

    // TODO: Great Logic

    return {
        suggestions
    }
}