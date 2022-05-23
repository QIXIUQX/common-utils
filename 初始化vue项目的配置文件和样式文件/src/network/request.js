import Axios from "axios";

let cancelRequestArr = [];
let CancelToken = Axios.CancelToken;

/**
 * 如果请求中包含已发送但未响应的请求,则取消请求
 * @param config 配置对象
 */
let cancelRequestFn = (config) => {
	cancelRequestArr.forEach((item, index) => {
		if (config) {
			if (item.UrlPath === config.url) {
				item.Cancel(); // 取消请求
				cancelRequestArr.splice(index, 1); // 移除当前请求记录
			}
		} else {
			item.Cancel(); // 取消请求
			cancelRequestArr.splice(index, 1); // 移除当前请求记录
		}
	});
};


export function requestServer(config) {
	const instance = Axios.create({
		//生产环境
		// baseURL: "http://localhost:3000",
		//跨域代理
		baseURL: "/devApiServer",
		timeout: 1000 * 10,
		// withCredentials: true,
	});
	instance.interceptors.request.use(
		//请求拦截
		(config) => {
			//是否缓存请求,不加'Cache-Control': 'no-cache' 则表示缓存
			config.headers = {
				'Cache-Control': 'no-cache'
			};
			// 取消上一次的重复请求
			cancelRequestFn(config);
			//将本次的请求放到数组中
			config.cancelToken = new CancelToken((res) => {
				cancelRequestArr.push({UrlPath: config.url, Cancel: res});
			});
			return config;
		},
		(err) => {
			return err;
		}
	);
	instance.interceptors.response.use(
		//响应成功
		res => {
			cancelRequestFn(res.config);
			return res.data;
		},
		//响应失败
		error => {
			// 重复请求被取消也会当作失败响应,标记是否为取消请求导致的失败isCancel:true|false,ture手动取消,false 正常请求失败
			error.isCancel = false
			if (Axios.isCancel(error)) {
				error.isCancel = true
				return Promise.reject(error);
			}
			return Promise.reject(error);
		}
	);
	return instance(config);
}
