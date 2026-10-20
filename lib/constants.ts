type NavigationItem = {
  href: string;
  label: string;
};

type SelectOption = {
  value: string;
  label: string;
};

type TradingViewSymbol = {
  s: string;
  d: string;
};

type TradingViewTab = {
  title: string;
  symbols: TradingViewSymbol[];
};

type MarketOverviewWidgetConfig = {
  colorTheme: string;
  dateRange: string;
  locale: string;
  largeChartUrl: string;
  isTransparent: boolean;
  showFloatingTooltip: boolean;
  plotLineColorGrowing: string;
  plotLineColorFalling: string;
  gridLineColor: string;
  scaleFontColor: string;
  belowLineFillColorGrowing: string;
  belowLineFillColorFalling: string;
  belowLineFillColorGrowingBottom: string;
  belowLineFillColorFallingBottom: string;
  symbolActiveColor: string;
  tabs: TradingViewTab[];
  support_host: string;
  backgroundColor: string;
  width: string;
  height: number;
  showSymbolLogo: boolean;
  showChart: boolean;
};

type HeatmapWidgetConfig = {
  dataSource: string;
  blockSize: string;
  blockColor: string;
  grouping: string;
  isTransparent: boolean;
  locale: string;
  symbolUrl: string;
  colorTheme: string;
  exchanges: string[];
  hasTopBar: boolean;
  isDataSetEnabled: boolean;
  isZoomEnabled: boolean;
  hasSymbolTooltip: boolean;
  isMonoSize: boolean;
  width: string;
  height: string;
};

type TopStoriesWidgetConfig = {
  displayMode: string;
  feedMode: string;
  colorTheme: string;
  isTransparent: boolean;
  locale: string;
  market: string;
  width: string;
  height: string;
};

type MarketDataSymbol = {
  name: string;
  displayName: string;
};

type MarketDataSymbolGroup = {
  name: string;
  symbols: MarketDataSymbol[];
};

type MarketDataWidgetConfig = {
  title: string;
  width: string;
  height: number;
  locale: string;
  showSymbolLogo: boolean;
  colorTheme: string;
  isTransparent: boolean;
  backgroundColor: string;
  symbolsGroups: MarketDataSymbolGroup[];
};

type SymbolInfoWidgetConfig = {
  symbol: string;
  colorTheme: string;
  isTransparent: boolean | string;
  locale: string;
  width: string;
  height: number;
  interval?: string;
  largeChartUrl?: string;
  displayMode?: string;
};

type ChartWidgetConfig = {
  allow_symbol_change: boolean;
  calendar: boolean;
  details: boolean;
  hide_side_toolbar: boolean;
  hide_top_toolbar: boolean;
  hide_legend: boolean;
  hide_volume: boolean;
  hotlist: boolean;
  interval: string;
  locale: string;
  save_image: boolean;
  style: number;
  symbol: string;
  theme: string;
  timezone: string;
  backgroundColor: string;
  gridColor: string;
  watchlist: string[];
  withdateranges: boolean;
  compareSymbols: string[];
  studies: string[];
  width: string;
  height: number;
};

export const NAV_ITEMS: NavigationItem[] = [
  { href: "/", label: "Dashboard" },
  { href: "/search", label: "Search" },
  { href: "/watchlist", label: "Watchlist" },
];

// Sign-up form select options
export const INVESTMENT_GOALS: SelectOption[] = [
  { value: "Growth", label: "Growth" },
  { value: "Income", label: "Income" },
  { value: "Balanced", label: "Balanced" },
  { value: "Conservative", label: "Conservative" },
];

