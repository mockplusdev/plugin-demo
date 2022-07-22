/* eslint-disable */
import {
  Alignment,
  AnimationType,
  Arrowhead,
  BlendMode,
  BlurType,
  BorderPosition,
  ColorSpace,
  DecorationStyle,
  FillType,
  FontSlant,
  FontWeight,
  FontWidth,
  GradientType,
  HorizontalAlign,
  LineEnd,
  LineJoin,
  PatternFillType,
  PointType,
  ResourceType,
  SmartLayout,
  StrikeThroughStyle,
  TextBehaviour,
  TextTransform,
  VerticalAlign,
  VerticalAlignment,
  ImageType,
} from './mockplus.types';

declare global {
  const __html__: string;
  const __uiFiles__: {
    [key: string]: string;
  };

  const console: Console;
  const mockplus: PluginAPI;

  interface PluginAPI {
    readonly apiVersion: string;
    readonly editorType: 'DT';

    colorSpace: ColorSpace;
    currentPage: Page;
    readonly root: Document;

    readonly ui: UIAPI;
    readonly currentUser: User;
    readonly clientStorage: ClientStorageAPI;

    findLayerById(id: string): Layer | null;
    findPageById(id: string): Page | null;

    showUI(html: string, options?: ShowUIOptions): void;
    notify(message: string, options?: { timeout: number; error: boolean }): void;
    closePlugin(message?: string): void;

    on(type: EventType, callback: (event?: any) => void): void;
    once(type: EventType, callback: (event?: any) => void): void;
    off(type: EventType, callback: (event?: any) => void): void;

    createPage(): Page;
    createSymbolPage(): Page;
    createRectangle(): Path;
    createTriangle(): Path;
    createEllipse(): Path;
    createPolygon(): Path;
    createStar(): Path;
    createLine(): Path;
    createText(): Text;
    createSlice(): Slice;
    createHotspot(): Hotspot;
    createArtboard(): Artboard;
    createImage(): Image;

    createSymbolMaster(layers: Layer[], parent?: Page): SymbolMaster;
    createSymbolInstance(master: SymbolMaster | SharedSymbolStyle): SymbolInstance;

    group(layers: Layer[], parent?: Group | Frame | Page, index?: number): Group | null;
    flatten(layers: ShapeGroup): Path | null; // 将shapeGroup转换为path
    outline(layers: (Path | ShapeGroup)[]): (Path | ShapeGroup)[]; // 将路径轮廓化

    union(layers: (Path | ShapeGroup)[], parent?: Group | Frame | Page, index?: number): ShapeGroup | null;
    exclude(layers: (Path | ShapeGroup)[], parent?: Group | Frame | Page, index?: number): ShapeGroup | null;
    intersect(layers: (Path | ShapeGroup)[], parent?: Group | Frame | Page, index?: number): ShapeGroup | null;
    subtract(layers: (Path | ShapeGroup)[], parent?: Group | Frame | Page, index?: number): ShapeGroup | null;

    commitUndo(): void;
    triggerUndo(): void;
    triggerRedo(): void;

    createNodeFromSvg(svg: string): Promise<Layer[]>;
    getSVGString(layer: Layer): string;

    /**
     * 创建一个图片数据资源。
     *
     * const data = new Uint8Array([]);
     *
     * mockplus.createImageData(data)
     *  .then(imageData=> {
     *      const imageLayer = mockplus.createImage();
     *      imageLayer.image = imageData.hash;
     *  });
     *
     */
    createImageData(data: Uint8Array, type: ImageType): Promise<ImageData>;
    getImageDataByHash(hash: string): ImageData;

    listAvailableFonts(): FontFamily[];
    loadFontAsync(postscript: string): Promise<void>;
    checkFontMissing(postscript: string): boolean;
    checkFontLoaded(postscript: string): boolean;

    createColorStyle(color: Color): SharedColorStyle | null;
    createTextStyle(layer: Text): SharedTextStyle | null;
    createLayerStyle(layer: Path | ShapeGroup | Image): SharedLayerStyle | null;

    findResourceById(resID: string): SharedColorStyle | SharedLayerStyle | SharedTextStyle | SharedSymbolStyle | null;

    readonly libraries: ReadonlyArray<Library>;
  }

  interface UIAPI {
    show(): void;
    hide(): void;
    close(): void;
    resize(width: number, height: number): void;

    onmessage(message: any): void;
    postMessage(pluginMessage: any, options?: UIPostMessageOptions);

    on(type: 'message', callback: MessageEventHandler): void;
    off(type: 'message', callback: MessageEventHandler): void;
    once(type: 'message', callback: MessageEventHandler): void;
  }

  interface ClientStorageAPI {
    getAsync(key: string): Promise<any | undefined>;
    setAsync(key: string, value: any): Promise<void>;
  }

  interface Document {
    readonly appID: string;
    readonly pages: ReadonlyArray<Page>;
    readonly type: 'document';

    appendChild(child: Page): void;
    insertChild(index: number, child: Page): void;
    findChild(callback: (layer: Page) => boolean): Page | null;
    findChildren(callback?: (layer: Page) => boolean): Page[];
    findOne(callback: (layer: Page | Layer) => boolean): Page | Layer | null;
    findAll(callback?: (layer: Page | Layer) => boolean): Page[] | Layer[];

    readonly colors: ReadonlyArray<SharedColorStyle>;
    readonly textStyles: ReadonlyArray<SharedTextStyle>;
    readonly layerStyles: ReadonlyArray<SharedLayerStyle>;

    getSymbols(): SymbolMaster[];
    getSymbolMasterWithID(symbolID: string): SymbolMaster | null;

    sharedLibrary(): Promise<void>;
    cancelSharedLibrary(): Promise<void>;

    getPluginData(key: string): string | undefined;
    setPluginData(key: string, value: string): void;
    getPluginDataKeys(): string[];
  }

  interface Page {
    readonly id: string;
    readonly type: 'page';
    readonly isSymbolPage: boolean;
    name: string;
    index: number;
    horizontalRulers: number[];
    verticalRulers: number[];

    selection: ReadonlyArray<Layer>;
    readonly layers: ReadonlyArray<Layer>;
    readonly viewport: Viewport;

    readonly removed: boolean;
    remove(): void;

    frontForward(): void;
    backForward(): void;
    appendChild(child: Layer): void;
    insertChild(index: number, child: Layer): void;
    findChild(callback: (layer: Layer) => boolean): Layer | null;
    findChildren(callback?: (layer: Layer) => boolean): Layer[];
    findOne(callback: (layer: Layer) => boolean): Layer | null;
    findAll(callback?: (layer: Layer) => boolean): Layer[];
  }

  interface Viewport {
    center: Position;
    zoom: number;
    readonly bounds: Bounds;
    scrollAndZoomIntoView(layers: Layer[]): void;
  }

  interface Layer {
    readonly id: string;
    readonly type: string;
    name: string;
    index: number;

    locked: boolean;
    hidden: boolean;
    transform: {
      readonly rotation: number;
      readonly flippedHorizontally: boolean;
      readonly flippedVertically: boolean;
    };

    x: number;
    y: number;
    readonly width: number;
    readonly height: number;
    resize(width: number, height: number): void;
    scale(scale: number): void; // >0

    readonly removed: boolean;
    remove(): void;

    selected: boolean;

    // layout: Layout;

    readonly parent: Page | Frame | Group | null;
    readonly parentID: string;

    opacity: number; // [0 - 1]
    blendMode: BlendMode;
    blur: Blur;

    fills: ReadonlyArray<Fill>;
    borders: ReadonlyArray<Border>;
    shadows: ReadonlyArray<Shadow>;
    innerShadows: ReadonlyArray<Shadow>;
    borderOptions: BorderOptions;
    exportFormats: ReadonlyArray<ExportFormat>;

    flow?: Flow;

    duplicate(): Layer;
    bringToFront(): void;
    frontForward(): void;
    backForward(): void;
    sendToBack(): void;
    getParentPage(): Page | null;
    getParentArtboard(): Artboard | null;
    getParentSymbolMaster(): SymbolMaster | null;
    getParentGroup(): Group | null;

    exportSourceAsync(exportFormats: ExportFormat): Promise<number[]>;

    getPluginData(key: string): string | undefined;
    setPluginData(key: string, value: string): void;
    getPluginDataKeys(): string[];
  }

  interface Path extends Layer {
    points: ReadonlyArray<CurvePoint>;
    closed: boolean;
    isMask: boolean;
    sharedStyleId: string | undefined;
    sharedStyle: SharedLayerStyle | null;
  }

  interface Slice extends Layer {}

  interface Hotspot extends Layer {}

  interface Text extends Layer {
    text: string;
    alignment: Alignment;
    verticalAlignment: VerticalAlignment;
    kerning?: number;
    lineHeight?: number;
    paragraphSpacing?: number;
    textColor: Color;
    fontSize: number;
    textTransform: TextTransform;
    postscript: string;
    readonly fontFamily: string;
    readonly fontStyle: string;
    readonly fontWeight: string;
    textUnderline: DecorationStyle;
    textStrikethrough: StrikeThroughStyle;
    textBehaviour: TextBehaviour;
    fragments: TextFragment[];

    sharedStyleId: string | undefined;
    readonly sharedStyle: SharedLayerStyle | null;
  }

  interface Image extends Layer {
    /**
     *  mockplus imageData hash
     *  */
    image?: string;

    sharedStyleId: string | undefined;
    readonly sharedStyle: SharedLayerStyle | null;
  }

  interface Container extends Layer {
    readonly layers: ReadonlyArray<Layer>;

    appendChild(child: Layer): void;
    insertChild(index: number, child: Layer): void;
    findChild(callback: (layer: Layer) => boolean): Layer | null;
    findChildren(callback?: (layer: Layer) => boolean): Layer[];
    findOne(callback: (layer: Layer) => boolean): Layer | null;
    findAll(callback?: (layer: Layer) => boolean): Layer[];
  }

  interface Group extends Container {
    smartLayout?: SmartLayout;
    unGroup(): Layer[];
  }

  interface ShapeGroup extends Container {
    readonly layers: ReadonlyArray<Layer>;
    isMask: boolean;

    sharedStyleId: string | undefined;
    readonly sharedStyle: SharedLayerStyle | null;
    unGroup(): Layer[];
  }

  interface Frame extends Container {
    background: Background;
    flowStartPoint: boolean;
    gridSettings?: GridSettings;
    layoutSettings?: LayoutSettings;
    layoutAndGridColor?: LayoutAndGridColors;
    horizontalRulers: number[];
    verticalRulers: number[];

    readonly parent: Page | null;
  }

  interface Artboard extends Frame {}

  interface SymbolMaster extends Frame {
    readonly symbolID: string;
    overrideProperties: ReadonlyArray<OverrideProperty>;
    smartLayout?: SmartLayout;
    allowsOverrides: boolean;

    toArtboard(): Artboard;
    setOverrideProperty(override: { canOverride: boolean; property: OverridePropertyValue; affectLayer: Layer }): void;
    getAllInstances(): SymbolInstance[];
    createSymbolInstance(): SymbolInstance;
  }

  interface SymbolInstance extends Layer {
    readonly master: SymbolMaster;
    readonly symbolID: string;
    readonly overrideValues: ReadonlyArray<OverrideValue>;

    setOverrideValue(override: { property: OverridePropertyValue; affectedLayer: Layer; value: string }): void;
    resetOverrideValues(): void;
    detach(): Group | null;
    resizeWithSmartLayout(): void;
  }

  type EventType = 'selectionChange' | 'currentPageChange' | 'close';

  interface OnMessageProperties {
    origin: string;
  }

  interface User {
    readonly id: number;
    readonly name: string;
    readonly avatar: string;
    readonly teamID?: string;
  }

  interface ShowUIOptions {
    visible?: boolean;
    title?: string;
    width?: number;
    height?: number;
  }

  interface UIPostMessageOptions {
    origin?: string;
  }

  type MessageEventHandler = (pluginMessage: any, props: OnMessageProperties) => void;

  type FileFormat = 'jpg' | 'png' | 'svg' | 'webp';

  interface FontFamily {
    readonly family: string;
    readonly postscript: string;
    readonly weight: FontWeight;
    readonly slant: FontSlant;
    readonly width: FontWidth;
  }

  interface Bounds {
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly width: number;
    readonly height: number;
  }

  interface Layout {
    readonly responsive: boolean;
    readonly auto: boolean;
    readonly horizontal: HorizontalAlign;
    readonly vertical: VerticalAlign;
    readonly fixedWidth: boolean;
    readonly fixedHeight: boolean;
  }

  interface ExportFormat {
    readonly fileFormat: FileFormat;
    readonly size: '0.5x' | '1x' | '1.5x' | '2x' | '500w' | '200h';
    readonly expand?: {
      readonly type: 'prefix' | 'suffix';
      readonly value: string;
    };
  }

  interface Position {
    readonly x: number;
    readonly y: number;
  }

  interface Blur {
    readonly blurType: BlurType;
    readonly motionAngle: number;
    readonly center: Position;
    readonly radius: number;
    readonly enabled: boolean;
  }

  interface Color {
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
  }

  interface GradientStop {
    readonly position: number;
    readonly color: Color;
  }

  interface Gradient {
    readonly gradientType: GradientType;
    readonly from: Position;
    readonly to: Position;
    readonly aspectRatio: number; // [0,1]
    readonly stops: GradientStop[];
  }

  interface ContextSettings {
    readonly opacity: number;
    readonly blendMode: BlendMode;
  }

  interface Fill {
    readonly fillType: FillType;
    readonly color: Color;
    readonly gradient: Gradient;
    readonly pattern: {
      readonly patternType: PatternFillType;
      readonly tileScale: number;
      readonly image?: string; // ImageData.hash
    };
    readonly context: ContextSettings;
    readonly enabled: boolean;
  }

  interface Border {
    readonly fillType: FillType;
    readonly color: Color;
    readonly gradient: Gradient;
    readonly thickness: number;
    readonly position: BorderPosition;
    readonly context: ContextSettings;
    readonly enabled: boolean;
  }

  interface Shadow {
    readonly color: Color;
    readonly blur: number;
    readonly x: number;
    readonly y: number;
    readonly spread: number;
    readonly context: ContextSettings;
    readonly enabled: boolean;
  }

  interface BorderOptions {
    readonly startArrowhead?: Arrowhead;
    readonly endArrowhead?: Arrowhead;

    /**
     * 集合数据值只能为[]， [0|1], [0|1, 0|1]
     */
    readonly dashPattern: [] | [number] | [number, number];
    readonly lineEnd: LineEnd;
    readonly lineJoin: LineJoin;
  }

  interface CurvePoint {
    readonly point: Position;
    readonly curveFrom: Position;
    readonly curveTo: Position;
    readonly cornerRadius: number;
    readonly pointType: PointType;
  }

  interface Background {
    readonly enabled: boolean;
    readonly includedInExport: boolean;
    readonly color: Color;
    readonly includeInInstance?: boolean; // 只有当节点为SymbolMaster时，该属性才生效。
  }

  interface GridSettings {
    readonly enabled: boolean;
    readonly blockSize: number;
    readonly thickEvery: number;
  }

  interface LayoutSettings {
    readonly enabled: boolean;
    readonly totalWidth: number;
    readonly offset: number;
    readonly columns: {
      readonly enabled: boolean;
      readonly gutterOnOutside: boolean;
      readonly gutterWidth: number;
      readonly columnsCount: number;
    };
    readonly rows: {
      readonly enabled: boolean;
      readonly gutterHeight: number;
      readonly rowHeight: number;
      readonly drawAllLines: boolean;
    };
    readonly viewMode: 'fill' | 'stroke';
  }

  interface LayoutAndGridColors {
    readonly thickColor: Color;
    readonly lightColor: Color;
  }

  type BackTarget = 'back';

  interface Flow {
    readonly animationType: AnimationType;
    readonly targetId: string | BackTarget | undefined;
    readonly target: Artboard | null; // 在设置数据时，此参数将被忽略。
  }

  interface ImageData {
    readonly hash: string;
    getByteNumbersAsync(): Promise<number[]>;
  }

  type OverridePropertyValue = 'stringValue' | 'symbolID' | 'layerStyle' | 'textStyle'; // 这里暂时未提供image属性的覆写，太麻烦

  interface OverrideProperty {
    // readonly path: string;
    readonly canOverride: boolean;
    readonly affectedLayer: Layer;
    readonly property: OverridePropertyValue;
  }

  interface OverrideValue {
    // readonly path: string;
    readonly property: OverridePropertyValue;
    readonly value: string;
    readonly affectedLayer: Layer; // 这里貌似应该添加更严格的限制条件
  }

  interface Properties {
    readonly opacity: number;
    readonly blendMode: BlendMode;
    readonly blur: Blur;

    readonly fills: ReadonlyArray<Fill>;
    readonly borders: ReadonlyArray<Border>;
    readonly shadows: ReadonlyArray<Shadow>;
    readonly innerShadows: ReadonlyArray<Shadow>;
    readonly borderOptions: BorderOptions;
  }

  interface TextAttributes {
    readonly alignment: Alignment;
    readonly kerning?: number;
    readonly lineHeight?: number;
    readonly paragraphSpacing?: number;
    readonly textColor: Color;
    readonly fontSize: number;
    readonly textTransform: TextTransform;
    readonly postscript: string;
    readonly fontFamily: string;
    readonly fontStyle: string;
    readonly fontWeight: string;
    readonly textUnderline: DecorationStyle;
    readonly textStrikethrough: StrikeThroughStyle;
  }

  interface TextProperties extends Properties, TextAttributes {
    readonly verticalAlignment: VerticalAlignment;
  }

  interface TextFragment {
    location: number;
    length: number;
    attributes: TextAttributes;
  }

  // ==========资源库=================

  interface BaseResourceStyle {
    readonly id: string;
    readonly type: ResourceType;
    /**
     * 重命名本地资源
     */
    name: string;

    readonly removed: boolean;
    /**
     * only remove local resource
     */
    remove(): boolean;
  }

  interface SharedLayerStyle extends BaseResourceStyle {
    readonly type: ResourceType.LayerStyle;
    style: Properties;
  }

  interface SharedTextStyle extends BaseResourceStyle {
    readonly type: ResourceType.TextStyle;
    style: TextProperties;
  }

  interface SharedColorStyle extends BaseResourceStyle {
    readonly type: ResourceType.Color;

    /**
     * 设置颜色值为资源的引用，使用方式如下：
     *
     * const text = mockplus.createText();
     * text.textColor = sharedColorStyle.referencingColor;
     *
     * 设置为非引用颜色值方式如下：
     * text.textColor = sharedColorStyle.color;
     *
     */
    readonly referencingColor: any;
    color: Color;
  }

  interface SharedSymbolStyle extends BaseResourceStyle {
    readonly type: ResourceType.Symbol;
  }

  interface Library {
    readonly appID: string;
    readonly name: string;
    readonly enabled: boolean;

    readonly colors: ReadonlyArray<Readonly<SharedColorStyle>>;
    readonly textStyles: ReadonlyArray<Readonly<SharedTextStyle>>;
    readonly layerStyles: ReadonlyArray<Readonly<SharedLayerStyle>>;
    readonly masters: ReadonlyArray<Readonly<SharedSymbolStyle>>;

    setEnabled(enabled: boolean): Promise<boolean>;
  }

  interface Console {
    log(...data: any[]): void;
    error(...data: any[]): void;
    assert(condition?: boolean, ...data: any[]): void;
    info(...data: any[]): void;
    warn(...data: any[]): void;
    clear(): void;
  }
}

export {};
/* eslint-enable */
