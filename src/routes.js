import Login from './pages/public/Login.svelte'
import AdminLayout from './pages/admin/AdminLayout.svelte'
import AdminDashboard from './pages/admin/AdminDashboard.svelte'
import Tags from './pages/admin/Tags.svelte'
import ManageAdmin from './pages/admin/ManageAdmin.svelte'
import AddTag from './pages/admin/AddTag.svelte'
import UploadTags from './pages/admin/UploadTags.svelte'
import Tag from './pages/admin/Tag.svelte'
import PrintTags from './pages/admin/PrintTags.svelte'
import ScanTag from './pages/admin/ScanTag.svelte'
import Page404 from './pages/public/Page404.svelte'

// Also update adminRoutes in utilities

const routes = [
  {
    name: '/',
    redirectTo: 'admin/dashboard',
    isExcludedFromNav: true,
  },
  {
    name: 'tag/:tagNo',
    component: Tag,
  },
  {
    name: 'tags/print',
    component: PrintTags,
  },
  // {
  //   name: '/tags',
  //   redirectTo: 'admin/tags',
  //   isExcludedFromNav: true,
  // },

  // using nested for all admin pages
  // Admin Layout will be used as navbar over all admin pages
  {
    name: '/admin',
    component: AdminLayout,
    nestedRoutes: [
      {
        name: 'dashboard',
        component: AdminDashboard,
        path: '/',
        label: 'Dashboard',
      }, //index => root
      {
        name: 'tags',
        component: Tags,
        path: 'tags',
        label: 'All Vehicle Tags',
      },
      {
        name: 'manage-admin',
        component: ManageAdmin,
      },
      {
        name: 'add-tag',
        component: AddTag,
      },
      {
        name: 'upload-tags',
        component: UploadTags,
      },
      {
        name: 'scan',
        component: ScanTag,
      },
    ],
  },

  { name: '/login', component: Login, isExcludedFromNav: true },
  { name: '404', component: Page404 },
]

export { routes }
