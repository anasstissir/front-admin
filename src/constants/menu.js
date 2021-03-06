const data = (role) => {
  if (role === "ROLE_EDITOR") {
    return [
      {
        id: "kpi",
        icon: "iconsminds-statistic",
        label: "menu.kpi",
        to: "/app/kpi",
        subs: () => [],
      },
      {
        id: "communication",
        icon: "iconsminds-radio",
        label: "menu.communication",
        to: "/app/communication",
        subs: () => [
          {
            label: "menu.category",
            to: "/app/communication/category",
            icon: "simple-icon-tag",
          },
          {
            label: "menu.article",
            to: "/app/communication/article",
            icon: "simple-icon-docs",
          },
          {
            label: "menu.notifications",
            to: "/app/communication/notification",
            icon: "simple-icon-bell",
          },
          {
            label: "menu.event",
            to: "/app/communication/event",
            icon: "iconsminds-calendar-4",
          },
        ],
      },
      {
        id: "FAQs",
        icon: "iconsminds-life-safer",
        label: "menu.FAQ",
        to: "/app/faq",
        subs: () => [
          {
            label: "menu.section",
            to: "/app/section",
          },
          {
            label: "menu.sub-section",
            to: "/app/sub-section",
          },
          {
            label: "menu.question",
            to: "/app/question",
          },
        ],
      },
      {
        id: "sondage",
        icon: "iconsminds-check",
        label: "menu.sondage",
        to: "/app/sondage",
        subs: () => [],
      },
    ];
  } else {
    return [
      {
        id: "kpi",
        icon: "iconsminds-statistic",
        label: "menu.home",
        to: "/app",
        subs: () => [],
      },
      {
        id: "gogo",
        icon: "iconsminds-business-man-woman",
        label: "menu.gestion-rh",
        to: "/app/gestionAdmin",
        subs: () => [
          {
            label: "menu.data-listAdmin",
            to: "/app/access/gestion-admin",
            icon: "simple-icon-people",
          }
        ],
      },
      {
        id: "communication",
        icon: "iconsminds-radio",
        label: "menu.communication",
        to: "/app/communication",
        subs: () => [
          {
            label: "menu.category",
            to: "/app/communication/article",
            icon: "simple-icon-tag",
          },
          {
            label: "menu.notification",
            to: "/app/communication/notification",
            icon: "simple-icon-bell",
          },
          {
            label: "menu.event",
            to: "/app/communication/event",
            icon: "iconsminds-calendar-4",
          },
        ],
      },
     
    ];
  }
};
export default data;
