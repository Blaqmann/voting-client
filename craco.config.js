// craco.config.js
module.exports = {
   style: {
      postcss: {
         plugins: [require('tailwindcss'), require('autoprefixer')],
      },
   },
   webpack: {
      configure: (webpackConfig) => {
         // Modify the existing rule to exclude node_modules
         const babelLoaderRule = webpackConfig.module.rules.find(
            (rule) => rule.loader && rule.loader.includes('babel-loader')
         );

         if (babelLoaderRule) {
            babelLoaderRule.exclude = /node_modules/;
         }

         // Add a new rule specifically for JS files in node_modules that might need transpilation
         webpackConfig.module.rules.push({
            test: /\.m?js$/,
            include: /node_modules/,
            type: 'javascript/auto',
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-optional-chaining'],
               },
            },
         });

         return webpackConfig;
      },
   },
};
