export default {
  //分页查询区域列表
  getAreaList: ['/admin/area/getAreaList?pageSize=20', 'GET'],
  //查看某个区域详细信息
  getAreaById: ['/admin/area/getAreaById', 'GET'],
  //删除某个区域信息
  delAreaById: ['/admin/area/delAreaById', 'GET'],
  //校验区域英文名称重复
  checkAreaName: ['/admin/area/checkAreaName', 'GET'],
  //获取区域下的学校列表
  getAreaSchoolList: ['/admin/area/getAreaSchoolList', 'GET'],
  //获取区域可以添加的学校（包含区域下的学校）
  getAreaSelectSchool: ['/admin/area/getAreaSelectSchool?pageSize=20', 'GET'],
  //   新增或者编辑区域
  addOrUpdateArea: ['/admin/area/addOrUpdateArea', 'POST'],
}
