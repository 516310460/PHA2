__customIndicators = [{
  name: "Bar Colorer Demo",
  metainfo: {
      _metainfoVersion: 42,

      id: "BarColoring@tv-basicstudies-1",

      name: "BarColoring",
      description: "Bar Colorer Demo",
      shortDescription: "BarColoring",
      scriptIdPart: "",
      is_price_study: true,
      is_hidden_study: false,
      isCustomIndicator: true,

      isTVScript: false,
      isTVScriptStub: false,
      defaults: {
          precision: 4,
          palettes: {
              palette_0: {
                  // palette colors
                  // change it to the defaults you prefer,
                  // but note that user can change them in Style tab
                  // of indicator property page
                  colors: [
                      { color: "#FFFF00" },
                      { color: "#0000FF" }
                  ]
              }
          }
      },
      inputs: [],
      plots: [{
          id: "plot_0",
          // plot type should be set to 'bar_colorer'
          type: "bar_colorer",
          // this is the reference to the palette
          // defined in 'palettes' and 'defaults.palettes' sections
          palette: "palette_0"
      }],
      palettes: {
          palette_0: {
              colors: [
                  { name: "Color 0" },
                  { name: "Color 1" }
              ],
              // mapping of values returned by the script
              // to the specific colors in the palette
              // value can be arbitrary number constant
              valToIndex: {
                  100: 0,
                  200: 1
              }
          }
      }
  },
  constructor: function() {
      this.main = function(context, input) {
          this._context = context;
          this._input = input;

          var valueForColor0 = 100;
          var valueForColor1 = 200;
          // perform your calculations here and return one of the constants
          // specified as key in 'valToIndex' mapping
          var result =
              Math.random() * 100 % 2 > 1 ? // we just randomly select one of the color values
                  valueForColor0 : valueForColor1;

          return [result];
      }
  }
}];