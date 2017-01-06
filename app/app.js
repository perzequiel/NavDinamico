(function () {
'use strict'
	
	var App = angular.module('App', ["ngTable"]);
	
	App.factory("flapsLoader", function($http){
		var gridsToLoad = [];

		var interfaz = {
			setGrid: function(flap){
				var grids = [];
				var subflaps = [];
				$http.get(URL_GLOBAL+'/res/'+flap+'.js')
				.then(function(res){
					grids = res.data
					
					$http.get(URL_GLOBAL+'/res/'+flap+'Sub.js')
				   .then(function(res){
						subflaps = res.data
					
						var gridSubflaps = {"grids" : "", "subflaps" : ""};
						gridSubflaps.grids = grids;
						gridSubflaps.subflaps = subflaps;
						gridsToLoad.push(gridSubflaps);
					});	
				});
			},
			getGrids: function(){
				return gridsToLoad;
			}
		}
		return interfaz;
	});
		
	App.controller('ControladorFlaps', function($scope, $http, flapsLoader, NgTableParams) {
	
		$http.get(URL_GLOBAL+'/res/solapas.js')
		.then(function(res){
			$scope.flaps = res.data.flaps;    
			res.data.flaps.forEach(function(fl) {
				flapsLoader.setGrid(fl.name);	
			});  
			$scope.section = flapsLoader.getGrids();
			console.log($scope.section);
		});	
		
		$scope.mostrarID = function(mensaje,valor,grid) {  

			$("#"+valor+' tr').each(function () {
				var attr = $(this).attr('class');
				if ((typeof(attr) != "undefined") && (attr.indexOf('active') >= 0)){
					
					alert(grid + mensaje + $(this).find('td:eq(0)').html());
					
					$(this).children('td').each(function() {
						valor = $(this).html();
						console.log(valor);
					})
				} 
			})
		};
		
		$scope.SeleccionaReg = function(flap,actual) {  
		
			$scope.section[0].subflaps.sub[0].nombre = actual.rows.row[1].value;
			$scope.section[0].subflaps.sub[0].apellido = actual.rows.row[2].value;
			$scope.section[0].subflaps.sub[0].direccion = actual.rows.row[3].value;
			//$scope.section[0].subflaps.sub[0].ciudad = actual.rows.row[4].value;
			//$scope.section[0].subflaps.sub[0].usuario = actual.rows.row[5].value;
		}
	});
	
})();