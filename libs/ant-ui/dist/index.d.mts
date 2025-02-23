import * as react_jsx_runtime from 'react/jsx-runtime';
import * as antd from 'antd';
import { AnchorProps as AnchorProps$1, AppProps as AppProps$1, AutoCompleteProps, AvatarProps as AvatarProps$1, ButtonProps as ButtonProps$1, CardProps as CardProps$1, CheckboxProps as CheckboxProps$1, ConfigProviderProps as ConfigProviderProps$1, DropdownProps, EmptyProps, FlexProps as FlexProps$1, RowProps, ColProps, InputProps as InputProps$1, LayoutProps as LayoutProps$1, ListProps as ListProps$1, MenuProps as MenuProps$1, ModalProps, SelectProps as SelectProps$1, SpaceProps as SpaceProps$1, StatisticProps, TableProps as TableProps$1, TablePaginationConfig, GetProp, TabsProps } from 'antd';
import * as antd_es_modal_useModal from 'antd/es/modal/useModal';
import * as antd_es_notification_interface from 'antd/es/notification/interface';
import * as antd_es_message_interface from 'antd/es/message/interface';
import * as Icons from '@ant-design/icons';
import * as react from 'react';
import { CSSProperties } from 'react';
import * as antd_es_input_OTP from 'antd/es/input/OTP';
import * as antd_es_input_TextArea from 'antd/es/input/TextArea';
import * as antd_es_input from 'antd/es/input';
import * as antd_es_list_Item from 'antd/es/list/Item';
import * as antd_es_table_ColumnGroup from 'antd/es/table/ColumnGroup';
import * as antd_es__util_type from 'antd/es/_util/type';
import { SorterResult } from 'antd/es/table/interface';
import { LinkProps as LinkProps$1 } from 'antd/es/typography/Link';
import { ParagraphProps } from 'antd/es/typography/Paragraph';
import { TextProps } from 'antd/es/typography/Text';
import { TitleProps } from 'antd/es/typography/Title';

declare type AnchorProps = AnchorProps$1;

declare function Anchor({ ...props }: AnchorProps): react_jsx_runtime.JSX.Element;

declare type AppProps = AppProps$1;

declare function AppComponent({ children, ...props }: AppProps): react_jsx_runtime.JSX.Element;
declare function useApp(): {
    message: antd_es_message_interface.MessageInstance;
    notification: antd_es_notification_interface.NotificationInstance;
    modal: antd_es_modal_useModal.HookAPI;
};

declare function AutoComplete({ ...props }: AutoCompleteProps): react_jsx_runtime.JSX.Element;

declare type AvatarProps = AvatarProps$1;

declare function Avatar({ ...props }: AvatarProps): react_jsx_runtime.JSX.Element;

declare type ButtonProps = ButtonProps$1;

