//  MODULE _____________________________________________________________________________________________________________
/*    
    @ngdoc              module
    @name               ui.router.permissions

    @description        Holds user permissions by feature and intercepts state transitions based on permission
*/  
//  SERVICE ____________________________________________________________________________________________________________
/*    
    @ngdoc              factory
    @name               ui.router.permissions:uiRouterPermissionsSrv
*/    
//  DEFINITION _________________________________________________________________________________________________________
   
    function uiRouterPermissionsSrv($rootScope) {
        
        var _role = {},
            _rolesCollection = {};

        registerEvents();

        return {
            setRolesCollection: setRolesCollection,
            setRole: setRole,
            getRole: getRole
        };

        function setRolesCollection(rolesCollection) {
            _rolesCollection = rolesCollection;
            return this;
        }

        function setRole(role) {
            if (_rolesCollection.hasOwnProperty(role)) {
                _role = { 
                    name: role,
                    permissions: _rolesCollection[role]
                };
            } else {
                throw new Error('role ' + _role + ' does not exists in rolesCollection');
            }
            return this;
        }

        function getRole() {
            return _role;
        }

//  Intercept route change and check if it has the required role

        function registerEvents() {
            $rootScope.$on('$stateChangeStart', function (event, next) {
                if(next.data.permission !== '*' && _role.permissions.indexOf(next.data.permission) === -1) {
                    event.preventDefault();
                    $rootScope.$broadcast('uiRouterPermissionsSrv::notAuthorized');
                }
            });
        }
    }

//  MODULE ASSIGNEMENT _________________________________________________________________________________________________

    angular.module('ui.router.permissions', [])
          .factory('uiRouterPermissionsSrv', uiRouterPermissionsSrv);
