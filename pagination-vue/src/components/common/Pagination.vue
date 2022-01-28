<template>
	<div class="pagination">
		<input type="text" class=" common-pagination-item pagination-ipt" v-model="iptPageIndex" @keyup.enter="handleJumpBtnClick">
		<div class="pagination-item  common-pagination-item" @click="handleJumpBtnClick">跳转</div>
		<div class="pagination-item  common-pagination-item" @click="handleToggleBtnClick('prev')">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"/></svg>
		</div>
		<div :class="['  common-pagination-item',{
			'current-page':pageIndex === 1,
			'pagination-item':pageIndex !== 1
			}]"
		     @click="handleFirstAndLastPageClick('first')"
		>1
		</div>
		
		<div class=" common-pagination-item" v-if="pageIndex>=5 && pageTotal>6">...</div>
		<div :class="['common-pagination-item',{
			'current-page':pageIndex === item,
			'pagination-item':pageIndex !== item
			}]"
		     v-for="(item,i) in pageNumList" :key="i"
		     @click="handlePageNumClick(item)"
		>{{ item }}
		</div>
		<div class=" common-pagination-item" v-if="!(pageNumList[pageNumList.length-1] === pageTotal-1) && pageTotal>6">
			...
		</div>
		<div :class="['pagination-item common-pagination-item',{
			'current-page':pageIndex === pageTotal,
			'pagination-item':pageIndex !== pageTotal
			}]"
		     @click="handleFirstAndLastPageClick('last')" v-if="pageTotal>=2"
		>{{ pageTotal }}
		</div>
		<div class="pagination-item common-pagination-item" @click="handleToggleBtnClick('next')">
			
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
		</div>
	</div>
</template>

<script>
/** 组件/工具类/store 导入 */

/** 网络请求导入 导入 */

export default {
	name: "",
	computed: {
		pageNumList() {
			return this.renderPageNumItem()
		}
	},
	data() {
		return {
			iptPageIndex: 1,
			pageTotal: 100,
			pageIndex: 1,
			pageSize: 10,
		}
	},
	methods: {
		/** 事件或其他相关方法 **/
		
		/**
		 * 跳转按钮被点击或者在input框激活的状态下按了回车键
		 */
		handleJumpBtnClick() {
			if (this.iptPageIndex > this.pageTotal) {
				this.iptPageIndex = this.pageTotal
			}
			if (this.iptPageIndex === "") {
				this.iptPageIndex = 1
			}
			this.pageIndex = parseInt(this.iptPageIndex)
			this.iptPageIndex = this.pageIndex
			this.$emit("currentChange", this.pageIndex)
		},
		
		/**
		 * 上一页 下一页被点击   通过传入的toggleDir 来判断
		 * @param toggleDir 点击的是上一页还是下一页
		 */
		handleToggleBtnClick(toggleDir) {
			if (toggleDir === "prev") { // 上一页
				if (this.pageIndex <= 1) return
				this.pageIndex -= 1
			} else { // 下一页
				if (this.pageIndex >= this.pageTotal) return;
				this.pageIndex += 1
			}
			this.iptPageIndex = this.pageIndex
			this.$emit("currentChange", this.pageIndex)
		},
		
		/**
		 * 中间分页被点击时候，将被点击的pageNum 传入，如果点击的不是pageIndex   则发送事件给父组件
		 * @param pageNum
		 */
		handlePageNumClick(pageNum) {
			if (pageNum === this.pageIndex) return
			this.pageIndex = pageNum
			this.iptPageIndex = this.pageIndex
			this.$emit("currentChange", this.pageIndex)
		},
		/**
		 *  通过计算获得首页  尾页   中间分页的数据数组
		 * @returns {*[]} 将拼接好的数组返回给外组件去渲染当前的页码
		 */
		renderPageNumItem() {
			let pageNumList = []
			let firstPage = 1
			let lastPage = this.pageTotal
			if (this.pageTotal <= 6) {
				if (this.pageTotal === 1) {
					firstPage = 2
					lastPage = 0
				} else {
					firstPage = 2
					lastPage = this.pageTotal - 1
				}
			} else {
				if (this.pageIndex < 5) {
					//如果当前页面小于6 的时候，则将开始页面设置为2  结束页面设置为6
					firstPage = 2
					lastPage = 5
				} else if (this.pageIndex > this.pageTotal - 4) {
					//  如果当前页面  大于 总页面-4    则表示是页码要到最后了
					firstPage = this.pageTotal - 4
					lastPage = this.pageTotal - 1
				} else {
					// 当前页码在中间位置
					firstPage = this.pageIndex - 1
					lastPage = this.pageIndex + 1
				}
			}
			while (firstPage <= lastPage) {
				pageNumList.push(firstPage)
				firstPage++
			}
			return pageNumList
		},
		/**
		 * 首页和尾页被点击则发送最新的pageIndex 个父组件
		 * @param { String } item  根据这个判断是首页还是尾页  （first）
		 */
		handleFirstAndLastPageClick(item) {
			if (item === "first") {
				if (this.pageIndex === 1) return
				this.pageIndex = 1
			} else {
				if (this.pageIndex === this.pageTotal) return;
				this.pageIndex = this.pageTotal
			}
			this.iptPageIndex = this.pageIndex
			this.$emit("currentChange", this.pageIndex)
			
		},
		
		/** 网络请求相关方法 **/
	},
	watch: {
		/** 如果文本框被输入了非整数之外的字符 则替换为空 只保留整数部分 */
		iptPageIndex() {
			let iptValue = this.iptPageIndex.toString()
			if (iptValue.length === 1) {
				this.iptPageIndex = iptValue.replace(/[^1-9]/g, "");
			} else {
				this.iptPageIndex = iptValue.replace(/\D/g, "");
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.pagination {
	color: #333;
	display: flex;
	user-select: none;
	
	.common-pagination-item {
		margin: 0 5px;
		padding: 5px 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: max-content;
		background-color: #f8f9fc;
		border-radius: 4px;
	}
	
	.pagination-ipt{
		width: 60px;
		outline: none;
		border:1px solid #eee;
	}
	
	.pagination-item {
		cursor: pointer;
		border-radius: 4px;
		transition: all 0.3s linear;
		&:hover {
			background-color: #2c74e6;
			color: #fff;
		}
	}
	
	.current-page {
		color: #1957EA;
	}
}
</style>