declare function Button({ children, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

declare type CardProps = CardProps$1;

declare function Card({ children, ...props }: CardProps): react_jsx_runtime.JSX.Element;

declare type CheckboxProps = CheckboxProps$1;

declare function Checkbox({ ...props }: CheckboxProps): react_jsx_runtime.JSX.Element;

declare type ConfigProviderProps = ConfigProviderProps$1;

declare function ConfigProvider({ children, ...props }: ConfigProviderProps): react_jsx_runtime.JSX.Element;

declare function Dropdown({ children, placement, ...props }: DropdownProps): react_jsx_runtime.JSX.Element;

declare type EmptyDataProps = EmptyProps;

declare function EmptyData({ children }: EmptyDataProps): react_jsx_runtime.JSX.Element;

declare type FlexProps = FlexProps$1;

declare function Flex({ children, ...props }: FlexProps): react_jsx_runtime.JSX.Element;

declare function SlotRow({ ...props }: RowProps): react_jsx_runtime.JSX.Element;
declare function SlotCol({ ...props }: ColProps): react_jsx_runtime.JSX.Element;
declare const Grid: {
    Row: typeof SlotRow;
    Col: typeof SlotCol;
    Root: {
        useBreakpoint: () => Partial<Record<antd.Breakpoint, boolean>>;
    };
};

declare type IconProps = {
    component: keyof typeof Icons;
    color?: string;
    className?: string;
    onClick?: () => void;
    style?: CSSProperties;
};

declare function Icon({ component, className, onClick, style }: IconProps): react_jsx_runtime.JSX.Element;

declare type InputProps = InputProps$1;

declare function Input({ ...props }: InputProps): react_jsx_runtime.JSX.Element;
declare namespace Input {
    var Search: react.ForwardRefExoticComponent<antd_es_input.SearchProps & react.RefAttributes<antd.InputRef>>;
    var Password: react.ForwardRefExoticComponent<antd_es_input.PasswordProps & react.RefAttributes<antd.InputRef>>;
    var TextArea: react.ForwardRefExoticComponent<antd_es_input.TextAreaProps & react.RefAttributes<antd_es_input_TextArea.TextAreaRef>>;
    var Group: react.FC<antd_es_input.GroupProps>;
    var OTP: react.ForwardRefExoticComponent<antd_es_input_OTP.OTPProps & react.RefAttributes<antd_es_input_OTP.OTPRef>>;
}

declare type LayoutProps = LayoutProps$1;

declare function Layout({ children, ...props }: LayoutProps): react_jsx_runtime.JSX.Element;
declare namespace Layout {
    var Content: react.ForwardRefExoticComponent<antd.LayoutProps & react.RefAttributes<HTMLElement>>;
    var Footer: react.ForwardRefExoticComponent<antd.LayoutProps & react.RefAttributes<HTMLElement>>;
    var Header: react.ForwardRefExoticComponent<antd.LayoutProps & react.RefAttributes<HTMLElement>>;
    var Sider: react.ForwardRefExoticComponent<antd.SiderProps & react.RefAttributes<HTMLDivElement>>;
}

declare type LinkProps = Omit<ButtonProps$1, 'type'>;

declare function Link({ children, ...props }: LinkProps): react_jsx_runtime.JSX.Element;

declare type ListProps<T> = ListProps$1<T>;

declare function List<T>({ ...props }: ListProps<T>): react_jsx_runtime.JSX.Element;
declare namespace List {
    var Item: antd_es_list_Item.ListItemTypeProps;
}

declare function Loading(): react_jsx_runtime.JSX.Element;

declare type MenuProps = MenuProps$1;

declare function Menu({ ...props }: MenuProps$1): react_jsx_runtime.JSX.Element;

declare function Modal({ children, ...props }: ModalProps): react_jsx_runtime.JSX.Element;

declare type SelectProps = SelectProps$1;

declare function Select({ ...props }: SelectProps): react_jsx_runtime.JSX.Element;

declare type SpaceProps = SpaceProps$1;

declare function Space({ children, ...props }: SpaceProps): react_jsx_runtime.JSX.Element;

declare function Statistic({ ...props }: StatisticProps): react_jsx_runtime.JSX.Element;
declare namespace Statistic {
    var Countdown: react.NamedExoticComponent<antd.CountdownProps>;
}

declare type TableProps<T> = TableProps$1<T>;
declare type TableParams<T> = {
    pagination?: TablePaginationConfig;
    sortField?: SorterResult<any>['field'];
    sortOrder?: SorterResult<any>['order'];
    filters?: Parameters<GetProp<TableProps<T>, 'onChange'>>[1];
};

declare function Table<T>({ ...props }: TableProps<T>): react_jsx_runtime.JSX.Element;
declare namespace Table {
    var Column: <RecordType extends antd_es__util_type.AnyObject>(_: antd.TableColumnProps<RecordType>) => null;
    var ColumnGroup: <RecordType extends antd_es__util_type.AnyObject>(_: antd_es_table_ColumnGroup.ColumnGroupProps<RecordType>) => null;
    var EXPAND_COLUMN: {};
    var SELECTION_NONE: "SELECT_NONE";
    var SELECTION_ALL: "SELECT_ALL";
}

declare function Tabs({ ...props }: TabsProps): react_jsx_runtime.JSX.Element;

declare function SlotLink({ children, ...props }: LinkProps$1): react_jsx_runtime.JSX.Element;
declare function SlotParagraph({ children, ...props }: ParagraphProps): react_jsx_runtime.JSX.Element;
declare function SlotText({ children, ...props }: TextProps): react_jsx_runtime.JSX.Element;
declare function SlotTitle({ children, ...props }: TitleProps): react_jsx_runtime.JSX.Element;
declare const Typography: {
    Link: typeof SlotLink;
    Paragraph: typeof SlotParagraph;
    Text: typeof SlotText;
    Title: typeof SlotTitle;
};

export { Anchor, AppComponent, AutoComplete, Avatar, Button, Card, Checkbox, ConfigProvider, Dropdown, EmptyData, Flex, Grid, Icon, Input, Layout, Link, List, Loading, Menu, type MenuProps, Modal, Select, Space, Statistic, Table, type TableParams, type TableProps, Tabs, Typography, useApp };
