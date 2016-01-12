var todoService;

todoService = (function() {
  todoService.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  todoService.defaultConfig = {
    headers: todoService.headers
  };

  function todoService($log, $http, $q) {
    this.$log = $log;
    this.$http = $http;
    this.$q = $q;
    this.$log.debug("constructing todoService");
  }

  todoService.prototype.listNotes = function() {
    var deferred;
    this.$log.debug("listNotes()");
    deferred = this.$q.defer();
    this.$http.get('/listNotes').success((function(_this) {
      return function(data, status, headers) {
        return deferred.resolve(data);
      };
    })(this)).error((function(_this) {
      return function(data, status, headers) {
        return deferred.reject(data);
      };
    })(this));
    return deferred.promise;
  };

  todoService.prototype.save = function(todonote) {
    var deferred;
    this.$log.debug("save " + (angular.toJson(todonote, true)));
    deferred = this.$q.defer();
    this.$http.post('/todonote', todonote).success((function(_this) {
      return function(data, status, headers) {
        return deferred.resolve(data);
      };
    })(this)).error((function(_this) {
      return function(data, status, headers) {
        return deferred.reject(data);
      };
    })(this));
    return deferred.promise;
  };

  todoService.prototype.updateNote = function(title, note, user) {
    var deferred;
    this.$log.debug("updateUser " + (angular.toJson(user, true)));
    deferred = this.$q.defer();
    this.$http.put("/user/" + title + "/" + note, user).success((function(_this) {
      return function(data, status, headers) {
        _this.$log.info("Successfully updated User - status " + status);
        return deferred.resolve(data);
      };
    })(this)).error((function(_this) {
      return function(data, status, header) {
        _this.$log.error("Failed to update user - status " + status);
        return deferred.reject(data);
      };
    })(this));
    return deferred.promise;
  };

  todoService.prototype.deleteNote = function(title, note, user) {
    var deferred;
    this.$log.debug("deleteNote " + (angular.toJson(user, true)));
    deferred = this.$q.defer();
    this.$http.post("/delete/" + title + "/" + note, user).success((function(_this) {
      return function(data, status, headers) {
        _this.$log.info("Successfully deleted User - status " + status);
        return deferred.resolve(data);
      };
    })(this)).error((function(_this) {
      return function(data, status, header) {
        _this.$log.error("Failed to delete user - status " + status);
        return deferred.reject(data);
      };
    })(this));
    return deferred.promise;
  };

  

  return todoService;

})();

servicesModule.service('todoService', todoService);