export const RISK_TOLERANCE_OPTIONS: SelectOption[] = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export const PREFERRED_INDUSTRIES: SelectOption[] = [
  { value: "Technology", label: "Technology" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance", label: "Finance" },
  { value: "Energy", label: "Energy" },
  { value: "Consumer Goods", label: "Consumer Goods" },
];

export const ALERT_TYPE_OPTIONS: SelectOption[] = [
  { value: "upper", label: "Upper" },
  { value: "lower", label: "Lower" },
];

export const CONDITION_OPTIONS: SelectOption[] = [
  { value: "greater", label: "Greater than (>)" },
  { value: "less", label: "Less than (<)" },
];

// TradingView Charts
export const MARKET_OVERVIEW_WIDGET_CONFIG: MarketOverviewWidgetConfig = {
  colorTheme: "dark", // dark mode
  dateRange: "12M", // last 12 months
  locale: "en", // language
  largeChartUrl: "", // link to a large chart if needed
  isTransparent: true, // makes background transparent
  showFloatingTooltip: true, // show tooltip on hover
  plotLineColorGrowing: "#0FEDBE", // line color when price goes up
  plotLineColorFalling: "#0FEDBE", // line color when price falls
  gridLineColor: "rgba(240, 243, 250, 0)", // grid line color
  scaleFontColor: "#DBDBDB", // font color for scale
  belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)", // fill under line when growing
  belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)", // fill under line when falling
  belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
  belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
  symbolActiveColor: "rgba(15, 237, 190, 0.05)", // highlight color for active symbol
  tabs: [
    {
      title: "Finance",
      symbols: [
        { s: "IDX:BBCA", d: "PT Bank Central Asia Tbk" },
        { s: "IDX:BBRI", d: "PT Bank Rakyat Indonesia (Persero) Tbk Class B" },
        { s: "IDX:BBNI", d: "PT Bank Negara Indonesia (Persero) Tbk Class B" },
        { s: "IDX:BMRI", d: "PT Bank Mandiri (Persero) Tbk" },
        { s: "IDX:BRIS", d: "PT Bank Syariah Indonesia (Persero) Tbk" },
        { s: "IDX:ARTO", d: "PT Bank Jago Tbk" },
      ],
    },
    {
      title: "Technology",
      symbols: [
        { s: "IDX:GOTO", d: "PT GoTo Gojek Tokopedia Tbk" },
        { s: "IDX:BUKA", d: "PT Bukalapak.com Tbk" },
        { s: "IDX:EMTK", d: "PT Elang Mahkota Teknologi Tbk" },
        { s: "IDX:DCII", d: "PT DCI Indonesia Tbk" },
        { s: "IDX:MTDL", d: "PT Metrodata Electronics Tbk" },
        { s: "IDX:WIFI", d: "PT Solusi Sinergi Digital Tbk" },
      ],
    },
    {
      title: "Energy & Resources",
      symbols: [
        { s: "IDX:ANTM", d: "PT ANTAM (Persero) Tbk" },
        { s: "IDX:PGEO", d: "PT Pertamina Geothermal Energy Tbk" },
        { s: "IDX:ADRO", d: "PT Alamtri Resources Indonesia Tbk" },
        { s: "IDX:PTBA", d: "PT Bukit Asam (Persero) Tbk" },
        { s: "IDX:ITMG", d: "PT Indo Tambangraya Megah Tbk" },
        { s: "IDX:MEDC", d: "PT Medco Energi Internasional Tbk" },
      ],
    },
  ],
  support_host: "https://www.tradingview.com", // TradingView host
  backgroundColor: "#141414", // background color
  width: "100%", // full width
  height: 600, // height in px
  showSymbolLogo: true, // show logo next to symbols
  showChart: true, // display mini chart
};

export const HEATMAP_WIDGET_CONFIG: HeatmapWidgetConfig = {
  dataSource: "AllID",
  blockSize: "market_cap_basic",
  blockColor: "change",
  grouping: "sector",
  isTransparent: true,
  locale: "en",
  symbolUrl: "",
  colorTheme: "dark",
  exchanges: ["IDX"],
  hasTopBar: false,
  isDataSetEnabled: false,
  isZoomEnabled: true,
  hasSymbolTooltip: true,
  isMonoSize: false,
  width: "100%",
  height: "600",
};

export const TOP_STORIES_WIDGET_CONFIG: TopStoriesWidgetConfig = {
  displayMode: "regular",
  feedMode: "market",
  colorTheme: "dark",
  isTransparent: true,
  locale: "en",
  market: "stock",
  width: "100%",
  height: "600",
};

