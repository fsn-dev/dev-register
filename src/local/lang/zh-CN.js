const config = require('@s/config')
export default {
	ERROR_TIP: {
		TIP_0: "",
	},
	WARNING_TIP: {
		TIP_0: '验证超时，请重新登录！',
		TIP_1: '此账户已注册！',
		TIP_2: '上传失败！'
	},
	SUCCESS_TIP: {
		TIP_0: "加入成功！",
		TIP_1: "编辑成功！",
		TIP_2: "复制成功！",
	},
	BTN: {
		hangRegister: '手动注册',
		githubLogin: 'GitHub登录',
		clickUpload: '将文件拖到此处，或<em>点击上传</em>',
		selectCity: '定位当前城市',
		createCode: '生成海报',
		copy: '复制',
		editInfo: '编辑信息',
		cancel: '取消',
		sureEdit: '确认修改',
		nowJoin: '立即加入',
		goCM: ' 加入GitHub社区'
	},
	TITLE: {
		joinCM: "加入FUSION开源社区",
	},
	PLACEHOLDER: {
	},
	LABEL: {
		github: 'GitHub用户名',
		wx: '微信号',
		email: '邮件地址',
		work: '从事行业与职业',
		city: '所在城市',
		skill: '擅长技能（请填写最少20个字）',
		uploadFile: '技能经验说明附件',
		ref: '推荐人',
		role: '社区角色',
		address: 'FSN钱包地址'
	},
	NOTES: {
		N_0: '注册加入fsn.dev开源社区可直接获得' + config.reward + '个fsn时间代币！<br>参与代码开发、测试、设计、内容、翻译、meetup、推广等活动，赢取' + config.totalReward + '万个fsn的社区奖励。',
		N_1: '早鸟注册奖励：可获得' + config.reward * 1.2 + '个fsn时间代币！！！<br>早鸟截止日：' + config.birdTime,
		N_2: '请填写GitHub用户名，可访问账户信息github.com/',
		N_3: '举例：游戏行业， 软件开发工程师',
		N_4: '举例：擅长英语翻译，并提供相关技能经验的说明，可以是：linkedin地址，在线简历，参与GitHub项目地址，计文件，翻译文章地址，博客文章等。详细材料请提供附件。注：虚假材料无法通过审核。',
		N_5: '请提供相关经验的说明附件，可以是：简历附件，设计文件，翻译文件，博客文章等任意一种。注：虚假材料无法通过审核。（不超过500kb）',
		N_6: '填写推荐人的微信号或GitHub用户名',
		N_7: '用于注册通过后接收奖励。可以审核通过后补充填写。<br>新创建钱包<a href="https://fsn.dev/wallet/#generate-wallet" target="_blank">https://fsn.dev/wallet/#generate-wallet</a>',
		N_8: '加小助手（备注：开源社区）进群!'
	},
	VALID: {
		V_0: '请输入GitHub用户名',
		V_1: '请输入微信',
		V_2: '请输入邮箱地址',
		V_3: '请输入正确的邮箱地址',
		V_4: '请输入行业与职业',
		V_5: '请选择城市',
		V_6: '请输入技能',
		V_7: '最少20个字',
		V_8: '请填写推荐人',
		V_9: '请选择社区角色',
	}
}
