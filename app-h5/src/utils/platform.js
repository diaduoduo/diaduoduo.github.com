import app from "./app"
import weChat from "./weChat"
import miniProgram from './miniProgram'

function checkPlatform() {
    let platform=app;
    if(navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1){
        platform=weChat;
    }
    if(window.__wxjs_environment&&window.__wxjs_environment === 'miniprogram'){
        platform=miniProgram;
    }
    return platform;
}
export default checkPlatform();
