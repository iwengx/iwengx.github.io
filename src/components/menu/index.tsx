import React, { ChangeEvent, ReactNode, useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { ClassificationProps } from './interface';
import { MenuProps, QueryProps } from '../../interface/pages';
import { throttle } from '../../utils';

import SearchInput from './components/search-input';

import './index.scss';

const Menu = () => {
   // * 获取菜单列表，并且过滤掉 type 为空的菜单项
   const menuList = useStaticQuery<QueryProps>(graphql`
      {
         allMarkdownRemark {
            edges {
               node {
                  frontmatter {
                     title
                     type
                  }
                  fields {
                     slug
                  }
               }
            }
            totalCount
         }
      }
   `).allMarkdownRemark.edges.filter((item) => item.node.frontmatter.type);

   // * 搜索后显示的菜单项（默认全部显示）
   const [searchMenu, setSearchMenu] = useState<MenuProps[]>(menuList);

   // * 搜索输入框修改事件
   const searchInputOnChange = (value: ChangeEvent<HTMLInputElement>) => {
      // 添加一个节流
      throttle(() => {
         const searchTerm = value.target.value;
         if (searchTerm) {
            const result = menuList.filter((item) => {
               return item.node.frontmatter.title
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase());
            });
            setSearchMenu(result);
         }
         // * 搜索内容为空时
         else {
            setSearchMenu(menuList);
         }
      }, 100)();
   };

   // * 对菜单进行分类
   const menuClassification = (menu: MenuProps[]): ClassificationProps => {
      const result: ClassificationProps = {};

      menu.forEach((child) => {
         const tempType = child.node.frontmatter.type;
         if (tempType in result) {
            result[tempType].push(child);
         } else {
            result[tempType] = [child];
         }
      });

      return result;
   };

   // * 将分类好的对象转为 ReactNode 呈现到页面上
   const showMenuNode = (classification: ClassificationProps): ReactNode => {
      return Object.keys(classification).map((type) => {
         return (
            <div key={type}>
               <p className="type-title">{type}</p>
               <ul>
                  {classification[type].map((item, index) => {
                     return (
                        <li key={index} className="post-title">
                           <Link to={item.node.fields.slug}>
                              {item.node.frontmatter.title}
                           </Link>
                        </li>
                     );
                  })}
               </ul>
            </div>
         );
      });
   };

   return (
      <div className="menu-container">
         <SearchInput onChange={searchInputOnChange}></SearchInput>
         <div>{showMenuNode(menuClassification(searchMenu))}</div>
      </div>
   );
};

export default Menu;
