import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Moj profil',
    path: '/profil',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Početna',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Jela',
    path: '/jela',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
 
  {
    title: 'Postavke',
    path: '/postavke',
    icon: <AiIcons.AiFillSetting/>,
    cName: 'nav-text'
  },
  
];