export const MARKET_DATA_WIDGET_CONFIG: MarketDataWidgetConfig = {
  title: "Stocks",
  width: "100%",
  height: 600,
  locale: "en",
  showSymbolLogo: true,
  colorTheme: "dark",
  isTransparent: false,
  backgroundColor: "#0F0F0F",
  symbolsGroups: [
    {
      name: "Finance",
      symbols: [
        { name: "IDX:BBCA", displayName: "PT Bank Central Asia Tbk" },
        {
          name: "IDX:BBRI",
          displayName: "PT Bank Rakyat Indonesia (Persero) Tbk Class B",
        },
        {
          name: "IDX:BBNI",
          displayName: "PT Bank Negara Indonesia (Persero) Tbk Class B",
        },
        { name: "IDX:BMRI", displayName: "PT Bank Mandiri (Persero) Tbk" },
        {
          name: "IDX:BRIS",
          displayName: "PT Bank Syariah Indonesia (Persero) Tbk",
        },
        { name: "IDX:ARTO", displayName: "PT Bank Jago Tbk" },
      ],
    },
    {
      name: "Technology",
      symbols: [
        { name: "IDX:GOTO", displayName: "PT GoTo Gojek Tokopedia Tbk" },
        { name: "IDX:BUKA", displayName: "PT Bukalapak.com Tbk" },
        { name: "IDX:EMTK", displayName: "PT Elang Mahkota Teknologi Tbk" },
        { name: "IDX:DCII", displayName: "PT DCI Indonesia Tbk" },
        { name: "IDX:MTDL", displayName: "PT Metrodata Electronics Tbk" },
        { name: "IDX:WIFI", displayName: "PT Solusi Sinergi Digital Tbk" },
      ],
    },
    {
      name: "Energy & Resources",
      symbols: [
        { name: "IDX:ANTM", displayName: "PT ANTAM (Persero) Tbk" },
        { name: "IDX:PGEO", displayName: "PT Pertamina Geothermal Energy Tbk" },
        { name: "IDX:ADRO", displayName: "PT Alamtri Resources Indonesia Tbk" },
        { name: "IDX:PTBA", displayName: "PT Bukit Asam (Persero) Tbk" },
        { name: "IDX:ITMG", displayName: "PT Indo Tambangraya Megah Tbk" },
        { name: "IDX:MEDC", displayName: "PT Medco Energi Internasional Tbk" },
      ],
    },
  ],
};

export const SYMBOL_INFO_WIDGET_CONFIG: (
  symbol: string,
) => SymbolInfoWidgetConfig = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: true,
  locale: "en",
  width: "100%",
  height: 170,
});

export const CANDLE_CHART_WIDGET_CONFIG: (
  symbol: string,
) => ChartWidgetConfig = (symbol: string) => ({
  allow_symbol_change: false,
  calendar: false,
  details: true,
  hide_side_toolbar: true,
  hide_top_toolbar: false,
  hide_legend: false,
  hide_volume: false,
  hotlist: false,
  interval: "D",
  locale: "en",
  save_image: false,
  style: 1,
  symbol: symbol.toUpperCase(),
  theme: "dark",
  timezone: "Etc/UTC",
  backgroundColor: "#141414",
  gridColor: "#141414",
  watchlist: [],
  withdateranges: false,
  compareSymbols: [],
  studies: [],
  width: "100%",
  height: 600,
});

export const BASELINE_WIDGET_CONFIG: (symbol: string) => ChartWidgetConfig = (
  symbol: string,
) => ({
  allow_symbol_change: false,
  calendar: false,
  details: false,
  hide_side_toolbar: true,
  hide_top_toolbar: false,
  hide_legend: false,
  hide_volume: false,
  hotlist: false,
  interval: "D",
  locale: "en",
  save_image: false,
  style: 10,
  symbol: symbol.toUpperCase(),
  theme: "dark",
  timezone: "Etc/UTC",
  backgroundColor: "#141414",
  gridColor: "#141414",
  watchlist: [],
  withdateranges: false,
  compareSymbols: [],
  studies: [],
  width: "100%",
  height: 600,
});

export const TECHNICAL_ANALYSIS_WIDGET_CONFIG: (
  symbol: string,
) => SymbolInfoWidgetConfig = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: "true",
  locale: "en",
  width: "100%",
  height: 400,
  interval: "1h",
  largeChartUrl: "",
});

export const COMPANY_PROFILE_WIDGET_CONFIG: (
  symbol: string,
) => SymbolInfoWidgetConfig = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: "true",
  locale: "en",
  width: "100%",
  height: 440,
});

export const COMPANY_FINANCIALS_WIDGET_CONFIG: (
  symbol: string,
) => SymbolInfoWidgetConfig = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: "true",
  locale: "en",
  width: "100%",
  height: 464,
  displayMode: "regular",
  largeChartUrl: "",
});

export const POPULAR_STOCK_SYMBOLS: string[] = [
  // Finance
  "BBCA",
  "BBRI",
  "BBNI",
  "BMRI",
  "BRIS",
  "ALTO",

  // Tech Giants (the big technology companies)
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA",
  "META",
  "NVDA",
  "NFLX",
  "ORCL",
  "CRM",

  // Technology
  "GOTO",
  "BUKA",
  "EMTK",
  "DCII",
  "MTDL",
  "WIFI",

  // Energy & Resources
  "ANTM",
  "PGEO",
  "ADRO",
  "PTBA",
  "ITMG",
  "PGEO",
];

export const NO_MARKET_NEWS: string =
  '<p class="mobile-text" style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#4b5563;">No market news available today. Please check back tomorrow.</p>';

export const WATCHLIST_TABLE_HEADER: string[] = [
  "Company",
  "Symbol",
  "Price",
  "Change",
  "Market Cap",
  "P/E Ratio",
  "Action",
];
