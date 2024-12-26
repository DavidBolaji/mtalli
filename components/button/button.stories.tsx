import { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "./button";
import { ArrowUpRightIcon } from "@/constants/icons/arrow-up-right";
import { fn } from '@storybook/test';


const meta: Meta<ButtonProps> = {
  title: "Button",
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    size: {
      options: ["lg", "sm"],
      control: {
        type: "select",
      },
    },
    color: {
      options: ["light", "dark"],
      control: {
        type: "select",
      },
    },
   
    iconL: {
      control: {
        type: "select", 
        options: [ArrowUpRightIcon],
        mapping: {
          ArrowUpRightIcon: ArrowUpRightIcon, // Add mapping to use the actual icon component
        },
      },
    },
    iconR: {
      control: {
        type: "select", 
        options: [ArrowUpRightIcon],
        mapping: {
          ArrowUpRightIcon: ArrowUpRightIcon, // Add mapping to use the actual icon component
        },
      },
    },
  },
  args: {
    // size: "sm",
    // color: "dark",
    // iconL: ArrowUpRightIcon, // Default icon set for the story
    // iconR: ShoppingCartIcon, // Default icon set for the story
    // children: "Create An account",
    onClick: fn(),
    className: ""
  },
  
};

export default meta;

type Story = StoryObj<ButtonProps>;
export const Light: Story = {
  args: {
    color: "light",
    children: "Button",
  },
};

export const Dark: Story = {
  args: {
    children: "Button",
  },
};

export const Large: Story = {
  args: {
    children: "Button",
  },
};
