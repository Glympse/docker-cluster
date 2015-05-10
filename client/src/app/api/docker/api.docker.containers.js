(function() {
    'use strict';

    angular.module('app.api.docker')

    .service('containersService', function ($http) {
        var service = {
            getList: getList,
            getContainerLogs: getContainerLogs,
            getContainerInfo: getContainerInfo,
            getHostInfo: getHostInfo,
            getImagesList: getImagesList,
            createContainer: createContainer,
            startContainer: startContainer,
            stopContainer: stopContainer,
            restartContainer: restartContainer,
            removeContainer: removeContainer
        };
        return service;

        function getBaseUrl(host) {
            var baseUrl
                = host.docker.protocol + "://"
                + host.network.public_dns + ":"
                + host.docker.port + "/";
            return baseUrl;
        }

        function getList(host) {
            var url
                = getBaseUrl(host)
                + "containers/json?all=true";
            return $http.get(url);
        }

        function getContainerLogs(host, container) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id
                + "/logs?stderr=1&stdout=1&timestamps=1&follow=0&tail=100";
            return $http.get(url);
        }

        function getContainerInfo(host, container) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id
                + "/json";
            return $http.get(url);
        }

        function createContainer(host, name, params) {
            var url
                = getBaseUrl(host)
                + "containers/create"
                + "?name=" + name;
            return $http.post(url, params);
        }

        function startContainer(host, container) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id
                + "/start";
            return $http.post(url);
        }

        function stopContainer(host, container) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id
                + "/stop";
            return $http.post(url);
        }

        function restartContainer(host, container) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id
                + "/restart";
            return $http.post(url);
        }

        function removeContainer(host, container) {
            var url
                = getBaseUrl(host)
                + "containers/" + container.Id;
            return $http.delete(url);
        }

        // NEXT: Move to app.api.docker.generalService
        function getHostInfo(host) {
            var url
                = getBaseUrl(host)
                + "info";
            return $http.get(url);
        }

        // NEXT: Move to app.api.docker.imagesService
        function getImagesList(host) {
            var url
                = getBaseUrl(host)
                + "images/json?all=true";
            return $http.get(url);
        }
    });

})();