# ui-router-permissions

Use it along [ui-router](https://github.com/angular-ui/ui-router) to add state transition interception bases on user permissions.

##Setup
Add this module to your App
```
angular.module('app', ['ui.router.permissions'])
```
Add any object to your app containing the roles and permissions like this, I use constants:
```
angular.constant('USER_ROLES', {
      user:  [
            'section.home',
            'section.cart',
            'section.race',
            'section.searchResults',
            'section.payment'
        ]
    });
```
Now add the permission required by the state to be transitioned to
```
angular.module('app')
.config(
    function($stateProvider, USER_ROLES) {
        $stateProvider
        .state('cart', {
            url: "/cart",
            data: {
                permission: 'section.cart'
            }
        });
    }); 
```
Finally init the service passing the roles collection and the current role of the user by calling
```
uiRouterPermissionsSrv
    .setRolesCollection(USER_ROLES)
    .setRole('user');
```
## How does it works
uiRouterPermissionsSrv will check that the current user has the permission needed by the new state before transitioning to it. It will fire the event __uiRouterPermissionsSrv::notAuthorized__ and prevent the transition if it does not find the permission in the user permissions list.

You can subscribe to the event to handle each case 
```
$rootScope.$on('uiRouterPermissionsSrv::notAuthorized', function() {
    notificationSrv.showNotification(['Thou shall not pass']);
});
```
You may also get the permission list by calling 
```
uiRouterPermissionsSrv.getRole().permissions;
```
from any controller that injects uiRouterPermissionsSrv so you can show/hide content by feature.
