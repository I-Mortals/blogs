import http from '../util/request.js'

export function getdialogue(data){
	return http.request({
		url:'/admin/robot/aibot',
		method:'POST',
		// params:data
		data: data
	})
}