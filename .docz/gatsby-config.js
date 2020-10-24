const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Otoli Documentation',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: { initialColorMode: 'dark' },
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: ['Getting Started', 'Components', 'Containers'],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: true,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: 'C:\\Users\\Dell\\next\\.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Otoli Documentation',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: 'C:\\Users\\Dell\\next',
          templates:
            'C:\\Users\\Dell\\next\\node_modules\\docz-core\\dist\\templates',
          docz: 'C:\\Users\\Dell\\next\\.docz',
          cache: 'C:\\Users\\Dell\\next\\.docz\\.cache',
          app: 'C:\\Users\\Dell\\next\\.docz\\app',
          appPackageJson: 'C:\\Users\\Dell\\next\\package.json',
          appTsConfig: 'C:\\Users\\Dell\\next\\tsconfig.json',
          gatsbyConfig: 'C:\\Users\\Dell\\next\\gatsby-config.js',
          gatsbyBrowser: 'C:\\Users\\Dell\\next\\gatsby-browser.js',
          gatsbyNode: 'C:\\Users\\Dell\\next\\gatsby-node.js',
          gatsbySSR: 'C:\\Users\\Dell\\next\\gatsby-ssr.js',
          importsJs: 'C:\\Users\\Dell\\next\\.docz\\app\\imports.js',
          rootJs: 'C:\\Users\\Dell\\next\\.docz\\app\\root.jsx',
          indexJs: 'C:\\Users\\Dell\\next\\.docz\\app\\index.jsx',
          indexHtml: 'C:\\Users\\Dell\\next\\.docz\\app\\index.html',
          db: 'C:\\Users\\Dell\\next\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
