# Questions

## Questions of react

### 1. What is the difference between Component and PureComponent? give an example where it might break my app

The difference between them is that a __Pure Component__ always returns the same output for the same state and props, and a regular Component always re-renders when a state in a parent component receives an update and one of its children has no direct relation to it that state.

It's probably break my app or produce false-negatives, when a __Pure Component__ recive complex objects because `shouldComponentUpdate()`'s pure component only compare shallow objects.

__Pure Component__ break my app, as well, if this receve a children or another component. A child component generate one new instance that will fail the shallow comparison.

### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Because the child component with an implementation ShouldComponentUpdate doesn't know when your parent's state has been updated with context. The update of the parent is separated from the representation of its child even though it has props with shared logic, I think.

### 3. Describe 3 ways to pass information from a component to its PARENT

The common solution is pass one callback wait argument from component parent to children component, and pass data to parent run callback with paramenters.

### 4. Give 2 ways to prevent components from re-rendering

In functional components react provide a HOC React.memo with two arguments, will do a shallow comparison to re-render component if the state or props are differents.

Other way to prevent re-renders in components tree is maintains component 's state closest posible itself

### 5. What is a fragment and why do we need it? Give an example where it might break my app

One fragment it's represent with `<> </>`. And use them to avoid create unnecesary HTML elements in DOM.

Don't should use them in structures iteratives because don't accept properties how key prop. Use them this way may break my app.

### 6. Give 3 examples of the HOC pattern

One of custom basic implementation

```js
function withStylesLayout (Component) {
  return props => {
    const style = { margin: '1em', padding: '1em' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Alert = () => <div>Can't retrive data!</div>

const ButtonComponent = withStylesLayout(Button)
const AlertComponent = withStylesLayout(Text)
```

Next use classic HOC `connect` of react-redux.
The return of connect will be a wrapper componet to will be ready to accept different Components

```js
import { login, logout } from './actionCreators'

const mapStateProps = (state) => state.user
const mapDispatchToProps = { login, logout }

const connectUser = connect(mapStateProps, mapDispatchToProps)

const ConnectedUserLogin = connectUser(Login)
const ConnectedUserProfile = connectUser(Profile)
```

Here pass inmediaty component to connect because is a clousure that wait run function, in this case a Component

```js
export default connect(mapStateProps, mapDispatchToProps)(Login)
```

Finaly, the custom HOC withControlledForm that return new controlled form with diffent configuration due your initialState.

```js
const withControlledForm = (Component, initialState = {}) => {
  const SimpleExtendedForm = ({ onSubmit }) => {
    const [formValues, setFormValues] = useState(initialState);

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(JSON.stringify(formValues));
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    return (
      <Component
        formData={formValues}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    );
  };

  return SimpleExtendedForm;
};

const GenericForm = ({ handleSubmit, formData, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name:</label>
    <input
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />
    <label htmlFor="job-title">Job Title:</label>
    <input
      type="text"
      id="job-title"
      name="jobTitle"
      value={formData.jobTitle}
      onChange={handleChange}
      required
    />
    <button type="submit">Enviar</button>
  </form>
);


export const GenericFormControlled = withControlledForm(GenericForm, {
  name: "",
  jobTitle: "",
});
```

### 7. what's the difference in handling exceptions in promises, callbacks and async...await

The promise object manage exeptions with catch method.
Async function manage exceptions with catch statement of try catch incorporated function of JS
For convention a callback manage your exceptions in your first argument, example

```js
function dividir(x, y, cb) {
  if (y === 0)
    cb(new Error("Zero is not divisible. Try again with other number!"));
  cb(null, x / y);
}

dividir(10, 2, (err, res) => {
  if (err) throw err;
  console.log(res);
});
```

### 8. How many arguments does setState take and why is it async

The setState method takes up to 2 arguments. The first argument can be an object that's used to update the state or a callback to calculate the new state in order to current state; the second argument is callback function.

setState and useState hook is asynchronous for reasons performance

### 9. List the steps needed to migrate a Class to Function Component

This depends of implementation logic and other issues, using the global state with redux is not the same as using a local state. But for a simple component we can follows next steps

1. Remove `class` reserved word, and repalce declaration to `function` statement
2. Remove `constructor` and super method
3. Modify how to update the state and replace `setState` to `useState` hook
4. Remove cicle life's methods and implement `useEffect` hook
5. Replace `render` method to return statement

### 10. List a few ways styles can be used with components

1. CSS how module use
2. Implement some library to create styles with JS how `Styles Component`
3. Create styles how object JS without libraries
4. Inline styles object to pass to style prop of component
5. Create styles with preprocessor how `Sass`
6. With class names to pass to `className` prop of component
7. Add global styles to __index.html__

### 11. How to render an HTML string coming from the server

React recomend use special prop `dangerouslySetInnerHTML` that recibe an object with default propert `__html`. Other althernative way is use a library how `html-react-parser` it converts an HTML string
