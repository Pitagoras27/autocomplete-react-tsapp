
import { Country } from "../interfaces"

interface Props {
  suggestion: Country;
  index: number;
  cursor: number;
  suggestionSelected: (value: Country) => void
}

export const ItemSuggestion = ({ suggestion, index, cursor, suggestionSelected }: Props) => {
  return (
    <li>
        <button
            key={suggestion.iso3}
            onClick={() => suggestionSelected(suggestion)}
            className={`${cursor === index ? "active" : ""}`}
        >
            {suggestion.country}
        </button>
    </li>
  )
}