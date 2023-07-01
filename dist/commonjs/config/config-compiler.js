"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_config_js_1 = __importDefault(require("../abstract/abstract-config.js"));
/**
 * Represents a class that extends the
 * DefaultCompilerConfig and implements
 * the CompilerConfigInterface.
 *
 * @extends DefaultCompilerConfig
 * @implements CompilerConfigInterface
 */
class CompilerConfig extends abstract_config_js_1.default {
    /**
     * The default configuration object.
     */
    defaultConfig;
    /**
     * The user configuration object.
     */
    userConfig;
    /**
     * Sets the compiler configuration based on the user configuration.
     */
    setCompilerConfig() {
        Object.keys(this.userConfig).forEach((userConfigKey) => {
            Object.keys(this.defaultConfig).forEach((defaultConfigKey) => {
                if (userConfigKey.match(defaultConfigKey)) {
                    this.config = this.userConfig[userConfigKey];
                }
            });
        });
    }
}
exports.default = CompilerConfig;
