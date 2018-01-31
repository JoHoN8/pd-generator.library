//<%= ngapp %> to add text in file
'use strict';
var Generator = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    includes = function (ary, lib) {
        var val = ary.indexOf(lib);

        return val > -1;
    };

module.exports = class extends Generator{
    constructor(args, opts) {
        super(args,opts);
        
        this.includes = includes;
        
    };
    initializing() {
    };
    prompting() {
        var self = this;

        this.log(yosay('Welcome to ' + 
            chalk.yellow('Library') + ' generator!'));
            
        //var done = this.async();
        return this.prompt([{
            type: 'input',
            name: 'libraryName',
            message: 'Provide Library Name',
            default: 'jsLib'
        },
        {
            type: 'checkbox',
            name: 'jslibs',
            message: 'Which JS libraries would you like to include?',
            choices: [
                {
                    name: 'axios',
                    value: 'axios',
                    checked: true
                },
                {
                    name: 'jQuery',
                    value: 'jquery',
                    checked: false
                },
                {
                    name: 'lodash',
                    value: 'lodash',
                    checked: false 
                },
                {
                    name: 'Moment',
                    value: 'momentjs',
                    checked: false
                },
                {
                    name: 'Numeral',
                    value: 'numeral',
                    checked: false
                }
            ]
        }]).then(function(answers){
            self.libraryName = answers.libraryName.toLowerCase();

            self.includeAxios = self.includes(answers.jslibs, 'axios');
            self.includeJquery = self.includes(answers.jslibs, 'jquery');
            self.includeLodash = self.includes(answers.jslibs, 'lodash');
            self.includeMoment = self.includes(answers.jslibs, 'moment');             
            self.includeNumeral = self.includes(answers.jslibs, 'numeral');             
            //done(); 
        });
            
    };
    configuring() {
    };
    packageJSON() {
        var packageFile = {
            name: this.libraryName,
            version: "1.0.0",
            description: this.desc,
            main: "src/library.js",
            scripts: {
                "testFile": "webpack --config ./webpackConfigs/webpack.config.testing.js",
                "devBuild": "webpack --config ./webpackConfigs/webpack.config.dev.js",
                "prodBuild": "webpack --config ./webpackConfigs/webpack.config.prod.js"
            },
            author: this.author,
            license: "ISC",
            dependencies: {},
            devDependencies: {}
        };

        //dependencies
        if(this.includeAxios) {packageFile.dependencies["axios"] = "latest";}
        if(this.includeJquery) {packageFile.dependencies["jquery"] = "latest";}
        if(this.includeLodash) {packageFile.dependencies["lodash"] = "latest";}
        if(this.includeMoment) {packageFile.dependencies["moment"] = "latest";}
        
        //devDependencies
        packageFile.devDependencies["webpack"] = "latest";
        packageFile.devDependencies["clean-webpack-plugin"] = "latest";
        packageFile.devDependencies["html-webpack-plugin"] = "latest";
        packageFile.devDependencies["webpack-dev-server"] = "latest";
        packageFile.devDependencies["babel-core"] = "latest";
        packageFile.devDependencies["babel-loader"] = "latest";
        packageFile.devDependencies["babel-preset-env"] = "latest";
        packageFile.devDependencies["babel-preset-stage-0"] = "latest";
        packageFile.devDependencies["eslint"] = "latest";
        packageFile.devDependencies["npm-run-all"] = "latest";
        //this.copy('_package.json', 'package.json');

        this.fs.writeJSON(
            this.destinationPath('package.json'),
            packageFile
        );
    };
    appStaticFiles() {
        this.fs.copy(
            this.templatePath('.eslintrc.json'),
            this.destinationPath('.eslintrc.json')
        );
        this.fs.copy(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore')
        );
        this.fs.copy(
            this.templatePath('webpackConfigs/**'),
            this.destinationPath('webpackConfigs/')
        );
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            {
                libraryName: this.libraryName
            }
        );
    };
    scripts() {
        this.fs.copyTpl(
            this.templatePath('lib/_lib.js'),
            this.destinationPath('src/library.js'),
            {
                libraryName: this.libraryName
                //app: this.config.get('ngappname')
            }
        );
        this.fs.copy(
            this.templatePath('_project_tests.js'),
            this.destinationPath('tests/project_tests.js')
        );
    };
    html() {
        this.fs.copyTpl(
            this.templatePath('_index.html'),
            this.destinationPath('tests/index.html'),
            {
                libraryName: this.libraryName
                //app: this.config.get('ngappname')
            }
        );
    };
    conflicts() {
    };
    install() {
        //this.bowerInstall();
        this.npmInstall();
    };
    end() {
        this.log(chalk.yellow.bold('Installation successful!'));
    };
};