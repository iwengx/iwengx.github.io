// * set html tag attributes
exports.onRenderBody = ({ setHtmlAttributes }) => {
   setHtmlAttributes({ lang: 'zh', 'theme-color': 'light' });
};
