import { Autocomplete, Loader } from "./components";
import { useFetch } from "./hooks/useFetch";
import "./styles/styles.css";

const App = () =>{
    const { loading, data } = useFetch();

    if (loading) {
        return <Loader className="theme" />
    }

    return (
        <div className="container">
            <h1>Find a country in the world</h1>
            <Autocomplete data={data} />
        </div>
    )
}

export default App