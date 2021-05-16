import { render } from "@testing-library/react";
// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const Providers = ({ children }) => {
  return children;
  // return (
  //   <ThemeProvider theme="light">
  //     <TranslationProvider messages={defaultStrings}>
  //       {children}
  //     </TranslationProvider>
  //   </ThemeProvider>
  // )
};

const customRender = (ui: JSX.Element, options = {}) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
