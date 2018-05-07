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
    // 聊天室 id
    roomId?: string;

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
    // 上传后文件的文件名
    fileName?: string;

    // 开始的消息下标。
    from?: number;
    // 要获取的消息数。比如当 from = 0, limit = 10 时，是获取第 0 - 9 的 10 条历史消息。
    limit?: number;
    reason?: string;
    noteName?: string;

    // 透传消息内容
    message?: string;

    isNoDisturb: boolean;

}

export interface UserInfo {
    type: 'user';
    username: string;           // 用户名
    appKey: string;             // 用户所属应用的 appKey，可与 username 共同作为用户的唯一标识
    nickname: string;           // 昵称
    gender: string;             // 'male' / 'female' / 'unknown'
    avatarThumbPath: string;    // 头像的缩略图地址
    birthday: number;           // 日期的毫秒数
    region: string;             // 地区
    signature: string;          // 个性签名
    address: string;            // 具体地址
    noteName: string;           // 备注名
    noteText: string;           // 备注信息
    isNoDisturb: boolean;       // 是否免打扰
    isInBlackList: boolean;     // 是否在黑名单中
    isFriend: boolean;          // 是否为好友
    extras: object;              // 自定义键值对
}
export interface GroupInfo {
    type: 'group';
    id: string;                 // 群组 id
    name: string;               // 群组名称
    desc: string;               // 群组描述
    level: number;              // 群组等级，默认等级 4
    owner: string;              // 群主的 username
    ownerAppKey: string;        // 群主的 appKey
    maxMemberCount: number;     // 最大成员数
    isNoDisturb: boolean;       // 是否免打扰
    isBlocked: boolean;          // 是否屏蔽群消息
}

export interface Conversation {
    /**
    *单聊：如果用户有昵称，title 为昵称，否则为 username。
    *群聊：如果未设置群名称，使用群成员中前五个人的名称拼接成 title。
    **/
    title: string;                  // 会话标题
    latestMessage: Message;         // 最近的一条消息对象。如果不存在消息，则 conversation 对象中没有该属性。
    unreadCount: number;            // 未读消息数
    conversationType: 'single' | 'group';
    target: UserInfo | GroupInfo;    // 聊天对象信息
}


export interface ChatRoom {
    roomId: string;   // 聊天室 id
    type: 'chatRoom';
    name: string;     // 聊天室名称
    appKey: string;   // 聊天室所属应用的 App Key
    description: string; // 聊天室描述信息
    createTime: number; // 创建日期，单位：秒
    maxMemberCount: number; // 最大成员数
    memberCount: number;     // 当前成员数
}

export interface Message {

}

export interface TextMessage extends Message {
    id: string;                     // 本地数据库中的消息 id
    serverMessageId: string;        // 对应服务器端的消息 id
    isSend: boolean;                // 消息是否由当前用户发出。true：为当前用户发送；false：为对方用户发送。
    type: 'text';                   // 消息类型
    from: UserInfo;                 // 消息发送者对象
    target: UserInfo | GroupInfo;   // 消息接收者对象
    createTime: number;             // 发送消息时间
    text: string;                   // 消息内容
    extras: object;                  // 附带的键值对
}

export interface ImageMessage extends Message {
    id: string;                    // 本地数据库中的消息 id
    serverMessageId: string;        // 对应服务器端的消息 id
    isSend: boolean;                // 消息是否由当前用户发出。true：为当前用户发送；false：为对方用户发送。
    type: 'image';                 // 消息类型
    from: UserInfo;                // 消息发送者对象
    target: UserInfo | GroupInfo;  // 消息接收者对象
    extras: object;                // 附带的键值对
    thumbPath: string;              // 图片的缩略图路径
}

export interface VoiceMessage extends Message {
    id: string;                     // 本地数据库中的消息 id
    serverMessageId: string;         // 对应服务器端的消息 id
    isSend: boolean;                // 消息是否由当前用户发出。true：为当前用户发送；false：为对方用户发送。
    type: 'voice';                  // 消息类型
    from: UserInfo;                 // 消息发送者对象
    target: UserInfo | GroupInfo;   // 消息接收者对象
    extras: object;                 // 附带的键值对
    path: string;                   // 语音文件路径
    duration: number;                // 语音时长，单位秒
}

