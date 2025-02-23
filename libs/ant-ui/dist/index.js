"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Anchor: () => Anchor,
  AppComponent: () => AppComponent,
  AutoComplete: () => AutoComplete,
  Avatar: () => Avatar,
  Button: () => Button,
  Card: () => Card,
  Checkbox: () => Checkbox,
  ConfigProvider: () => ConfigProvider,
  Dropdown: () => Dropdown,
  EmptyData: () => EmptyData,
  Flex: () => Flex,
  Grid: () => Grid,
  Icon: () => Icon,
  Input: () => Input,
  Layout: () => Layout,
  Link: () => Link,
  List: () => List,
  Loading: () => Loading,
  Menu: () => Menu,
  Modal: () => Modal,
  Select: () => Select,
  Space: () => Space,
  Statistic: () => Statistic,
  Table: () => Table,
  Tabs: () => Tabs,
  Typography: () => Typography2,
  useApp: () => useApp
});
module.exports = __toCommonJS(src_exports);

// ../tsup/inject.js
var React = __toESM(require("react"));

// src/components/Anchor/index.tsx
var import_antd = require("antd");
var import_jsx_runtime = require("react/jsx-runtime");
function Anchor(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_antd.Anchor, __spreadValues({}, props));
}

// src/components/App/index.tsx
var import_antd2 = require("antd");
var import_jsx_runtime2 = require("react/jsx-runtime");
function AppComponent(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd2.App, __spreadProps(__spreadValues({}, props), { children }));
}
function useApp() {
  const methods = import_antd2.App.useApp();
  return __spreadValues({}, methods);
}

// src/components/Autocomplete/index.tsx
var import_antd3 = require("antd");
var import_jsx_runtime3 = require("react/jsx-runtime");
function AutoComplete(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_antd3.AutoComplete, __spreadValues({}, props));
}

// src/components/Avatar/index.tsx
var import_antd4 = require("antd");
var import_jsx_runtime4 = require("react/jsx-runtime");
function Avatar(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_antd4.Avatar, __spreadValues({}, props));
}

// src/components/Button/index.tsx
var import_antd5 = require("antd");
var import_jsx_runtime5 = require("react/jsx-runtime");
function Button(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_antd5.Button, __spreadProps(__spreadValues({}, props), { children }));
}

// src/components/Card/index.tsx
var import_antd6 = require("antd");
var import_jsx_runtime6 = require("react/jsx-runtime");
function Card(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_antd6.Card, __spreadProps(__spreadValues({}, props), { children }));
}

// src/components/Checkbox/index.tsx
var import_antd7 = require("antd");
var import_jsx_runtime7 = require("react/jsx-runtime");
function Checkbox(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_antd7.Checkbox, __spreadValues({}, props));
}

// src/components/ConfigProvider/index.tsx
var import_antd8 = require("antd");
var import_jsx_runtime8 = require("react/jsx-runtime");
function ConfigProvider(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_antd8.ConfigProvider, __spreadProps(__spreadValues({}, props), { children }));
}

// src/components/Dropdown/index.tsx
var import_antd9 = require("antd");
var import_jsx_runtime9 = require("react/jsx-runtime");
function Dropdown(_a) {
  var _b = _a, {
    children,
    placement = "bottom"
  } = _b, props = __objRest(_b, [
    "children",
    "placement"
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_antd9.Dropdown, __spreadProps(__spreadValues({ placement }, props), { children }));
}

// src/components/EmptyData/index.tsx
var import_antd10 = require("antd");
var import_jsx_runtime10 = require("react/jsx-runtime");
function EmptyData({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    import_antd10.Empty,
    {
      image: "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg",
      imageStyle: { height: 60 },
      description: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_antd10.Typography.Text, { type: "secondary", children: "Nenhum dado foi encontrado!" }),
      className: "flex flex-col items-center justify-center",
      children
    }
  );
}

// src/components/Flex/index.tsx
var import_antd11 = require("antd");
var import_jsx_runtime11 = require("react/jsx-runtime");
function Flex(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_antd11.Flex, __spreadProps(__spreadValues({}, props), { children }));
}

// src/components/Grid/index.tsx
var import_antd12 = require("antd");
var import_jsx_runtime12 = require("react/jsx-runtime");
function SlotRow(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_antd12.Row, __spreadValues({}, props));
}
function SlotCol(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_antd12.Col, __spreadValues({}, props));
}
var Grid = {
  Row: SlotRow,
  Col: SlotCol,
  Root: import_antd12.Grid
};

// src/components/Icon/index.tsx
var Icons = __toESM(require("@ant-design/icons"));
var import_jsx_runtime13 = require("react/jsx-runtime");
function Icon({ component, className, onClick, style }) {
  const ElementIcon = Icons[component];
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    Icons.default,
    {
      component: ElementIcon,
      className,
      onClick,
      style
    }
  );
}

