const Group = require("../models/Group");
const ApiStatus = require("../handlers/apiStatus");


class GroupService {
    
    async getAllGroups() {
        try {
            const groups = await Group.findAll();
            if(groups) {
                return {groups};
            } else {
                throw ApiStatus.badRequest("Группы не найдены");
            }
        } catch (e) {
            throw ApiStatus.internal(`Ошибка сервера: ${e}`);
        }
    }

    async getGroupById(groupId) {
        try {
            const group = await Group.findOne({where:{id:groupId}});
            if(group) {
                return {group};
            } else {
                throw ApiStatus.badRequest("Группа не найдена");
            }
        } catch (e) {
            throw ApiStatus.internal(`Ошибка сервера: ${e}`);
        }
    }

    async createGroup(groupName, groupType) {
        try {
            const candidateGroup = await Group.findOne({
                where:{group_name:groupName},
            });
            if(candidateGroup) {
                throw ApiStatus.badRequest("Группа с таким именем уже существует");
            }
            const createGroup = await Group.create({
                group_name:groupName,
                group_type:groupType,
            });
            if(!createGroup) {
                throw ApiStatus.internal("Группа не создана");
            }
            return {createGroup};
        } catch (e) {
            throw ApiStatus.internal(`Ошибка сервера: ${e}`);
        }
    }
}


module.exports = new GroupService();
