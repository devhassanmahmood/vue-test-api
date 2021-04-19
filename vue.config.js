module.exports = {
    runtimeCompiler: true,
    productionSourceMap: false,

    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/'
    // indexPath: process.env.NODE_ENV === 'production' ? '../app/Views/index.php' : 'index.html',
    // outputDir: '../public/',    
}