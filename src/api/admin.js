import service from "@/utils/request";

export function login(data){
    return service.post('/user/login', data)
}

export function getCateList(){
    return service.get('/knowledge/category/tree')
}

export function getKnowledgeList(data){
    return service.get('/knowledge/list', {params: data})
}

export function uploadImg(file, id){
    const formData = new FormData()
    formData.append('file', file)
    formData.append('businessType', 'ARTICLE')
    formData.append('businessId', id)
    formData.append('businessField', 'cover')

    return service.post('/file/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export function addArticle(data){
    return service.post('/knowledge/article', data)
}

export function getRecordList(data){
    return service.get('/psychological-chat/sessions', {params: data})
}

export function getSessionDetail(id){
    return service.get(`/psychological-chat/sessions/${id}/messages`)
}

export function getAnaData(){
    return service.get('/data-analytics/overview')
}

export function logout(){
    return service.post('/user/logout')
}