export interface LocationMessage extends Message {
    id: string;                     // 本地数据库中的消息 id
    serverMessageId: string;         // 对应服务器端的消息 id
    isSend: boolean;                // 消息是否由当前用户发出。true：为当前用户发送；false：为对方用户发送。
    type: 'location';               // 消息类型
    from: UserInfo;                 // 消息发送者对象
    target: UserInfo | GroupInfo;   // 消息接收者对象
    extras: object;                 // 附带的键值对
    address: string;                // 详细地址
    longitude: number;              // 经度
    latitude: number;               // 纬度
    scale: number;                    // 地图缩放比例
}

/**
 * 如果要获取文件，需要调用 downloadFile 方法来下载文件。
 */
export interface FileMessage extends Message {
    id: string;                     // 本地数据库中的消息 id
    serverMessageId: string;         // 对应服务器端的消息 id
    isSend: boolean;                // 消息是否由当前用户发出。true：为当前用户发送；false：为对方用户发送。
    type: 'file';                   // 消息类型
    from: UserInfo;                 // 消息发送者对象
    target: UserInfo | GroupInfo;   // 消息接收者对象
    extras: object;                 // 附带的键值对
    fileName: string;                // 文件名
}

export interface CustomMessage extends Message {
    id: string;                     // 本地数据库中的消息 id
    serverMessageId: string;         // 对应服务器端的消息 id
    isSend: boolean;                // 消息是否由当前用户发出。true：为当前用户发送；false：为对方用户发送。
    type: 'custom';                 // 消息类型
    from: UserInfo;                 // 消息发送者对象
    target: UserInfo | GroupInfo;   // 消息接收者对象
    extras: object;                 // 附带的键值对
    customObject: object;            // 自定义键值对
}

export interface EventMessage {
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
export class JMessageLt extends IonicNativePlugin {

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
     * @param params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    register(params: any): Promise<any> {
        return;
    }

