import 'styled-components';
import * as CSS from 'csstype';

declare module 'styled-components' {
  export interface DefaultTheme {
    // colors
    bodyColor: CSS.Property.Color;
    primaryColor: CSS.Property.Color;
    bodyTextColor: CSS.Property.Color;
    accentColor: CSS.Property.Color;
    accentTextLightColor: CSS.Property.Color;
    accentTextDarkColor: CSS.Property.Color;
    dangerTextColor: CSS.Property.Color;

    // typography
    fontFamily: CSS.Property.FontFamily;
    bodyText: CSS.Property.FontSize;
    bodyLineHeight: CSS.Property.LineHeight;
    h1FontSize: CSS.Property.FontSize;
    h2FontSize: CSS.Property.FontSize;
    h3FontSize: CSS.Property.FontSize;
    h4FontSize: CSS.Property.FontSize;
    h5FontSize: CSS.Property.FontSize;

    // breakpoints
    breakpoints: {
      sm: CSS.Property.Width;
      md: CSS.Property.Width;
      lg: CSS.Property.Width;
      xl: CSS.Property.Width;
    };
  }
}
