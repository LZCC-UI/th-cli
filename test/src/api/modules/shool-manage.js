export default {
  // 分页查询学校列表（带搜索）
  getSchoolList: ['/admin/school/getSchoolList?pageSize=20	', 'GET'],
  //查看某个学校具体信息
  getSchoolById: ['/admin/school/getSchoolById', 'GET'],
  //删除某个学校信息
  delSchoolById: ['/admin/school/delSchoolById', 'GET'],
  //校验学校英文名称重复
  checkSchoolName: ['/admin/school/checkSchoolName', 'GET'],
  //   新增或更新学校信息
  addOrUpdateSchool: ['/admin/school/addOrUpdateSchool', 'POST'],
  //获取价格详细信息
  getPricePlanList: ['/admin/school/getPricePlanList', 'GET'],
}