    /**
     * 登录
     * @param params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    login(params: any): Promise<any> {
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
     * @param params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    getUserInfo(params: any): Promise<any> {
        return;
    }


    /**
     * 修改密码
     * @param params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    updateMyPassword(params: any): Promise<any> {
        return;
    }

    /**
     * 更新当前用户头像
     * @param params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    updateMyAvatar(params: any): Promise<any> {
        return;
    }

    /**
     * 下载用户头像缩略图（不会重复下载）
     * @param params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    downloadThumbUserAvatar(params: any): Promise<any> {
        return;
    }

    /**
     * 下载用户头像原图（不会重复下载）。如果用户未设置头像，返回的 filePath 为空字符串。
     * @param params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    downloadOriginalUserAvatar(params: any): Promise<any> {
        return;
    }

    /**
     * 更新信息
     * @param params
     * @returns {Promise<any>}
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
     * @param {MessageParams} params
     * @returns {Promise<any>}
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
     * @param {MessageParams} params
     * @returns {Promise<any>}
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
     * @param {MessageParams} params
     * @returns {Promise<any>}
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
     * @param {MessageParams} params
     * @returns {Promise<any>}
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
     * @param {MessageParams} params
     * @returns {Promise<any>}
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
     * @param {MessageParams} params
     * @returns {Promise<any>}
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
     * @param {MessageParams} params
     * @returns {Promise<any>}
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
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    getHistoryMessages(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 根据消息 id 获取消息对象
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    getMessageById(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 根据 id 删除消息。
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    deleteMessageById(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 下载图片消息缩略图。如果已经下载，会直接返回本地文件路径，不会重复下载。
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    downloadThumbImage(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 下载图片消息原图。如果已经下载，会直接返回本地文件路径，不会重复下载。
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    downloadOriginalImage(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 下载语音文件。如果已经下载，会直接返回本地文件路径，不会重复下载。
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    downloadVoiceFile(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 下载文件消息文件，如果已经下载，会直接返回本地文件路径，不会重复下载。
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    downloadFile(params: MessageParams): Promise<any> {
        return;
    }
    /**
     * 透传消息内容
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    sendSingleTransCommand(params: MessageParams): Promise<any> {
        return;
    }

    /**
     * 发送群聊透传命令消息
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    sendGroupTransCommand(params: MessageParams): Promise<any> {
        return;
    }


    /**
     * 发送添加好友请求
     * @param  params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    sendInvitationRequest(params: MessageParams): Promise<any> { return; }

    /**
     * 接受好友请求
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    acceptInvitation(params: MessageParams): Promise<any> { return; }

    /**
     * 拒绝好友请求
     * @param params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    declineInvitation(params: MessageParams): Promise<any> { return; }

    /**
     * 获取当前登录用户的好友列表
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getFriends(): Promise<any> { return; }

    /**
     * 从好友列表删除
     * @param params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    removeFromFriendList(params: {username: string, appKey: string}): Promise<any> { return; }

    /**
     * 修改当前用户好友的备注名
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    updateFriendNoteName(params: MessageParams): Promise<any> { return; }

    /**
     * 修改当前用户好友的备注信息
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    updateFriendNoteText(params: MessageParams): Promise<any> { return; }


    /**
     * 创建群组
     * @param {{name: string; desc: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    createGroup(params: {name: string, desc: string}): Promise<any> { return; }

    /**
     * 获取当前用户所有所在的群组 id
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getGroupIds(): Promise<any> { return; }

    /**
     * 获取群组信息
     * @param {{id: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    getGroupInfo(params: {id: string}): Promise<any> { return; }

    /**
     * 更新群组信息
     * @param {{id: string; newName: string; newDesc: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    updateGroupInfo(params: {id: string, newName: string, newDesc: string}): Promise<any> { return; }

    /**
     * 群组添加成员
     * @param {{id: string; usernameArray: any[]; appKey: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    addGroupMembers(params: {id: string, usernameArray: any[], appKey: string}): Promise<any> { return; }

    /**
     * 移除群组成员
     * @param {{id: string; usernameArray: any[]; appKey: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    removeGroupMembers(params: {id: string, usernameArray: any[], appKey: string}): Promise<any> { return; }

    /**
     * 获取群组用户列表
     * @param {{id: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    getGroupMembers(params: {id: string}): Promise<any> { return; }

    /**
     * 退出群组
     * @param {{id: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    exitGroup(params: {id: string}): Promise<any> { return; }


    /**
     * 设置是否屏蔽指定群组消息。
     * @param {{id: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    blockGroupMessage(params: {id: string, isBlock: boolean}): Promise<any> { return; }

    /**
     * 查询指定群组是否被屏蔽。
     * @param {{id: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    isGroupBlocked(params: {id: string}): Promise<any> { return; }


    /**
     * 获取被当前登录用户屏蔽的群组列表。
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getBlockedGroupList(): Promise<any> { return; }


    /**
     * 添加用户到黑名单
     * @param {{usernameArray: any[]; appKey: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    addUsersToBlacklist(params: {usernameArray: any[], appKey: string}): Promise<any> { return; }

    /**
     * 把用户从黑名单移除
     * @param {{usernameArray: any[]; appKey: string}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    removeUsersFromBlacklist(params: {usernameArray: any[], appKey: string}): Promise<any> { return; }

    /**
     * 获取黑名单列表
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getBlacklist(): Promise<any> { return; }

    /**
     * 设置某个用户或群组是否免打扰。
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    setNoDisturb(params: MessageParams): Promise<any> { return; }

    /**
     * 获取免打扰用户和群组名单。
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getNoDisturbList(): Promise<any> { return; }

    /**
     * 设置是否全局免打扰。
     * @param {{isNoDisturb: boolean}} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    setNoDisturbGlobal(params: {isNoDisturb: boolean}): Promise<any> { return; }

    /**
     * 判断当前是否免打扰。
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    isNoDisturbGlobal(): Promise<any> { return; }





    /**
     * 创建聊天会话。
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    createConversation(params: MessageParams): Promise<any> { return; }

    /**
     * 删除聊天会话，同时会删除本地聊天记录
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    deleteConversation(params: MessageParams): Promise<any> { return; }

    /**
     * 进入聊天会话。可以在进入聊天会话页面时调用该方法，这样在收到当前聊天用户的消息时，不会显示通知。
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    enterConversation(params: MessageParams): Promise<any> { return; }

    /**
     * (Android only) 退出聊天会话。调用后，聊天会话之后的相关消息通知将会被触发。
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    exitConversation(params: MessageParams): Promise<any> { return; }


    /**
     * 获取会话
     * @param {MessageParams} params
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 1,
        errorIndex: 2
    })
    getConversation(params: MessageParams): Promise<any> { return; }

    /**
     * 获取会话列表
     * @returns {Promise<any>}
     */
    @Cordova({
        successIndex: 0,
        errorIndex: 1
    })
    getConversations(): Promise<any> { return; }

    /**
     * 重置单个会话的未读消息数
     * @param {MessageParams} params
     * @returns {Promise<any>}
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


    /**
     * 收到聊天室消息监听
     * @param {(event: any) => void} listener
     */
    @Cordova()
    addReceiveChatRoomMessageListener(listener: (event: any) => void): void { }

    /**
     * 移除收到聊天室消息监听
     * @param {(event: any) => void} listener
     */
    @Cordova()
    removeReceiveChatRoomMessageListener(listener: (event: any) => void): void { }

}
