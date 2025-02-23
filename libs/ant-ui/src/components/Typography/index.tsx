import { Typography as TypographyBase } from 'antd';
import { LinkProps } from 'antd/es/typography/Link';
import { ParagraphProps } from 'antd/es/typography/Paragraph';
import { TextProps } from 'antd/es/typography/Text';
import { TitleProps } from 'antd/es/typography/Title';

function SlotLink({ children, ...props }: LinkProps) {
  const { Link } = TypographyBase;

  return <Link {...props}>{children}</Link>;
}

function SlotParagraph({ children, ...props }: ParagraphProps) {
  const { Paragraph } = TypographyBase;

  return <Paragraph {...props}>{children}</Paragraph>;
}

function SlotText({ children, ...props }: TextProps) {
  const { Text } = TypographyBase;

  return <Text {...props}>{children}</Text>;
}

function SlotTitle({ children, ...props }: TitleProps) {
  const { Title } = TypographyBase;

  return <Title {...props}>{children}</Title>;
}

export const Typography = {
  Link: SlotLink,
  Paragraph: SlotParagraph,
  Text: SlotText,
  Title: SlotTitle,
};
