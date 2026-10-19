import TradingViewWidget from "@/components/TradingViewWidget";
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/constants";

const StockDetails = async ({ params }: StockDetailsPageProps) => {
  const { symbol } = await params;
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  return (
    <div className="flex min-h-screen p-4 md:p-6 lg:p-8">
      <section className="flex w-full flex-col gap-8">
        <div className="flex w-full flex-col gap-6">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-100">
            {symbol.toUpperCase()}
          </h1>
          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
            className="custom-chart"
            height={600}
          />
          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={BASELINE_WIDGET_CONFIG(symbol)}
            className="custom-chart"
            height={600}
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <TradingViewWidget
              scriptUrl={`${scriptUrl}symbol-info.js`}
              config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
              height={170}
            />
          </div>
          <div className="flex flex-col gap-6">
            <TradingViewWidget
              scriptUrl={`${scriptUrl}technical-analysis.js`}
              config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
              height={400}
            />
            <TradingViewWidget
              scriptUrl={`${scriptUrl}company-profile.js`}
              config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
              height={440}
            />
            <TradingViewWidget
              scriptUrl={`${scriptUrl}financials.js`}
              config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
              height={464}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StockDetails;
