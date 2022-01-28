<template>
	<div id="app">
		<Pagination @currentChange="currentChange"></Pagination>
	</div>
</template>

<script>
/** 组件/工具类/store 导入 */
import Pagination from "./components/common/Pagination";

/** 网络请求导入 导入 */

export default {
	name: "",
	components: {
		Pagination,
	},
	methods: {
		/** 事件或其他相关方法 **/
		currentChange(currentPage) {
			console.log(currentPage)
		}
		/** 网络请求相关方法 **/
	},
}
</script>

<style lang="scss" scoped>

</style>