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
import {Cordova, IonicNativePlugin, Plugin} from '@ionic-native/core';
import {Injectable} from '@angular/core';

/**
 * 针对消息发送动作的控制选项，可附加在消息发送方法的参数中。
 */
export interface MessageSendingOptions {
    /**
     * 接收方是否针对此次消息发送展示通知栏通知。
     */
    isShowNotification: boolean;
    /**
     * 是否让后台在对方不在线时保存这条离线消息，等到对方上线后再推送给对方。
     */
    isRetainOffline: boolean;
    /**
     * 是否开启了自定义接收方通知栏功能。
     */
    isCustomNotificationEnabled?: boolean;
    /**
     * 设置此条消息在接收方通知栏所展示通知的标题。
     */
    notificationTitle?: string;
    /**
     * 设置此条消息在接收方通知栏所展示通知的内容。
     */
    notificationText?: string;
}

export interface MessageParams {
    // 'single' / 'group'
    type?: 'single' | 'group';
    // 当 type = group 时，groupId 不能为空
    groupId?: string;
    // 当 type = single 时，username 不能为空
    username?: string;
    // 当 type = single 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用
    appKey?: string;

    // 消息内容
    text?: string;
    // Optional. 自定义键值对 = {'key1': 'value1'}
    extras?: any;
    // Optional. MessageSendingOptions 对象
    messageSendingOptions?: MessageSendingOptions;

    // 本地图片、语音绝对路径、本地文件路径
    path?: string;
    // Optional. 自定义键值对
    customObject?: any;

    // 纬度信息
    latitude?: number;
    // 经度信息
    longitude?: number;
    // 地图缩放比例
    scale?: number;
    // 详细地址信息
    address?: string;
    // 消息 id。
    messageId?: string;

    // 开始的消息下标。
    from?: number;
    // 要获取的消息数。比如当 from = 0, limit = 10 时，是获取第 0 - 9 的 10 条历史消息。
    limit?: number;
    reason?: string;
    noteName?: string;

}

export interface UserInfo {
    type: 'user';
    username: string;           // 用户名。
    appKey: string;             // 用户所属应用的 appKey。可与 username 共同作为用户的唯一标志。
    nickname: string;           // 昵称。
    gender: string;             // 'male' / 'female' / 'unknown'
    avatarThumbPath: string;    // 头像的缩略图地址。
    birthday: number;           // 日期的毫秒数。
    region: string;             // 地区。
    signature: string;          // 个性签名。
    address: string;            // 具体地址。
    noteName: string;           // 备注名。
    noteText: string;           // 备注信息。
    isNoDisturb: boolean;       // 是否免打扰。
    isInBlackList: boolean;     // 是否在黑名单中。
    isFriend: boolean;          // 是否为好友。
}
export interface GroupInfo {
    type: 'group';
    id: string;                 // 群组 id，
    name: string;               // 群组名称。
    desc: string;               // 群组描述。
    level: number;              // 群组等级，默认等级 4。
    owner: string;              // 群主的 username。
    ownerAppKey: string;        // 群主的 appKey。
    maxMemberCount: number;     // 最大成员数。
    isNoDisturb: boolean;       // 是否免打扰。
    isBlocked: boolean;         // 是否屏蔽群消息。
}

export interface Conversation {
    /**
     *   会话对象标题。
     *   如果为群聊：
     *       - 未设置群名称：自动使用群成员中前五个人的名称拼接成 title。
     *       - 设置了群名称，则显示群名称。
     *   �如果为单聊：如果用户有昵称，显示昵称。否则显示 username。
     */
    title: string;
    latestMessage: Message;                 // 最近的一条消息对象。
    unreadCount: number;                    // 未读消息数。
    conversationType: 'single' | 'group';   // 会话类型
    target: UserInfo | GroupInfo;           // 聊天�对象信息。
}
export interface Message {

}

export interface TextMessage extends Message {
    id: string;                     // 消息 id。
    type: 'text';                   // 消息类型。
    from: UserInfo;                 // 消息发送者对象。
    target: UserInfo | GroupInfo;   // 消息接收者对象。可能是用户或群组。
    createTime: number;             // 发送消息时间。
    text: string;                   // 消息内容。
    extras: any;                 // 附带的键值对对象。
}

