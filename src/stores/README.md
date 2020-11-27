## On State Management

The goal in state management is to have a way to have a system where the state data is:

1. Easily definable
2. Organized
3. Easily shared
4. Persistent

React state is good for many small use cases. It is good at number 1, and arguable OK for number 2.
But it is awful for number 3, and number 4 can be impossible depending on the structure of your app
(the state data will reset as soon as the component disappears from the react tree). The goal here
is to make a system which is separate from react but that can be used with react that will keep
track of our important state data.

We can use regular state when the data doesn't necessarily have the properties listed above. For
example, data that doesn't need to be shared (e.g. data that is only used in the react component,
like an input's text or something). Or for example, data that doesn't need to be "persisted",
which is to say data that doesn't need to live for the entirety of the app's lifetime.

## MobX

Is just a library that gives you "observables".

The "observer pattern" is a well-established programming pattern which solves the problem of how
one can inform other parts of the code when some data is updated. In other words, you have
"observables", data to be observed, and "observers", or things that wish to observe that data.

In React, we'll have some data, observables, and we'll have React components which subscribe
to that data, observers. Observables have some special methods to update them and notify those
observing them. Observable arrays, objects, have some special methods and everything else is
just an observable box, which uses `get` and `set`. More can be found here:

https://mobx.js.org

## Our setup

Our setup uses four parts, which is a bit much, but I think the payoff is quite nice.
When all these four parts come together, we have easily defined state which is easy to import.
The tradeoff is some amount of complexity.

1. Use mobx to create observables and use actions to operate on those observables. The imports here
   are `observable` and `action`
2. Organize these observables into "stores", basically collections of observables. The advantage
   here is that you can logically group pieces of state together (for example, everything having
   to do with friends, hangzones, etc)
3. Share the stores through `React.Context`s, so that we don't have to pass the stores everywhere.
   The alternative would be to initialize our store at the beginning of the app and pass it through
   react props, which would be super annoying. You create a context by using `createContext`.
4. Use mobx-react-lite to have our react components re-render when there is an update to an
   observable. You do this by wrapping the component in the `observer` function.
