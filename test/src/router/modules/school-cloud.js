import Layout from '@/layout/index'

/**
 *h5页面比较零碎，麻烦写好页面注释
 * */
export default [
  {
    path: '/school-cloud',
    name: 'school-cloud',
    component: Layout,
    meta: {
      title: '学校云管理',
      icon: 'el-icon-s-tools',
      affix: true,
      breadcrumb: true,
    },
    alwaysShow: true,
    children: [
      {
        path: 'area-manage',
        name: 'area-manage',
        component: () => import('@/views/school-cloud/area-manage.vue'),
        meta: {
          title: '区域管理',
          affix: true,
        },
      },
      {
        path: 'addArea',
        name: 'addArea',
        component: () => import('@/views/school-cloud/updateOrAddArea.vue'),
        meta: {
          title: '新建区域主页',
          affix: true,
          breadcrumbs: [
            { path: '/school-cloud/area-manage', title: '区域管理' },
          ], //面包屑部分，面包屑中自动补充dashboard，以及自身，此处填写中间的部分，*注意必须按照顺序填写
          activeMenu: '/school-cloud/area-manage', //菜单激活部分 为区域管理
        },
        hidden: true,
      },
      {
        path: 'editArea/id/:id',
        name: 'editArea',
        component: () => import('@/views/school-cloud/updateOrAddArea.vue'),
        meta: {
          title: '编辑区域主页',
          affix: true,
          breadcrumbs: [
            { path: '/school-cloud/area-manage', title: '区域管理' },
          ], //面包屑部分，面包屑中自动补充dashboard，以及自身，此处填写中间的部分，*注意必须按照顺序填写
          activeMenu: '/school-cloud/area-manage', //菜单激活部分 为区域管理
        },
        hidden: true,
      },
      {
        path: 'school-manage',
        name: 'school-manage',
        component: () => import('@/views/school-cloud/school-manage.vue'),
        meta: {
          title: '学校管理',
          affix: true,
        },
      },
      {
        path: 'addSchool',
        name: 'addSchool',
        component: () => import('@/views/school-cloud/updateOrAddSchool.vue'),
        meta: {
          title: '新建学校主页',
          affix: true,
          breadcrumbs: [
            { path: '/school-cloud/school-manage', title: '学校管理' },
          ], //面包屑部分，面包屑中自动补充dashboard，以及自身，此处填写中间的部分，*注意必须按照顺序填写
          activeMenu: '/school-cloud/school-manage', //菜单激活部分 为区域管理
        },
        hidden: true,
      },
      {
        path: 'editSchool/id/:id',
        name: 'editSchool',
        component: () => import('@/views/school-cloud/updateOrAddSchool.vue'),
        meta: {
          title: '编辑学校主页',
          affix: true,
          breadcrumbs: [
            { path: '/school-cloud/school-manage', title: '学校管理' },
          ], //面包屑部分，面包屑中自动补充dashboard，以及自身，此处填写中间的部分，*注意必须按照顺序填写
          activeMenu: '/school-cloud/school-manage', //菜单激活部分 为区域管理
        },
        hidden: true,
      },
    ],
  },
]
