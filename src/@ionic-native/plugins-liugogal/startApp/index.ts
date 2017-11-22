import { Plugin, Cordova, IonicNativePlugin } from '@ionic-native/core';
import { Injectable } from '@angular/core';

/**
 * @name startApp
 * @description
 * This plugin does something
 */
@Plugin({
    pluginName: 'StartApp',
    pluginRef: 'startApp', // the variable reference to call the plugin, example: navigator.geolocation
    plugin: 'com.lampa.startapp', // npm package name, example: cordova-plugin-camera
    platforms: ['Android', 'iOS']
})
@Injectable()
export class StartApp extends IonicNativePlugin {

    /**
     * 设置并开启第三方app
     * @param params 基本属性
     * @param extra 参数
     * @param command 命令'start check go'
     */

    @Cordova({
        successIndex: 3,
        errorIndex: 4
    })
    set(params: any, extra: any, command: string= 'start'): Promise<any> {
        return;
    }

    /**
     * 获取所有Extras
     */

    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getExtras(): Promise<any> {
        return;
    }

    /**
     * 获取Extra
     * @param extraValue
     */

    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getExtra(extraValue: any): Promise<any> {
        return;
    }


    /**
     * 是否含有Extra
     * @param extraValue
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    hasExtra(extraValue: any): Promise<any> {
        return;
    }
}
