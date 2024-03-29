// This enum will tie the route itself and any links to those routes
// You could use a reg JS object instead of TS enum, but the enum is nice
// because if someone tries to mutate a property the compiler will get mad

enum Routes {
  Main = '/',
  Login = '/login',
  SignUp = '/sign-up',
  SignUpComplete = '/sign-up/complete',
  Map = '/map',
  Profile = '/profile',
  Friends = '/friends',
  DebugZone = '/debug-zone',
}

export default Routes;
