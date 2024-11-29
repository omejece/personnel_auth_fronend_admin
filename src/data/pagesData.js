

const AppData =   {
    infoBoxData:[
        {
            title: "Total Downloads",
            detail: "This month",
            value1: "486",
            value2: "351",
            icon: "feather icon-download",
            color: "bg-grd-primary"
        },
        {
            title: "Total Subscriptions",
            detail: "This Month",
            value1: "1641",
            value2: "213",
            icon: "feather icon-credit-card",
            color: "bg-grd-success"
        },
        {
            title: "Orders Received",
            detail: "Completed Orders",
            value1: "1641",
            value2: "213",
            icon: "feather icon-repeat",
            color: "bg-grd-warning"
        },
        {
            title: "Total Profit",
            detail: "This Month",
            value1: "$9,562",
            value2: "$542",
            icon: "feather icon-award",
            color: "bg-grd-danger"
        }
    ],
    sideBarData:{
        title: "Navigation",
        items:[
            {
               name: "Dashboard",
               link: "/dashboard",
               icon: "ph ph-gauge"
            },
            {
                name: "Users",
                link: "/dashboard/users",
                icon: "ph ph-users"
            },
            {
                name: "Personnels",
                link: "/dashboard/personnels",
                icon: "ph ph-cpu"
            }

        ]
    }
}

export const {
    infoBoxData,
    sideBarData
} = AppData;