export interface ImageMessage extends Message {
    id: string;
    type: 'image';
    from: UserInfo;
    target: UserInfo | GroupInfo;
    extras: any;
    thumbPath: string;              // 图片的缩略图路径。要下载原图需要调用 `downloadOriginalImage` 方法。
}

export interface VoiceMessage extends Message {
    id: string;
    type: 'image';
    from: UserInfo;
    target: UserInfo | GroupInfo;
    extras: any;
    path: string;                   // 语音文件路径。
    duration: number;                // 语音时长
}

export interface LocationMessage extends Message {
    id: string;
    type: 'voice';
    from: UserInfo;
    target: UserInfo | GroupInfo;
    extras: any;
    address: string;                // 详细地址。
    longitude: number;              // 经度。
    latitude: number;               // 纬度。
    scale: number;                    // 地图缩放比例。
}

export interface FileMessage extends Message {
    id: string;
    type: 'file';
    from: UserInfo;
    target: UserInfo | GroupInfo;
    extras: any;
    fileName: string;             // 文件名。要下载完整文件需要调用 `downloadFile` 方法。
}

export interface CustomMessage extends Message {
    id: string;
    type: 'file';
    from: UserInfo;
    target: UserInfo | GroupInfo;
    extras: any;
    customObject: any;        // 自定义键值对对象。
}

export interface Event {
    type: 'event';
    eventType: string;       // 'group_member_added' / 'group_member_removed' / 'group_member_exit'
    usernames: Array<any>;         // 该事件涉及到的用户 username 数组。
}

export interface JMessageError {
    code?: string;
    description?: string;
}

/**
 * @name jmessage
 * @description
 * This plugin does something
 *
 */
@Plugin({
    pluginName: 'JMessage',
    pluginRef: 'JMessage',
    plugin: 'jmessage-phonegap-plugin',
    platforms: ['Android', 'iOS']
})
@Injectable()
export class JMessage extends IonicNativePlugin {

    /**
     * 初始化
     * @param {{isOpenMessageRoaming: boolean}} params
     * @returns {Promise<any>}
     */
    @Cordova()
    init(params: {isOpenMessageRoaming: boolean}): Promise<any> {
        return;
    }

    /**
     * 设置调试模式
     * @param {{enable: boolean}} params
     * @returns {Promise<any>}
     */
    @Cordova()
    setDebugMode(params: {enable: boolean}): Promise<any> {
        return;
    }


    /**
     * 注册
     * @param {{username: string; password: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    register(params: {username: string, password: string}): Promise<any> {
        return;
    }

    /**
     * 登录
     * @param {{username: string; password: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    login(params: {username: string, password: string}): Promise<any> {
        return;
    }

    /**
     * 退出登陆
     */
    @Cordova()
    logout(): void {
        return;
    }

