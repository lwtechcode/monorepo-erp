var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// ../tsup/inject.js
import * as React from "react";

// src/components/Anchor/index.tsx
import { Anchor as AnchorBase } from "antd";
import { jsx } from "react/jsx-runtime";
function Anchor(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx(AnchorBase, __spreadValues({}, props));
}

// src/components/App/index.tsx
import { App } from "antd";
import { jsx as jsx2 } from "react/jsx-runtime";
function AppComponent(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx2(App, __spreadProps(__spreadValues({}, props), { children }));
}
function useApp() {
  const methods = App.useApp();
  return __spreadValues({}, methods);
}

// src/components/Autocomplete/index.tsx
import { AutoComplete as AutoCompleteBase } from "antd";
import { jsx as jsx3 } from "react/jsx-runtime";
function AutoComplete(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx3(AutoCompleteBase, __spreadValues({}, props));
}

// src/components/Avatar/index.tsx
import { Avatar as AvatarBase } from "antd";
import { jsx as jsx4 } from "react/jsx-runtime";
function Avatar(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx4(AvatarBase, __spreadValues({}, props));
}

// src/components/Button/index.tsx
import { Button as ButtonBase } from "antd";
import { jsx as jsx5 } from "react/jsx-runtime";
function Button(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx5(ButtonBase, __spreadProps(__spreadValues({}, props), { children }));
}

// src/components/Card/index.tsx
import { Card as CardBase } from "antd";
import { jsx as jsx6 } from "react/jsx-runtime";
function Card(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx6(CardBase, __spreadProps(__spreadValues({}, props), { children }));
}

// src/components/Checkbox/index.tsx
import { Checkbox as CheckboxBase } from "antd";
import { jsx as jsx7 } from "react/jsx-runtime";
function Checkbox(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx7(CheckboxBase, __spreadValues({}, props));
}

// src/components/ConfigProvider/index.tsx
import { ConfigProvider as ConfigProviderBase } from "antd";
import { jsx as jsx8 } from "react/jsx-runtime";
function ConfigProvider(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx8(ConfigProviderBase, __spreadProps(__spreadValues({}, props), { children }));
}

// src/components/Dropdown/index.tsx
import { Dropdown as DropdownBase } from "antd";
import { jsx as jsx9 } from "react/jsx-runtime";
function Dropdown(_a) {
  var _b = _a, {
    children,
    placement = "bottom"
  } = _b, props = __objRest(_b, [
    "children",
    "placement"
  ]);
  return /* @__PURE__ */ jsx9(DropdownBase, __spreadProps(__spreadValues({ placement }, props), { children }));
}

// src/components/EmptyData/index.tsx
import { Empty, Typography } from "antd";
import { jsx as jsx10 } from "react/jsx-runtime";
function EmptyData({ children }) {
  return /* @__PURE__ */ jsx10(
    Empty,
    {
      image: "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg",
      imageStyle: { height: 60 },
      description: /* @__PURE__ */ jsx10(Typography.Text, { type: "secondary", children: "Nenhum dado foi encontrado!" }),
      className: "flex flex-col items-center justify-center",
      children
    }
  );
}

// src/components/Flex/index.tsx
import { Flex as FlexBase } from "antd";
import { jsx as jsx11 } from "react/jsx-runtime";
function Flex(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx11(FlexBase, __spreadProps(__spreadValues({}, props), { children }));
}

// src/components/Grid/index.tsx
import { Col, Grid as GridBase, Row } from "antd";
import { jsx as jsx12 } from "react/jsx-runtime";
function SlotRow(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx12(Row, __spreadValues({}, props));
}
function SlotCol(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx12(Col, __spreadValues({}, props));
}
var Grid = {
  Row: SlotRow,
  Col: SlotCol,
  Root: GridBase
};

// src/components/Icon/index.tsx
import IconBase, * as Icons from "@ant-design/icons";
import { jsx as jsx13 } from "react/jsx-runtime";
function Icon({ component, className, onClick, style }) {
  const ElementIcon = Icons[component];
  return /* @__PURE__ */ jsx13(
    IconBase,
    {
      component: ElementIcon,
      className,
      onClick,
      style
    }
  );
}

// src/components/Input/index.tsx
import { Input as InputBase } from "antd";
import { jsx as jsx14 } from "react/jsx-runtime";
function Input(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx14(InputBase, __spreadValues({}, props));
}
Input.Search = InputBase.Search;
Input.Password = InputBase.Password;
Input.TextArea = InputBase.TextArea;
Input.Group = InputBase.Group;
Input.OTP = InputBase.OTP;

// src/components/Layout/index.tsx
import { Layout as LayoutBase } from "antd";
import { jsx as jsx15 } from "react/jsx-runtime";
function Layout(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx15(LayoutBase, __spreadProps(__spreadValues({}, props), { children }));
}
Layout.Content = LayoutBase.Content;
Layout.Footer = LayoutBase.Footer;
Layout.Header = LayoutBase.Header;
Layout.Sider = LayoutBase.Sider;

