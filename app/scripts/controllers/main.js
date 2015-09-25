'use strict';

angular.module('WishList').controller('MainCtrl', function($scope, $http) {

  function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
  }

	$scope.addToWishlist = function(price, devise) {
    $scope.prograssing = true;
    $scope.added = false;
    getCookies("http://localhost:9000", "list_id", function(id) {
      if (id) {
        var list_id = id;

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var url = tabs[0].url;

            $http.post("http://0.0.0.0:9292/wishlistslinks?link="+url+"&wishlist_id="+list_id)
            .success(function(data){
              setPrice(data.id, price, devise)
            });
        });
      }else {
          $scope.prograssing = false;
        alert("Veuillez vous connecter à WishList et aller sur la page d'une liste");
      }
    });

	};

  function setPrice(id, price, devise){
    console.log(devise);
    $http.put("http://0.0.0.0:9292/wishlistslinks/"+id+"?price="+price+"&devise="+devise)
    .success(function(data){
      $scope.prograssing = false;
      $scope.added = true;
    });
  }

});
