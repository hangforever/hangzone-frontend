// This enum will tie the route itself and any links to those routes
// You could use a reg JS object instead of TS enum, but the enum is nice
// because if someone tries to mutate a property the compiler will get mad

enum Routes {
  Main = '/',
  Login = '/login',
  Map = '/map'
}

export default Routes
