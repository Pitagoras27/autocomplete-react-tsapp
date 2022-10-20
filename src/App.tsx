import { Autocomplete } from "./components/Autocomplete";
import { useFetch } from "./hooks/useFetch";
import "./styles/styles.css";

const App = () =>{
    const { loading, data } = useFetch();

    return (
        <div className="container">
            <h1>Find a country in the world</h1>
            <Autocomplete data={data} />
        </div>
    )
}

export default App