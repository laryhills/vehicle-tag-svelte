export function getCookie(name) {
  var dc = document.cookie
  var prefix = name + '='
  var begin = dc.indexOf('; ' + prefix)
  if (begin == -1) {
    begin = dc.indexOf(prefix)
    if (begin != 0) return null
  } else {
    begin += 2
    var end = document.cookie.indexOf(';', begin)
    if (end == -1) {
      end = dc.length
    }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end))
}

export const convertAccessType = (id) => {
  if (id == 0) return 'Checker'
  if (id == 1) return 'Data Entry'
  if (id == 2) return 'Stats'
  if (id == 3) return 'Super'
}

export const titleCase = (string) => {
  var sentence = string.toLowerCase().split(' ')
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
  }
  return sentence.join(' ')
}

export const adminRoutes = [
  {
    group: 'General',
    routes: [
      {
        name: '/admin/dashboard',
        // component: AdminDashboard,
        path: '/admin/dashboard',
        label: 'Dashboard',
        icon: 'fa fa-home',
      },
      {
        name: 'tags',
        // component: Tags,
        path: '/admin/tags',
        label: 'All Vehicle Tags',
        icon: 'fa fa-tags',
      },
      {
        name: '/admin/add-tag',
        // component: AddTag,
        path: '/admin/add-tag',
        label: 'Add Vehicle Tag',
        icon: 'fa fa-tag',
      },
      {
        name: '/admin/upload-tags',
        // component: UploadTags,
        path: '/admin/upload-tags',
        label: 'Upload Vehicle Tags',
        icon: 'fa fa-upload',
      },
      {
        name: '/admin/scan',
        // component: ScanTag,
        path: '/admin/scan',
        label: 'Scan Vehicle Tag',
        icon: 'fa fa-search',
      },
    ],
  },
  {
    group: 'Administration',
    routes: [
      {
        name: '/admin/manage-admin',
        // component: ManageAdmin,
        path: '/admin/manage-admin',
        label: 'Manage Admin',
        icon: 'fa fa-users',
      },
    ],
  },
]