    /**
     * 获取用户信息
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getMyInfo(): Promise<any> {
        return;
    }

    /**
     * 获取用户信息
     * @param {{username: string; appKey?: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    getUserInfo(params: {username: string, appKey?: string}): Promise<any> {
        return;
    }


    /**
     * 修改密码
     * @param {{oldPwd: string; newPwd: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    updateMyPassword(params: {oldPwd: string, newPwd: string}): Promise<any> {
        return;
    }

    /**
     * 更新当前用户头像
     * @param {{imgPath: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    updateMyAvatar(params: {imgPath: string}): Promise<any> {
        return;
    }

    /**
     * 更新信息
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    updateMyInfo(params: any): Promise<any> {
        return;
    }


    /**
     * 发送文本消息
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    sendTextMessage(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 发送图片消息
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    sendImageMessage(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 发送语音消息
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    sendVoiceMessage(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 发送自定义消息
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    sendCustomMessage(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 发送位置消息
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    sendLocationMessage(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 发送文件消息
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    sendFileMessage(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 消息撤回
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    retractMessage(params: MessageParams): Promise<any> {
        return;
    }


    /**
     * 从最新的消息开始获取历史消息
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    getHistoryMessages(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 发送添加好友请求
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    sendInvitationRequest(params: {username: string, appKey: string, reason: string}): Promise<any> { return; }

    /**
     * 接受好友请求
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    acceptInvitation(params: {username: string, appKey: string}): Promise<any> { return; }

    /**
     * 拒绝好友请求
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    declineInvitation(params: {username: string, appKey: string, reason: string}): Promise<any> { return; }

    /**
     * 从好友列表删除
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    removeFromFriendList(params: {username: string, appKey: string}): Promise<any> { return; }

    /**
     * 修改当前用户好友的备注名
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    updateFriendNoteName(params: {username: string, appKey: string, noteName: string}): Promise<any> { return; }

    /**
     * 修改当前用户好友的备注信息
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    updateFriendNoteText(params: {username: string, appKey: string, noteName: string}): Promise<any> { return; }

    /**
     * 获取当前登录用户的好友列表
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getFriends(): Promise<any> { return; }

    /**
     * 创建群组
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    createGroup(params: {name: string, desc: string}): Promise<any> { return; }

    /**
     * 获取当前用户所有所在的群组 id
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getGroupIds(): Promise<any> { return; }

    /**
     * 获取群组信息
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    getGroupInfo(params: {id: string}): Promise<any> { return; }
    /**
     * 更新群组信息
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    updateGroupInfo(params: {id: string, newName: string, newDesc: string}): Promise<any> { return; }
    /**
     * 群组添加成员
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    addGroupMembers(params: {id: string, usernameArray: any[], appKey: string}): Promise<any> { return; }
    /**
     * 移除群组成员
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    removeGroupMembers(params: {id: string, usernameArray: any[], appKey: string}): Promise<any> { return; }
    /**
     * 退出群组
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    exitGroup(params: {id: string}): Promise<any> { return; }
    /**
     * 获取群组用户列表
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    getGroupMembers(params: {id: string}): Promise<any> { return; }
    /**
     * 添加用户到黑名单
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    addUsersToBlacklist(params: {usernameArray: any[], appKey: string}): Promise<any> { return; }
    /**
     * 把用户从黑名单移除
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    removeUsersFromBlacklist(params: {usernameArray: any[], appKey: string}): Promise<any> { return; }
    /**
     * 获取黑名单列表
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getBlacklist(): Promise<any> { return; }
    /**
     * 设置某个用户或群组是否免打扰。
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    setNoDisturb(params: MessageParams): Promise<any> { return; }
    /**
     * 获取免打扰用户和群组名单。
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getNoDisturbList(): Promise<any> { return; }
    /**
     * 设置是否全局免打扰。
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    setNoDisturbGlobal(params: {isNoDisturb: boolean}): Promise<any> { return; }
    /**
     * 判断当前是否免打扰。
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    isNoDisturbGlobal(): Promise<any> { return; }
    /**
     * 下载用户头像原图，如果已经下载，不会重复下载。
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    downloadOriginalUserAvatar(params: {username: string, appKey: string}): Promise<any> { return; }
    /**
     * 下载指定图片消息的原图，如果已经下载，会直接返回本地文件路径，不会重复下载。
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    downloadOriginalImage(params: MessageParams): Promise<any> { return; }
    /**
     * 下载语音消息文件，如果已经下载，会直接返回本地文件路径，不会重复下载。
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    downloadVoiceFile(params: MessageParams): Promise<any> { return; }
    /**
     * 下载文件消息文件，如果已经下载，会直接返回本地文件路径，不会重复下载。
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    downloadFile(params: MessageParams): Promise<any> { return; }
    /**
     * 创建聊天会话。
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    createConversation(params: MessageParams): Promise<any> { return; }
    /**
     * 删除聊天会话，同时会删除本地聊天记录。
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    deleteConversation(params: MessageParams): Promise<any> { return; }
    /**
     * 进入聊天会话。可以在进入聊天会话页面时调用该方法，这样在收到当前聊天用户的消息时，不会显示通知。
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    enterConversation(params: MessageParams): Promise<any> { return; }
    /**
     * 退出当前会话
     */
    @Cordova()
    exitConversation(): Promise<any> { return; }


