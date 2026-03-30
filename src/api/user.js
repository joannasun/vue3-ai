import service from "@/utils/request";

export function register(data){
    return service.post('/user/add', data)
}

export function createSession(data){
    return service.post('/psychological-chat/session/start', data)
}

export function getSessionList(sessionId){
    return service.get(`/psychological-chat/sessions`)
}
export function delSession(sessionId){
    return service.delete(`/psychological-chat/sessions/${sessionId}`)
}
export function getSessionDetailList(sessionId){
    return service.get(`/psychological-chat/sessions/${sessionId}/messages`)
}
export function getSessionResultList(sessionId){
    return service.get(`/psychological-chat/session/${sessionId}/emotion`)
}
export function getStream(data){
    return service.post('/psychological-chat/stream', data, {
        headers: {
            'accept': 'text/event-stream'
        }
    })
}