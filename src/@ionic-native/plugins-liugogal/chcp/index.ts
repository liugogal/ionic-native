/**
 * This is a template for new plugin wrappers
 *
 * TODO:
 * - Add/Change information below
 * - Document usage (importing, executing main functionality)
 * - Remove any imports that you are not using
 * - Add this file to /src/index.ts (follow style of other plugins)
 * - Remove all the comments included in this template, EXCEPT the @Plugin wrapper docs and any other docs you added
 * - Remove this note
 *
 */
import {Plugin, Cordova, IonicNativePlugin} from '@ionic-native/core';
import {Injectable} from '@angular/core';

/**
 * @name Chcp
 * @description
 * This plugin does something
 *
 * @usage
 * ```
 * import { Chcp } from 'ionic-native';
 *
 *
 * constructor(private chcp: Chcp) { }
 *
 * ...
 *
 *
 * this.chcp.functionName('Hello', 123)
 *   .then((res: any) => console.log(res))
 *   .catch((error: any) => console.error(error));
 *
 * ```
 */
@Plugin({
    pluginName: 'Chcp',
    pluginRef: 'chcp', // the variable reference to call the plugin, example: navigator.geolocation
    plugin: 'cordova-hot-code-push-plugin', // npm package name, example: cordova-plugin-camera
    platforms: ['Android', 'iOS']
})
@Injectable()
export class Chcp extends IonicNativePlugin {

    /**
     * app store or Google store
     * @param message
     */

    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    requestApplicationUpdate(message: string): Promise<any> {
        return;
    }

    /**
     * 配置
     * @param options
     */

    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    configure(options?: any): Promise<any> {
        return;
    }

    /**
     * 检测更新
     * @param options
     */

    @Cordova({
        successIndex: 0,
        errorIndex: 2
    })
    fetchUpdate(options?: any): Promise<any> {
        return;
    }

    /**
     * 开始更新
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    installUpdate(): Promise<any> {
        return;
    }
}
