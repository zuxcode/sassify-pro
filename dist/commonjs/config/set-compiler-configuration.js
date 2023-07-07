export default class SetCompilerConfigurationSettings {
    static setCompilerConfiguration(userConfig, defaultConfig) {
        const configurationSettings = defaultConfig;
        Object.keys(userConfig).forEach((userConfigKey) => {
            Object.keys(defaultConfig).forEach((defaultConfigKey) => {
                if (userConfigKey.match(defaultConfigKey)) {
                    configurationSettings[defaultConfigKey] = userConfig[userConfigKey];
                }
            });
        });
        return configurationSettings;
    }
}
