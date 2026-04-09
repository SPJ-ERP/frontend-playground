export interface BreadcrumbPathNode {
  path: string
  name: string
  /** Jika true, item ini tidak bisa diklik (hanya label) */
  disabled?: boolean
  /** Sub-menu level satu (tampil di sidebar/dropdown) */
  subMenuList?: BreadcrumbPathNode[]
  /** Sub-menu level dua (child langsung, mis. /create, /edit) */
  subMenu?: BreadcrumbPathNode[]
}

const BREADCRUMB_PATHS: BreadcrumbPathNode[] = [
  {
    path: "/",
    name: "Dashboard",
  },
  {
    path: "/master-data",
    name: "Master Data",
    disabled: true,
    subMenuList: [
      {
        path: "/master-data/user",
        name: "User",
        subMenu: [
          {
            path: "/master-data/user/create",
            name: "Tambah User",
          },
          {
            path: "/master-data/user/edit",
            name: "Edit User",
          },
        ],
      },
      {
        path: "/master-data/role",
        name: "Role",
      },
    ],
  },
]

export default BREADCRUMB_PATHS
