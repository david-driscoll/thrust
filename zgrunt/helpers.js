function getRequireSettingsFrom(grunt, file)
{
    try
    {
        var rs = grunt.file.read(file).toString();
        rs = rs.substring(rs.indexOf('({') + 1);
        rs = rs.substring(0, rs.lastIndexOf('})') + 1);
        var resultFn = new Function('return ' + rs);
        return resultFn();
    }
    catch (e)
    {
        return {};
    }
}
exports.getRequireSettingsFrom = getRequireSettingsFrom;

var requireSettings;
function getRequireSettings(grunt, settings)
{
    var _ = grunt.util._;
    if (requireSettings == null)
    {
        requireSettings = getRequireSettingsFrom(grunt, './require.settings.js');
    }
    return _.merge({}, requireSettings, settings || {})
}
exports.getRequireSettings = getRequireSettings;

function getAllModuleExclusions(grunt)
{
    return grunt.file.expandDirs('./thrust/*').map(function (x)
    {
        return '!' + x.substring(2).substring(0, x.length - (2)) + '/main';
    });

}
exports.getAllModuleExclusions = getAllModuleExclusions;

function getRelativeDir(baseUrl, appDir)
{
    var relativeBaseUrl = baseUrl,
        relativeAppDir = appDir;

    if (relativeBaseUrl.indexOf('.') === 0)
        relativeBaseUrl = relativeBaseUrl.substring(1);
    if (relativeBaseUrl.indexOf('/') === 0)
        relativeBaseUrl = relativeBaseUrl.substring(1);
    if (relativeBaseUrl.length === 0)
        relativeBaseUrl = null;

    if (relativeBaseUrl == null && appDir)
    {
        relativeAppDir = appDir;
        if (relativeAppDir.indexOf('.') === 0)
            relativeAppDir = relativeAppDir.substring(1);
        if (relativeAppDir.indexOf('/') === 0)
            relativeAppDir = relativeAppDir.substring(1);
        if (relativeAppDir.length === 0)
            relativeAppDir = null;
    }
    return relativeBaseUrl || relativeAppDir;
}
exports.getRelativeDir = getRelativeDir;

function expand(grunt, relativeBaseUrl)
{
    return function (files)
    {
        var /*folders = grunt.file.expandDirs({ nonull: true }, files),*/
            result = grunt.file.expand({ nonull: true }, files)
                .map(function (x) { return x.indexOf('.js') === x.length - 3 ? x.substring(0, x.length - 3) : x; })
                .map(function (x) { return relativeBaseUrl && x.indexOf(relativeBaseUrl) === 0 ? x.substring(relativeBaseUrl.length + 1) : x });

        /*result = _.difference(result, folders);*/
        files.splice.apply(files, [0, files.length].concat(result));
    }
}

exports.expandFileArrays = expand;

function makeModules(grunt, appDir, metadata, settings)
{
    var modules = [];
    var _ = grunt.util._;

    function makeModule(name, exclude, include)
    {
        var m = {
            name: name,
            exclude: (settings.exclude || []).concat(exclude),
            include: (settings.include || []).concat(include),
        };
        m = _.merge({}, settings, m);


        _([(m.include || [])]
            .concat([m.exclude || []])
            .filter(function (x) { return !!x && x.length > 0; }))
            .each(expand(grunt, getRelativeDir('', appDir)));

        return m;
    }


    modules.push(makeModule('thrust', null, metadata.thrust.inclusions));

    _.each(metadata.thrust.plugin, function (x, i)
    {
        modules.push(makeModule('thrust/' + i, x.exclusions, x.inclusions));
    });

    return modules;
}
exports.makeModules = makeModules;

