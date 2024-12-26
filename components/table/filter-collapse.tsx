"use client";
import { Collapse } from "antd";
import styled from "@emotion/styled";
import { ICollapseData } from "@/utils/data";

const StyledCollapse = styled.div`
  background-color: #fff !important;
  padding: 0px;

  .ant-collapse {
    background-color: #fff;
  }

  .ant-collapse-content.ant-collapse-content-active {
    border-left: 1px solid #ddeee5 !important;;
    border-right: 1px solid #ddeee5 !important;;
    border-bottom: 1px solid #ddeee5 !important;;
    border-top: 0px solid black;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .ant-collapse-item {
    margin-bottom: 24px;
    border-radius: 20px;
    border: none;
  }

  .ant-collapse-item.ant-collapse-item-active {
    .ant-collapse-header {
      border: 1px solid #ddeee5 !important;
      background-color: #f5f6f8 !important;
      border-bottom-left-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
    }
  }

  .ant-collapse-header {
    border: 1px solid #ddeee5 !important;
    background-color: #f5f6f8 !important;
    border-radius: 16px !important;
    .ant-collapse-header-text {
      color: #23342a;
      font-weight: 900;
      font-size: 14px;
      line-height: 22px;
      font-family: "Satoshi-Variable";
    }
  }

  .ant-collapse-content-box > p {
    font-size: 16px;
    font-weight: 500;
    color: #23342a;
    line-height: 24px;
    font-family: "Satoshi-Variable";
  }

  .ant-collapse-content-box {
    background-color: #ffffff !important;
    padding: 0px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  @media (max-width: 500px) {
    * > .ant-collapse-header-text {
      font-size: medium;
    }
    * > .ant-collapse-content-box > p {
      transform: translateX(-5px);
    }
  }
`;

const FilterCollapse: React.FC<{ data: ICollapseData[] }> = ({ data }) => {
  return (
    <StyledCollapse>
      <Collapse
        defaultActiveKey={["1"]}
        bordered={false}
        expandIconPosition={"end"}
        size="large"
        items={data}
      />
    </StyledCollapse>
  );
};

export { FilterCollapse };
