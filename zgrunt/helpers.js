var requireSettings;
function getRequireSettings(grunt, settings)
{
    var _ = grunt.util._;
    if (requireSettings == null)
    {
        var rs = grunt.file.read('./require.settings.js').toString();
        rs = rs.substring(rs.indexOf('({') + 1);
        rs = rs.substring(0, rs.lastIndexOf('})') + 1);
        var resultFn = new Function('return ' + rs);
        requireSettings = resultFn();
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