function buildCopyPaths(grunt, metadata, debug, prefix, postfix, excludePlugins)
{
    var _ = grunt.util._,
        file = 'main';
    if (prefix == null)
        prefix = '';
    if (postfix == null)
        postfix = '';

    function buildAddFilePath(o, name)
    {
        _.each(['.js', '.js.map', '.js.src'], function (ext)
        {
            var source = 'build/' + name + '/' + file + ext,
                dest = 'dist/' + prefix + name.replace(/\//g, '.') + postfix + ext;

            if (debug && (ext === '.js.map' || ext === '.js.src'))
                return;
            o[dest] = source;
        })
    }

    var c = {};
    buildAddFilePath(c, 'thrust');
    if (!excludePlugins)
    {
        _.each(metadata.thrust.plugin, function (x, i)
        {
            buildAddFilePath(c, 'thrust/' + i);
        });
    }

    return c;
}
exports.buildCopyPaths = buildCopyPaths;

function buildUglifyPaths(grunt, metadata, prefix, postfix, excludePlugins)
{
    var _ = grunt.util._;
    if (prefix == null)
        prefix = '';
    if (postfix == null)
        postfix = '';

    function buildAddFilePath(o, name)
    {
        var source = 'dist/' + prefix + name + postfix + '.js',
            dest = 'dist/' + prefix + name + postfix + '.min.js';

        o[dest] = [source];
    }

    var c = {};
    buildAddFilePath(c, 'thrust');
    if (!excludePlugins)
    {
        _.each(metadata.thrust.plugin, function (x, i)
        {
            buildAddFilePath(c, ('thrust/' + i).replace(/\//g, '.'));
        });
    }

    return c;
}

exports.buildUglifyPaths = buildUglifyPaths;


function buildTestRequireSettings(grunt, metadata, integrated)
{
    var _ = grunt.util._,
        settings = _.merge({}, getRequireSettings(grunt)),
        names = ['thrust', 'thrust/util'].concat(_.keys(metadata.thrust.plugin).map(function (x) { return 'thrust/' + x; }));

    function updatePaths(prefix, postfix, fullName)
    {
        if (prefix == null)
            prefix = '';
        if (postfix == null)
            postfix = '';

        _.each(names, function (x)
        {
            var path = '' + prefix + (!fullName && x.replace(/\//g, '.') || '') + postfix;
            path = grunt.template.process(path);

            settings.paths[x] = path;
        });
        settings.paths['thrust/util'] = settings.paths['thrust'];
    }

    var newPackages = [];
    _.each(settings.packages, function (p, i)
    {
        var nameIndex = names.indexOf(p.name),
            name = names[nameIndex];

        if (!name)
            newPackages.push(p);
    });
    settings.packages = newPackages;
    settings.baseUrl = './dist/';

    if (!integrated)
    {
        updatePaths('debug/');
        grunt.file.write('./require.settings-debug-test.js', 'require.config(' + JSON.stringify(settings) + ')');

        updatePaths(null, metadata.thrust.fileVersionFormat);
        grunt.file.write('./require.settings-release-test.js', 'require.config(' + JSON.stringify(settings) + ')');

        updatePaths(null, metadata.thrust.fileVersionFormat + '.min');
        grunt.file.write('./require.settings-release-min-test.js', 'require.config(' + JSON.stringify(settings) + ')');
    }
    else if (integrated === 'all')
    {
        updatePaths('debug/', 'thrust.all', true);
        grunt.file.write('./require.settings-debug-all-test.js', 'require.config(' + JSON.stringify(settings) + ')');

        updatePaths(null, 'thrust.all' + metadata.thrust.fileVersionFormat, true);
        grunt.file.write('./require.settings-release-all-test.js', 'require.config(' + JSON.stringify(settings) + ')');

        updatePaths(null, 'thrust.all' + metadata.thrust.fileVersionFormat + '.min', true);
        grunt.file.write('./require.settings-release-all-min-test.js', 'require.config(' + JSON.stringify(settings) + ')');
    }
    else
    {
        updatePaths('debug/', 'thrust.all.libraries', true);
        grunt.file.write('./require.settings-debug-integrated-test.js', 'require.config(' + JSON.stringify(settings) + ')');

        updatePaths(null, 'thrust.all.libraries' + metadata.thrust.fileVersionFormat, true);
        grunt.file.write('./require.settings-release-integrated-test.js', 'require.config(' + JSON.stringify(settings) + ')');

        updatePaths(null, 'thrust.all.libraries' + metadata.thrust.fileVersionFormat + '.min', true);
        grunt.file.write('./require.settings-release-integrated-min-test.js', 'require.config(' + JSON.stringify(settings) + ')');
    }
}
exports.buildTestRequireSettings = buildTestRequireSettings;

function buildExampleSettings(grunt, metadata)
{
    var _ = grunt.util._,
        examples = grunt.file.expandDirs('./example/*'),
        templateSrc = grunt.file.read('./zgrunt/example.settings.tmpl'),
        names = ['thrust', 'thrust/util'].concat(_.keys(metadata.thrust.plugin).map(function (x) { return 'thrust/' + x; })),
        baseSettings = _.merge({}, getRequireSettings(grunt, { baseUrl: '.' }));

    var newPackages = [];
    _.each(baseSettings.packages, function (p, i)
    {
        var nameIndex = names.indexOf(p.name),
            name = names[nameIndex];

        if (!name)
            newPackages.push(p);
    });

    var debugSettings = _.merge({}, baseSettings);
    baseSettings.packages = newPackages;

    var releaseSettings = _.merge({}, baseSettings),
        releaseMinSettings = _.merge({}, baseSettings),
        integratedSettings = _.merge({}, baseSettings);

    _.each(names, function (x)
    {
        integratedSettings.paths[x] = releaseMinSettings.paths[x] = releaseSettings.paths[x] = x;
    });

    _.each(integratedSettings.paths, function (x, i)
    {
        if (x.indexOf('../lib') === 0)
        {
            releaseMinSettings.paths[i] = releaseSettings.paths[i] = debugSettings.paths[i] = '../' + x;
            delete integratedSettings.paths[i];
        }
        if (i.indexOf('jquery') === 0)
        {
            // We remove everything but jquery when doing the integrated build.
            integratedSettings.paths[i] = '../' + x;
        }
        if (x.indexOf('thrust') === 0)
        {
            releaseSettings.paths[i] = '../../dist/' + x.replace(/\//gi, '.');
            releaseMinSettings.paths[i] = '../../dist/' + x.replace(/\//gi, '.') + '.min';
            integratedSettings.paths[i] = grunt.template.process('../../dist/thrust.all.libraries.' + metadata.thrust.fileVersionFormat + '.min');
        }
    });

    _.each(debugSettings.packages, function (x, i)
    {
        if (x.location.indexOf('../lib') === 0)
        {
            releaseMinSettings.packages[i].location = releaseSettings.packages[i].location = debugSettings.packages[i].location = '../' + x.location;
        }
        if (x.location.indexOf('thrust') === 0)
        {
            debugSettings.packages[i].location = '../../src/' + x.location;
        }
    });
    integratedSettings.packages = [];

    var settingsObject = {
        debug: debugSettings,
        release: releaseSettings,
        releaseMin: releaseMinSettings,
        integrated: integratedSettings
    }

    _.each(examples, function (x)
    {
        var settingsFile = x + '/example.settings.js',
            context = {
                fileExists: grunt.file.exists(settingsFile),
                settings: settingsObject
            };
        var renderedSettings = grunt.util._.template(templateSrc, context);

        if (context.fileExists)
        {
            var currentSettings = grunt.file.read(settingsFile);
            renderedSettings = currentSettings.replace(/(\/\/#region default settings[\s\S]*\/\/#endregion)/i, renderedSettings);
        }
        grunt.file.write(settingsFile, renderedSettings);
    });
}
exports.buildExampleSettings = buildExampleSettings;