// src/components/Input/index.tsx
var import_antd13 = require("antd");
var import_jsx_runtime14 = require("react/jsx-runtime");
function Input(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_antd13.Input, __spreadValues({}, props));
}
Input.Search = import_antd13.Input.Search;
Input.Password = import_antd13.Input.Password;
Input.TextArea = import_antd13.Input.TextArea;
Input.Group = import_antd13.Input.Group;
Input.OTP = import_antd13.Input.OTP;

// src/components/Layout/index.tsx
var import_antd14 = require("antd");
var import_jsx_runtime15 = require("react/jsx-runtime");
function Layout(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_antd14.Layout, __spreadProps(__spreadValues({}, props), { children }));
}
Layout.Content = import_antd14.Layout.Content;
Layout.Footer = import_antd14.Layout.Footer;
Layout.Header = import_antd14.Layout.Header;
Layout.Sider = import_antd14.Layout.Sider;

// src/components/Link/index.tsx
var import_antd15 = require("antd");
var import_jsx_runtime16 = require("react/jsx-runtime");
function Link(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_antd15.Button, __spreadProps(__spreadValues({ type: "link" }, props), { children }));
}

// src/components/List/index.tsx
var import_antd16 = require("antd");
var import_jsx_runtime17 = require("react/jsx-runtime");
function List(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_antd16.List, __spreadValues({}, props));
}
List.Item = import_antd16.List.Item;

// src/components/Loading/index.tsx
var import_antd17 = require("antd");
var import_jsx_runtime18 = require("react/jsx-runtime");
function Loading() {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    import_antd17.Spin,
    {
      indicator: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Icon, { component: "LoadingOutlined", className: "text-6xl" })
    }
  );
}

// src/components/Menu/index.tsx
var import_antd18 = require("antd");
var import_jsx_runtime19 = require("react/jsx-runtime");
function Menu(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_antd18.Menu, __spreadValues({}, props));
}

// src/components/Modal/index.tsx
var import_antd19 = require("antd");
var import_jsx_runtime20 = require("react/jsx-runtime");
function Modal(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_antd19.Modal, __spreadProps(__spreadValues({ centered: true }, props), { children }));
}

// src/components/Select/index.tsx
var import_antd20 = require("antd");
var import_jsx_runtime21 = require("react/jsx-runtime");
function Select(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_antd20.Select, __spreadValues({}, props));
}

// src/components/Skeleton/index.tsx
var import_antd21 = require("antd");
var import_jsx_runtime22 = require("react/jsx-runtime");
function Skeleton(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_antd21.Skeleton, __spreadValues({}, props));
}
Skeleton.Avatar = import_antd21.Skeleton.Avatar;
Skeleton.Button = import_antd21.Skeleton.Button;
Skeleton.Image = import_antd21.Skeleton.Image;
Skeleton.Input = import_antd21.Skeleton.Input;
Skeleton.Node = import_antd21.Skeleton.Node;

// src/components/Space/index.tsx
var import_antd22 = require("antd");
var import_jsx_runtime23 = require("react/jsx-runtime");
function Space(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_antd22.Space, __spreadProps(__spreadValues({}, props), { children }));
}

// src/components/Statistic/index.tsx
var import_antd23 = require("antd");
var import_jsx_runtime24 = require("react/jsx-runtime");
function Statistic(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_antd23.Statistic, __spreadValues({}, props));
}
Statistic.Countdown = import_antd23.Statistic.Countdown;

// src/components/Table/index.tsx
var import_antd24 = require("antd");
var import_jsx_runtime25 = require("react/jsx-runtime");
function Table(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_antd24.Table, __spreadValues({}, props));
}
Table.Column = import_antd24.Table.Column;
Table.ColumnGroup = import_antd24.Table.ColumnGroup;
Table.EXPAND_COLUMN = import_antd24.Table.EXPAND_COLUMN;
Table.SELECTION_NONE = import_antd24.Table.SELECTION_NONE;
Table.SELECTION_ALL = import_antd24.Table.SELECTION_ALL;

// src/components/Tabs/index.tsx
var import_antd25 = require("antd");
var import_jsx_runtime26 = require("react/jsx-runtime");
function Tabs(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_antd25.Tabs, __spreadValues({}, props));
}

// src/components/Typography/index.tsx
var import_antd26 = require("antd");
var import_jsx_runtime27 = require("react/jsx-runtime");
function SlotLink(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  const { Link: Link2 } = import_antd26.Typography;
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Link2, __spreadProps(__spreadValues({}, props), { children }));
}
function SlotParagraph(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  const { Paragraph } = import_antd26.Typography;
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Paragraph, __spreadProps(__spreadValues({}, props), { children }));
}
function SlotText(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  const { Text } = import_antd26.Typography;
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Text, __spreadProps(__spreadValues({}, props), { children }));
}
function SlotTitle(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  const { Title } = import_antd26.Typography;
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Title, __spreadProps(__spreadValues({}, props), { children }));
}
var Typography2 = {
  Link: SlotLink,
  Paragraph: SlotParagraph,
  Text: SlotText,
  Title: SlotTitle
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
  Typography,
  useApp
});
//# sourceMappingURL=index.js.map