// src/components/Link/index.tsx
import { Button as ButtonBase2 } from "antd";
import { jsx as jsx16 } from "react/jsx-runtime";
function Link(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx16(ButtonBase2, __spreadProps(__spreadValues({ type: "link" }, props), { children }));
}

// src/components/List/index.tsx
import { List as ListBase } from "antd";
import { jsx as jsx17 } from "react/jsx-runtime";
function List(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx17(ListBase, __spreadValues({}, props));
}
List.Item = ListBase.Item;

// src/components/Loading/index.tsx
import { Spin } from "antd";
import { jsx as jsx18 } from "react/jsx-runtime";
function Loading() {
  return /* @__PURE__ */ jsx18(
    Spin,
    {
      indicator: /* @__PURE__ */ jsx18(Icon, { component: "LoadingOutlined", className: "text-6xl" })
    }
  );
}

// src/components/Menu/index.tsx
import { Menu as MenuBase } from "antd";
import { jsx as jsx19 } from "react/jsx-runtime";
function Menu(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx19(MenuBase, __spreadValues({}, props));
}

// src/components/Modal/index.tsx
import { Modal as ModalBase } from "antd";
import { jsx as jsx20 } from "react/jsx-runtime";
function Modal(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx20(ModalBase, __spreadProps(__spreadValues({ centered: true }, props), { children }));
}

// src/components/Select/index.tsx
import { Select as SelectBase } from "antd";
import { jsx as jsx21 } from "react/jsx-runtime";
function Select(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx21(SelectBase, __spreadValues({}, props));
}

// src/components/Skeleton/index.tsx
import { Skeleton as SkeletonBase } from "antd";
import { jsx as jsx22 } from "react/jsx-runtime";
function Skeleton(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx22(SkeletonBase, __spreadValues({}, props));
}
Skeleton.Avatar = SkeletonBase.Avatar;
Skeleton.Button = SkeletonBase.Button;
Skeleton.Image = SkeletonBase.Image;
Skeleton.Input = SkeletonBase.Input;
Skeleton.Node = SkeletonBase.Node;

// src/components/Space/index.tsx
import { Space as SpaceBase } from "antd";
import { jsx as jsx23 } from "react/jsx-runtime";
function Space(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx23(SpaceBase, __spreadProps(__spreadValues({}, props), { children }));
}

// src/components/Statistic/index.tsx
import { Statistic as StatisticBase } from "antd";
import { jsx as jsx24 } from "react/jsx-runtime";
function Statistic(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx24(StatisticBase, __spreadValues({}, props));
}
Statistic.Countdown = StatisticBase.Countdown;

// src/components/Table/index.tsx
import { Table as TableBase } from "antd";
import { jsx as jsx25 } from "react/jsx-runtime";
function Table(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx25(TableBase, __spreadValues({}, props));
}
Table.Column = TableBase.Column;
Table.ColumnGroup = TableBase.ColumnGroup;
Table.EXPAND_COLUMN = TableBase.EXPAND_COLUMN;
Table.SELECTION_NONE = TableBase.SELECTION_NONE;
Table.SELECTION_ALL = TableBase.SELECTION_ALL;

// src/components/Tabs/index.tsx
import { Tabs as TabsBase } from "antd";
import { jsx as jsx26 } from "react/jsx-runtime";
function Tabs(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx26(TabsBase, __spreadValues({}, props));
}

// src/components/Typography/index.tsx
import { Typography as TypographyBase } from "antd";
import { jsx as jsx27 } from "react/jsx-runtime";
function SlotLink(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  const { Link: Link2 } = TypographyBase;
  return /* @__PURE__ */ jsx27(Link2, __spreadProps(__spreadValues({}, props), { children }));
}
function SlotParagraph(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  const { Paragraph } = TypographyBase;
  return /* @__PURE__ */ jsx27(Paragraph, __spreadProps(__spreadValues({}, props), { children }));
}
function SlotText(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  const { Text } = TypographyBase;
  return /* @__PURE__ */ jsx27(Text, __spreadProps(__spreadValues({}, props), { children }));
}
function SlotTitle(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  const { Title } = TypographyBase;
  return /* @__PURE__ */ jsx27(Title, __spreadProps(__spreadValues({}, props), { children }));
}
var Typography2 = {
  Link: SlotLink,
  Paragraph: SlotParagraph,
  Text: SlotText,
  Title: SlotTitle
};
export {
  Anchor,
  AppComponent,
  AutoComplete,
  Avatar,
  Button,
  Card,
  Checkbox,
  ConfigProvider,
  Dropdown,
  EmptyData,
  Flex,
  Grid,
  Icon,
  Input,
  Layout,
  Link,
  List,
  Loading,
  Menu,
  Modal,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Typography2 as Typography,
  useApp
};
//# sourceMappingURL=index.mjs.map