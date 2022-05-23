import * as type from "@/store/mutationsType";

export default {
	//获取链接
	getLinks({commit}, payLoad) {
		getLinks(payLoad).then((res) => {
			commit(type.SET_LINKS, res.data);
		});
	},
};
