angular.module('Minimo1App').controller('ApiCtrl',['$scope','$http','$routeParams','$filter',function($scope, $http, $routeParams, $filter){
    $scope.NewStudent = {};
    $scope.addContact = false;
    $scope.NewContact = {};
    $scope.NewSearch = null;
    $scope.orderQuery = null;

    //Mostrar Contacts cuando sea necessario
    $scope.stuIndex = null;
    $scope.showAddContact = function (index) {
        if($scope.stuIndex == index)
            $scope.stuIndex = null;
        else $scope.stuIndex = index;

    };

    $scope.isShowing = function(index){
        return  $scope.stuIndex === index;
    };

    //Mostrar Contacts cuando sea necessario
    $scope.sbuIndex = null;
    $scope.showAddStudent = function (index) {
        if($scope.sbuIndex == index)
            $scope.sbuIndex = null;
        else $scope.sbuIndex = index;

    };

    $scope.isShowingStudents = function(index){
        return  $scope.sbuIndex === index;
    };

    // when landing on the page, get all user and show them
    $http.get('/api/students')
        .success(function(data) {
            $scope.students = data;
            console.log(data);
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when landing on the page, get all user and show them
    $http.get('/api/subjects')
        .success(function(data) {
            $scope.subjects = data;
            console.log(data);

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    $scope.CreateStudent = function(){
        $http.post('/api/student', $scope.NewStudent)
            .success(function(data){
                $scope.NewStudent = {}; //clear the form
                $scope.students = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };
    $scope.CreateSubject = function(){
        $http.post('/api/subject', $scope.NewSubject)
            .success(function(data){
                $scope.NewSubject = {}; //clear the form
                $scope.subjects = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

    $scope.DeleteStudent = function(id){
        $http.delete('api/student/' + id)
            .success(function(data) {
                $scope.students = data;
                
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    $scope.DeleteSubject = function(id){
        $http.delete('api/subject/' + id)
            .success(function(data) {
                $scope.subjects = data;

            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    $scope.AddContact = function(id){
        var newCon = {};
        newCon.student_id = id;
        newCon.number = $scope.NewContact.number;


        console.log(newCon);

        if($scope.NewContact.typeContact == 'Work'){
            $http.post('api/student/add/work', newCon)
                .success(function(data) {
                    console.log(data);
                    $scope.students = data;
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
        }
        if($scope.NewContact.typeContact == 'Home'){
            $http.post('api/student/add/home', newCon)
                .success(function(data) {
                    console.log(data);
                    $scope.students = data;
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
        }
        newCon = {};
        $scope.NewContact = {};
    };

    $scope.AddStudentinSubject = function(id, stu){
        console.log(stu);
            $http.post('api/subject/studentadd/' + id, stu)
                .success(function(data) {
                    console.log(data);
                    $scope.subjects = data;
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
    };


    $scope.UpdateStudent = function() {
        console.log($scope.NewStudent);

        $http.put('api/student/' + $scope.NewStudent._id, $scope.NewStudent)
            .success(function(data){
                $scope.NewStudent = {};
                $scope.students = data;
                console.log('Success' + data);
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error' + data);
            });
    };

    $scope.UseStudent = function(student) {
        console.log(student);
        angular.copy(student, $scope.NewStudent)
        console.log($scope.NewStudent)
        $scope.selected = true;
    };


    $scope.SearchSubjects = function(){
        RemoveOrderLength();
        console.log($scope.NewSearch);
        $http.get('/api/subjects/find/' + $scope.newfilter +'/' +  $scope.NewSearch.text)
            .success(function(data){
                $scope.subjects = data;
                console.log(data);
                $scope.newfilter = null;
            })
            .error(function(data){
                console.log('Error:' + data);
            });

    };
    $scope.OrderSubjects = function(filter){
        RemoveOrderLength();
        $http.get('/api/subjects/find/' + filter +'/' +filter)
            .success(function(data){
                $scope.subjects = data;
                console.log(data);
                $scope.newfilter = null;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };


    RemoveOrderLength = function(){
        $scope.orderQuery = null;
    };


    $scope.Clean = function(){
        $http.get('/api/subjects')
            .success(function(data) {
                $scope.subjects = data;
                console.log(data);

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}]);



