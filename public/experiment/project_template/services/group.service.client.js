(function(){
    "use script";
    angular
        .module("SplitUpApp")
        .factory("GroupService", GroupService);

    function GroupService($rootScope) {

        // stores the data about all the users
        var groups = {};

        groups= [
            {	"_id":123, "gName":"Grad College",            "members":["Alice","Bob","Charlie"], },
            {	"_id":234, "gName":"UnderGrad College",            "members":["John","Dan","Edward"], },
            {	"_id":345, "gName":"Rommates",            "members":["Zoom","Flash","Jay"], },
            {	"_id":456, "gName":"Partners",            "members":["Jose","Neil","Oliver"], }
        ];

        var api = {
            //findGroupByCredentials : findGroupByCredentials,
            findAllGroups : findAllGroups,
            createGroup : createGroup,
            deleteGroupById : deleteGroupById,
            updateGroup : updateGroup
        }

        return api;


        // function finds all the users
        function findAllGroups(callback) {
            callback(groups);
        }

        // function creates a new user
        function createGroup(group,callback){
            groups.push(group);
            callback(group);
        }

        // function deletes a user
        function deleteGroupById(groupId,callback){
            for(var index in groups){
                if(groups[index]._id==groupId){
                    groups.splice(index,1);
                    break;
                }
            }

            callback(groups);
        }

        // function updates a user entry
        function updateGroup(groupId,group,callback){
            for(var index in groups){
                if(groups[index]._id==groupId){
                    groups[index] = group;
                    callback(groups[index]);
                    break;
                }
            }
        }
    }
})();