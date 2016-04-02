/**
 * Created by Aem on 2/16/2016 AD.
 */
angular.module('ui.splash', ['ui.bootstrap']).service('$splash', function ($modal, $rootScope) {
        return {
            open: function (attrs, opts) {
                // Create a new scope so we can pass custom
                // variables into the splash modal
                var scope = $rootScope.$new();
                angular.extend(scope, attrs);
                opts = angular.extend(opts || {}, {
                    backdrop: false,
                    scope: scope,
                    templateUrl: 'splash/content.html',
                    windowTemplateUrl: 'splash/index.html'
                });
                return $modal.open(opts);
            }
        };
    }
);