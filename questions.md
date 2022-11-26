## 1. What is the difference between Component and PureComponent? give an example where it might break my app.
The main difference is that a PureComponent does a shallowComparison when its state/props has changed.
More technically speaking, PureComponents handles shouldComponentUpdate lifecycle method 'automatically'. This avoids a re-render if props or state haven't changed.
I haven't encountered an example of an app breaking in my experience, but I did experience slow performance due to nested pure components.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
If shouldComponentUpdate lyfecycle method returns false, the state will use outdated data. (Context's value won't be considered in this case)

## 3. Describe 3 ways to pass information from a component to its PARENT.
 * Passing an updateState function as a prop (useState)
   - If the child components executes this function the parent will be updated (since the update is being updated there)
 * Context api
   - Wrapping two components (child & parent) with a Provider. If the child updated the context information, the parent will receive that updated value, and vice versa.
 * Callback method as prop

## 4. Give 2 ways to prevent components from re-rendering.
 * Wrapping the component with react.memo can avoid a re-rendering by returning a memoized component
 * Using useEffect's dependency array correctly

## 5. What is a fragment and why do we need it? Give an example where it might break my app.
 * Wrapping elements with a Fragment can avoid to render an unnecesary DOM node in the DOM tree
   Passing a prop to a Fragment can break the app

## 6. Give 3 examples of the HOC pattern
 * Passing a representational component and adding some information inside of it (fetched data, for example).
 * Sharing information between components. Injecting specific context information into the component passed as an argument in the HOC
 * Passing state logic into the component to be reused alongside other components (Switch component status)

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.
 * Promises => a rejected promise can be handled with a .catch func
 * Async/await => Should be wrapped by a try/catch block to handle the error and avoid breaking the app with an Exception
 * Callback => An error can be passsed as an argument of a callback Func

## 8. How many arguments does setState take and why is it async.
 Just Two..
   * The stateValue/data that we want to update
   * A callback function that will be excecuted after the re-render ends (optional value).
   It behaves in an asyncronous way because the 'old' value won't change (with a new one) until the component re-renders.

## 9. List the steps needed to migrate a Class to Function Component.
 * Replace the class declaration a function declaration (can be an arrow function)
 * Remove constructor
 * Replace lyfecycle methods with their equivalent React.hooks (useEffect)
 * Remove references with the 'this' keyword
 * Remove the render method and place a return statement at the end of the component (returning JSX element/s)

## 10. List a few ways styles can be used with components.
 * Styled components
 * Css file imported in the component (CSS classes)
 * Using inline styles throught the style prop
 * CSS Modules

## 11. How to render an HTML string coming from the server.

With `dangerouslySetInnerHTML`. This is not recommended because it makes the code vulnerable to scripting (XSS) attacks.
