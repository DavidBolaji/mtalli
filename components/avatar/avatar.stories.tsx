import { Meta, StoryObj } from "@storybook/react";
import { AvatarProps } from "./avatar";
import { Avatar as AvatarComponent } from "@/components/avatar/avatar";

const meta: Meta<AvatarProps> = {
  title: "Avatar",
  component: AvatarComponent,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["sm", "lg"],
      control: {
        type: "select",
      },
    },
    src: {
      control: {
        type: "text",
      },
    },
    alt: {
      control: {
        type: "text",
      },
    },
    className: {
      control: {
        type: "text",
      },
    },
  },
  args: {},
};

export default meta;

type Story = StoryObj<AvatarProps>;
export const AvatarWithSrc: Story = {
  args: {
    size: "lg",
    src: "https://avatar.iran.liara.run/public/30",
    alt: "users avatar",
  },
};
export const AvatarWithoutSrc: Story = {
  args: {
    size: "lg",
  },
};
