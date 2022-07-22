export enum FontSlant {
  Normal = 'Normal',
  Italic = 'Italic',
  Oblique = 'Oblique',
}

export enum FontWeight {
  Thin = 'Thin',
  ExtraLight = 'ExtraLight',
  Light = 'Light',
  Normal = 'Normal',
  Medium = 'Medium',
  SemiBold = 'SemiBold',
  Bold = 'Bold',
  ExtraBold = 'ExtraBold',
  Black = 'Black',
  ExtraBlack = 'ExtraBlack',
}

export enum FontWidth {
  UltraCondensed = 'UltraCondensed',
  ExtraCondensed = 'ExtraCondensed ',
  Condensed = 'Condensed ',
  SemiCondensed = 'SemiCondensed ',
  Normal = 'Normal ',
  SemiExpanded = 'SemiExpanded',
  Expanded = 'Expanded',
  ExtraExpanded = 'ExtraExpanded',
  UltraExpanded = 'UltraExpanded',
}

export enum BlendMode {
  // ------------
  Normal,
  // ------------
  Darken,
  Multiply,
  ColorBurn,
  // ------------
  Lighten,
  Screen,
  ColorDodge,
  // ------------
  Overlay,
  SoftLight,
  HardLight,
  // ------------
  Difference,
  Exclusion,
  // ------------
  Hue,
  Saturation,
  Color,
  Luminosity,
  // ------------
  PlusDarker,
  PlusLighter,
}

export enum HorizontalAlign {
  Auto = 'auto',
  Left = 'left',
  Right = 'right',
  LeftAndRight = 'left&right',
}

export enum VerticalAlign {
  Auto = 'auto',
  Top = 'top',
  Bottom = 'bottom',
  TopAndBottom = 'top&bottom',
}

export enum BlurType {
  Gaussian,
  Motion,
  Zoom,
  Background,
}

export enum GradientType {
  Linear,
  Radial,
  Angular,
}

export enum FillType {
  SolidColor = 0,
  Gradient = 1,
  PatternFill = 4,
}

export enum PatternFillType {
  Tile,
  Fill,
  Stretch,
  Fit,
}

export enum BorderPosition {
  Center,
  Inside,
  Outside,
}

export enum Arrowhead {
  None,
  LineArrow,
  TriangleArrow,
  LineSegment,
  CircleStroke,
  CircleFill,
  RectStroke,
  RectFill,
}

export enum LineEnd {
  Butt,
  Round,
  Square,
}

export enum LineJoin {
  Miter,
  Round,
  Bevel,
}

export enum PointType {
  Undefined = 0, // 未定义
  Straight = 1, // 笔直
  Mirrored = 2, // 对称
  Asymmetric = 3, // 不对称
  Disconnected = 4, // 分离
}

export enum Alignment {
  Left,
  Right,
  Center,
  Justify,
}

export enum VerticalAlignment {
  Top,
  Middle,
  Bottom,
}

export enum TextTransform {
  Normal,
  LowerCase,
  UpCase,
}

export enum DecorationStyle {
  None,
  Underline,
}

export enum Decoration {
  None = 0,
  Underline = 1 << 0,
  Upperline = 1 << 1,
  StrikeThrough = 1 << 2,
}

export enum StrikeThroughStyle {
  None,
  StrikeThrough,
}

export enum TextBehaviour {
  Width,
  Height,
  Both,
}

export enum SmartLayout {
  LeftToRight,
  HorizontallyCenter,
  RightToLeft,
  TopToBottom,
  VerticallyCenter,
  BottomToTop,
}

export enum ColorSpace {
  // default
  SRGB = 'sRGB',
  DISPLAY_P3 = 'displayP3',
  ADOBE_RGB = 'AdobeRGB',
}

export enum AnimationType {
  None = -1,
  SlideFromLeft = 2,
  SlideFromRight = 0,
  SlideFromBottom = 1,
  SlideFromTop = 3,
}

// ==========资源库=================
export enum ResourceType {
  Color = 'Color',
  LayerStyle = 'LayerStyle',
  TextStyle = 'TextStyle',
  Symbol = 'Symbol',
}

export type ImageType = 'png' | 'jpg' | 'jpeg' | 'gif' | 'webp' | 'svg';
