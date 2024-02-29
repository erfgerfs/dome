import Layout from '@/layout'

export const Dtrouter = [
  {
    path: '/park',
    component: Layout,
    alwaysShow: true,
    permission: "park",
    meta: { title: '园区管理', icon: "el-icon-office-building" },
    children: [
      {
        path: 'building',

        permission: "park:building",
        component: () => import('@/views/park/building/index'),
        meta: { title: '楼宇管理' }
      },
      {
        path: 'enterprise',

        permission: "park:enterprise",
        component: () => import('@/views/park/enterprise/index'),
        meta: { title: '企业管理' },

      },

    ]
  },
  {
    path: '/car',
    component: Layout,
    alwaysShow: true,
    permission: "parking",
    meta: { title: '行车管理', icon: "el-icon-guide" },
    children: [
      {
        path: 'area',
        permission: "parking:area",
        component: () => import('@/views/car/area/index'),
        meta: { title: '区域管理' }
      },
      {
        path: 'monthCard',
        permission: "parking:monthCard",
        component: () => import('@/views/car/monthCard/index'),
        meta: { title: '月卡管理' }
      },
      {
        path: 'pay',
        permission: "parking:payment",
        component: () => import('@/views/car/pay/index'),
        meta: { title: '停车缴费管理' }
      },
      {
        path: 'billing',
        permission: "parking:rule",
        component: () => import('@/views/car/billing/index'),
        meta: { title: '计费规则管理' }
      },
    ]
  },
  {
    path: '/propety',
    component: Layout,
    children: [{
      path: 'cost',
      permission: "propety",
      component: () => import('@/views/cost/index'),
      meta: { title: '物业费管理', icon: "form" }
    }]
  },
  {
    path: '/rod',
    component: Layout,
    permission: "pole",
    meta: { title: '一体杆管理', icon: "el-icon-refrigerator" },
    children: [
      {
        path: 'manage',
        permission: "pole:info",
        component: () => import('@/views/rod/manage/index'),
        meta: { title: '一体杆管理' }
      },
      {
        path: 'warnList',
        permission: "pole:warning",
        component: () => import('@/views/rod/warnList/index'),
        meta: { title: '告警记录' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    permission: "sys",
    alwaysShow: true,
    meta: { title: '系统管理', icon: "el-icon-setting" },
    children: [
      {
        path: 'employee',
        permission: "sys:user",
        component: () => import('@/views/system/employee/index'),
        meta: { title: '员工管理' }
      },
      {
        path: 'permission',
        permission: "sys:role",
        component: () => import('@/views/system/permission/index'),
        meta: { title: '角色管理' }
      },
    ]
  }
]