    /**
     * 获取会话
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    getConversation(params: MessageParams): Promise<any> { return; }
    /**
     * 获取会话列表
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getConversations(): Promise<any> { return; }
    /**
     * 重置单个会话的未读消息数
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    resetUnreadMessageCount(params: MessageParams): Promise<any> { return; }


    /**
     * 添加收到消息事件监听。
     * @param {(event: any) => void} listener
     * message = {
     *  'id': string,
     *  'from': object,    // 消息发送者信息对象。
     *  'target': object,  // 消息接收方信息（可能为用户或者群组）。
     *  'type': string     // 'text' / 'image' / 'voice' / 'location' / 'file' / 'custom' / 'event'
     *  ...                // 不同消息类型还有其他对应的相关字段，具体可参考文档。
     * }
     */
    @Cordova()
    addReceiveMessageListener(listener: (event: any) => void): void { }
    /**
     * 移除收到消息事件监听。
     * @param {(event: any) => void} listener
     */
    @Cordova()
    removeReceiveMessageListener(listener: (event: any) => void): void { }

    /**
     * 添加点击通知栏消息通知事件监听。
     * @param {(event: any) => void} listener
     */
    @Cordova()
    addClickMessageNotificationListener(listener: (event: any) => void): void { }

    /**
     * 移除点击通知栏消息通知事件监听。
     * @param {(event: any) => void} listener
     */
    @Cordova()
    removeClickMessageNotificationListener(listener: (event: any) => void): void { }
    /**
     * 添加同步离线消息事件监听。
     * @param {(event: any) => void} listener
     */
    @Cordova()
    addSyncOfflineMessageListener(listener: (event: any) => void): void { }

    /**
     * 移除同步离线消息事件监听。
     * @param {(event: any) => void} listener
     */
    @Cordova()
    removeSyncOfflineMessageListener(listener: (event: any) => void): void { }

    /**
     * 添加同步离线消息事件监听。
     * @param {(event: any) => void} listener
     */
    @Cordova()
    addSyncRoamingMessageListener(listener: (event: any) => void): void { }

    /**
     * 移除同步漫游消息事件监听。
     * @param {(event: any) => void} listener
     */
    @Cordova()
    removeSyncRoamingMessageListener(listener: (event: any) => void): void { }

    /**
     * 添加同步漫游消息事件监听。
     * @param {(event: any) => void} listener
     * event = {
     *  'type': string, // 'user_password_change' / 'user_logout' / 'user_deleted' / 'user_login_status_unexpected'
     * }
     */
    @Cordova()
    addLoginStateChangedListener(listener: (event: any) => void): void { }

    /**
     * 移除登录状态变更事件监听
     * @param {(event: any) => void} listener
     */
    @Cordova()
    removeLoginStateChangedListener(listener: (event: any) => void): void { }

    /**
     * 好友相关通知事件。
     * @param {(event: any) => void} listener
     * event = {
     *  'type': string,            // 'invite_received' / 'invite_accepted' / 'invite_declined' / 'contact_deleted'
     *  'reason': string,          // 事件发生的理由，该字段由对方发起请求时所填，对方如果未填则返回默认字符串。
     *  'fromUsername': string,    // 事件发送者的 username。
     *  'fromUserAppKey': string   // 事件发送者的 AppKey。
     * }
     */
    @Cordova()
    addContactNotifyListener(listener: (event: any) => void): void { }

    /**
     * 移除好友相关通知事件。
     * @param {(event: any) => void} listener
     */
    @Cordova()
    removeContactNotifyListener(listener: (event: any) => void): void { }

    /**
     * 消息撤回事件监听。
     * @param {(event: any) => void} listener
     * event = {
     *  'conversation': object      // 会话对象。
     *  'retractedMessage': object  // 被撤回的消息对象。
     * }
     */
    @Cordova()
    addMessageRetractListener(listener: (event: any) => void): void { }

    /**
     * 移除消息撤回事件监听。
     * @param {(event: any) => void} listener
     */
    @Cordova()
    removeMessageRetractListener(listener: (event: any) => void): void { }

}
