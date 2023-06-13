import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiAccountKey,
  mdiAccountEye,
  mdiAccountGroup,
  mdiAccountStarOutline ,
  mdiPalette,
  mdiTankerTruck,
  mdiTruck,
  mdiScaleBalance,
  mdiThermometerCheck,
  mdiTruckCheck,
  mdiCurrencyUsd

} from '@mdi/js';







export default [
  {
    route: 'dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',

  },

  {
    label:'ژمێریاری',
    icon: mdiTruck  ,
    target: '_blank',
    menu: [

      {  label: 'نرخی دراوەکان  ',
      icon:mdiScaleBalance  ,
      route:'currency.index',
      target: '_blank',
      },

    {


      route:'companies.index',
      label: 'کەسەکان ',
      icon:mdiTankerTruck  ,
    },

    {
    label:'گرێبەستەکان',
    icon: mdiTruck  ,
    target: '_blank',
    menu: [
      {

        route:'contract.index',
        label: 'گرێبەستی کڕین',
        data:1,
        icon:mdiScaleBalance  ,
      },

      {
      route:'contract.index',
      label: 'گرێبەستی فرۆشتن',
      data:2,
      icon:mdiScaleBalance  ,
      },
      {
      route:'contract.index',
      label: 'گرێبەستی دەرەکی کڕین',
      data:3,
      icon:mdiScaleBalance  ,
      },
      {
      route:'contract.index',
      label: 'گرێبەستی دەرەکی فرۆشتن',
      data:4,
      icon:mdiScaleBalance  ,
      },
      {
        route:'contract.index',
        label: 'گرێبەستی  ناوخۆ',
        data:5,
        icon:mdiScaleBalance  ,
        },

      ]},

      {  label: 'قاسە   ',
      icon:mdiScaleBalance  ,
      target: '_blank',
      menu:[
        {
          label: 'جۆر  ',
          icon:mdiScaleBalance  ,
          route:'treasurerCategory.index',
          },
        {
          label: 'لق  ',
          icon:mdiScaleBalance  ,
          route:'treasurer.index',
          },
        {
          label: 'پارەدان  ',
          icon:mdiScaleBalance  ,
          route:'statement.index',
          data:1
          },
        {
          label: 'پارەوەرگرتن  ',
          icon:mdiScaleBalance  ,
          route:'statement.index',
          data:2
          },
        {
          label: 'مامەڵەی دراوەکان  ',
          icon:mdiScaleBalance  ,
          route:'treasurertranaction.index',
          data:2
          },
        {
          label: 'گواستنەوەی پارە',
          icon:mdiScaleBalance  ,
          route:'statementtransfer.show',
          data:2
          },
      ]
      },

      {
      label: 'کولفەی کۆگاکان ',
      icon:mdiScaleBalance  ,
      route:'stockrate.index',
      },


      {  label: 'بەیاننامەی ئەژمار',
      icon:mdiScaleBalance  ,

      target: '_blank',
      },
      {
        label: 'خەرجییەکان',
        icon: mdiTruckCheck   ,
        target: '_blank',
        menu: [
        {  label: 'لیستی خەرجییەکان',
          icon:mdiThermometerCheck   ,

          target: '_blank',
        },
        {  label: '- ',
        icon:mdiTankerTruck  ,

        target: '_blank',
      },
        ]
      },


    ]
  },

  {
    label:'کۆگا',
    icon: mdiTruck  ,
    target: '_blank',
    menu: [
    {
      label: 'کۆگاکان ',
      icon:mdiTankerTruck  ,
      menu:[
        {
          route:'mainstock.index',
          label: 'بەشە سەرەکییەکان ',
          icon:mdiTankerTruck  ,
        },
        {
          route:'stock.index',
          label: 'جۆر ',
          icon:mdiTankerTruck  ,
        },
        {
          route:'stockelement.index',
          label: 'لق ',
          icon:mdiTankerTruck  ,
        },
        {
          route:'production',
          label: 'لیستی بەرهەم ',
          icon:mdiTankerTruck  ,
        },

      ]

    },
    {
      label:'کاڵا',
      icon: mdiTruck  ,
      target: '_blank',
      menu:[
        {
      route:'productCategory.index',
      label: 'جۆری کاڵاکان ',
      icon:mdiTankerTruck  ,
        },

        {
          route:'product.index',
          label: 'کاڵاکان ',
          icon:mdiTankerTruck  ,
         }
      ]
    },

    ]
    },



  {
    label: 'قەپان',
    icon: mdiTruck  ,
    target: '_blank',
    menu: [
    {  label: 'لێستی بارەکان',
      icon:mdiTankerTruck  ,
      route:'loads.index',
      target: '_blank',
    },
      {
      route:'scale.index',
      label: 'کێش کراوەکان',
      icon:mdiScaleBalance  ,

      target: '_blank',
    }


    ]
},
{
  label: 'تاقیگە',
  icon: mdiTruckCheck   ,
  target: '_blank',
  menu: [
  {  label: 'لێستی پشکنین',
    icon:mdiThermometerCheck   ,
    route:'lab.index',
    target: '_blank',
  }
  ]
},
{
  label: 'پرسگە',
  icon: mdiTruckCheck   ,
  target: '_blank',
  menu: [
  {  label: 'لێستی بارەکان',
  icon:mdiTankerTruck  ,

  target: '_blank',
},
  ]
},

{
  label: 'بەشی سەلامە',
  icon: mdiTruckCheck   ,
  target: '_blank',
  menu: [
  {  label: ' ',
    icon:mdiThermometerCheck   ,

    target: '_blank',
  },
  {  label: ' ',
  icon:mdiTankerTruck  ,

  target: '_blank',
},
  ]
},

{
  label: 'بنکەی تەندورستی',
  icon: mdiTruckCheck   ,
  target: '_blank',
  menu: [
  {  label: ' ',
    icon:mdiThermometerCheck   ,

    target: '_blank',
  },
  {  label: ' ',
  icon:mdiTankerTruck  ,

  target: '_blank',
},
  ]
},
{
  label: 'HR',
  icon: mdiTruckCheck   ,
  target: '_blank',
  menu: [
  {  label: 'لیستی ئامادەکردنی مووچە',
    icon:mdiAccountGroup   ,
       route:'employee.index',
    target: '_blank',
  },
  {  label: 'لیستی سولفە',
    icon:mdiCurrencyUsd   ,
       route:'advance.index',
    target: '_blank',
  },
  {  label: 'لیستی مامەلی کارمەندان',
    icon:mdiCurrencyUsd   ,
       route:'employeedetail.index',
    target: '_blank',
  },

  ]
},

  {
    route: 'permission.index',
    icon: mdiAccountKey,
    label: 'Permissions'
  },
  {
    route: 'role.index',
    icon: mdiAccountEye,
    label: 'Roles'
  },
  {
    route: 'user.index',
    icon: mdiAccountGroup,
    label: 'Users'
  },


  {
    label: 'Sttings',
    icon: mdiAccountStarOutline ,
    target: '_blank',
    menu: [
    {  label: 'Companies',
      icon:mdiAccountStarOutline ,

      target: '_blank',
    },
      {  label: 'Companies',
      icon:mdiAccountStarOutline ,

      target: '_blank',
    }
    ]


},


]
