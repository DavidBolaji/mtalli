import { Menu } from "antd";
import styled from '@emotion/styled'

export const MenuStyled = styled(Menu)`
  && {
    background-color: #fff;

    .ant-menu-title-content {
      color: #011D2E;
      margin-left: 14px !important;
      font-weight: 400;
      
    }

    .ant-menu-item-icon {
      color: #011D2E;
    }

    .ant-menu-item.ant-menu-item-selected {
      background-color: #CCE2EE;
      border-radius: 0px;
      border-left: 4px solid #011D2E;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      > * {
      margin-left: -5px;
      }
    }

    .ant-menu-item.ant-menu-item-selected > * {
      color: #011D2E !important;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }

    .ant-menu-item.ant-menu-item-selected > .ant-menu-item-icon {
      color: red !important;
    }

    .ant-menu-item.ant-menu-item-active {
      background-color: #CCE2EE !important; /** sidebar bg hover **/
      border-radius: 0px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }

    .ant-menu-item.ant-menu-item-active > * {
      color: #011D2E !important;
    }

    > * {
      padding-left: 46px !important;
      margin: 0px;
      height: 48px;
      width: 85%;
    }
  }
`