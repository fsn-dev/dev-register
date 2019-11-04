const config = require('@s/config')

function timeToEN (time, type) {
	let weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat ']
	let mounth = ['Jan\'', 'Feb\'', 'Mar\'', 'Apr\'', 'May\'', 'Jun\'', 'Jul\'', 'Aug\'', 'Sept\'', 'Oct\'', 'Nov\'', 'Dec\'']
	time = time.toString().length > 10 ? time : (time * 1000)
	let date = new Date(time)
	let Y = date.getFullYear()
	let M = date.getMonth()
	let D = date.getDate()
	let W = date.getDay()
	if (type === 'all') {
		weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday ', 'Thursday', 'Friday', 'Saturday ']
		mounth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// 		console.log(M)
// 		console.log(mounth[M])
		return weeks[W] + ', ' + mounth[M] + ' ' + D + ', ' + Y
	}
	return mounth[M] + ' ' + D
}


export default {
	ERROR_TIP: {
		TIP_0: "",
	},
	WARNING_TIP: {
		TIP_0: 'Validation timeout, please login again!',
		TIP_1: 'This account is registered!',
		TIP_2: 'Upload failed!'
	},
	SUCCESS_TIP: {
		TIP_0: "Success!",
		TIP_1: "Success!",
		TIP_2: "Success!",
	},
	BTN: {
		hangRegister: 'Manual Register',
		githubLogin: 'GitHub Login',
		clickUpload: 'Drag the file here, or<em> Click upload</em>',
		selectCity: 'Current City',
		createCode: 'Create Poster',
		copy: 'Copy',
		editInfo: 'Edit Information',
		cancel: 'Cancel',
		sureEdit: 'Confirm',
		nowJoin: 'Join',
		goCM: 'Join GitHub community'
	},
	TITLE: {
		joinCM: "Join FUSION Open Source Community",
	},
	PLACEHOLDER: {
	},
	LABEL: {
		github: 'Github Username',
		wx: 'Telegram ID',
		email: 'Email address',
		work: 'Current Occupation',
		city: 'Location (City)',
		skill: 'What skills do you have? i.e coding, translation, design',
		uploadFile: 'ADD FILE',
		ref: 'Recommender',
		role: 'Community Role',
		address: 'FSN Wallet Address'
	},
	NOTES: {
		N_0: 'Register to join the Fusion open-source community and earn ' + config.reward + ' FSN tokens (time-locked for 3 months).<br>Participate in code development, testing, design, content, traother activities to win ' + config.totalReward / 100 + ' million in FSN community rewards.',
		N_1: 'There is a special incentive for early birds who will be rewarded ' + config.reward * 1.2 + ' FSN (time-locked for 3 months) if the form is completed before ' + timeToEN(config.birdTime) + ' 23:59 Shanghai time.',
		N_2: 'After completing this form, the ¦nal step is to join the github.com/fsn-dev community as a public member. github.com/',
		N_3: 'Examples: Game Industry, Software Development Engineer',
		N_4: 'Examples: good at English translation, and provide explanations of relevant skills and experience, such as: LinkedIn address, online resume, GitHub project address, document counting, translation article address, blog article, etc. Please provide the attachment for details. Note: False materials can not pass the audit.',
		N_5: 'Attach your credentials and examples of your work (LinkedIn pro¦le, CV, design portfolio)',
		N_6: 'Provide Referee’s Github or Telegram Username',
		N_7: 'This is the address where you will receive your rewards if your submission is approved.。<br>Create new wallet<a href="https://fsn.dev/wallet/#generate-wallet" target="_blank">https://fsn.dev/wallet/#generate-wallet</a>',
		N_8: 'Add customer service, invite you to join the group!'
	},
	VALID: {
		V_0: 'Please enter the GitHub username',
		V_1: 'Please enter the Telegran ID',
		V_2: 'Please enter the Email',
		V_3: 'Please enter the correct Email',
		V_4: 'Please enter industry and occupation',
		V_5: 'Please choose the city',
		V_6: 'Please enter skills',
		V_7: 'At least 20 words',
		V_8: 'Please fill in the recommender',
		V_9: 'Please select a community role',
	}
}
