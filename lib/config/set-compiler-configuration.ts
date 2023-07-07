import { ConfigInterface } from '../abstract/abstract-type.js';

export default class SetCompilerConfigurationSettings {
  public static setCompilerConfiguration(
    userConfig: ConfigInterface,
    defaultConfig: ConfigInterface,
  ): ConfigInterface {
    const configurationSettings = defaultConfig;
    Object.keys(userConfig).forEach((userConfigKey: string) => {
      Object.keys(defaultConfig).forEach((defaultConfigKey) => {
        if (userConfigKey.match(defaultConfigKey)) {
          configurationSettings[defaultConfigKey] = userConfig[userConfigKey];
        }
      });
    });
    return configurationSettings;
  }
}
