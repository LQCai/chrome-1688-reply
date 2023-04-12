// 因默认进入的接待页面嵌套了iframe, 不便获取元素, 此处重定向到iframe内部的页面
let href = window.location.href
if (!href.includes('def_cbu_web_im_core')) {
    href = href.replace("def_cbu_web_im", "def_cbu_web_im_core")
    window.location.href = href
}

function loadPage() {
    setInterval(function () {
        const timeElements = document.getElementsByClassName('time')
        for (let i = 0; i < timeElements.length; i++) {
            // 获取十分钟内的聊天记录
            if ((timeElements[i].textContent.includes('分钟') && parseInt(timeElements[i].textContent) <= 10) || timeElements[i].textContent === '现在') {
                // 点击聊天框
                document.getElementsByClassName('conversation-item')[i].click()
                if (document.getElementsByClassName('nick')[document.getElementsByClassName('nick').length - 1].textContent != document.querySelector("#ice-container > div > div > div.ww_conversation > div.ww_user_panel > div > div:nth-child(2)").textContent) {
                    // 匹配话术
                    const lastMsg = document.querySelector("#ice-container > div > div > div.ww_container > div.ww_body > div.ww_box > div.ww_message > div > div > div.rc-scrollbars-view > div:last-child > div > div > div > div.content > div > div > div > pre").textContent
                    let text = commonReply
                    for (let key = 0; key < Object.keys(contentObject).length; key ++) {
                        if (Object.keys(contentObject)[key] === lastMsg) {
                            text = contentObject[Object.keys(contentObject)[key]]
                        }
                    }
                    // 修改输入表单
                    const edit = document.querySelector("#ice-container > div > div > div.ww_container > div.ww_body > div.ww_box > div.ww_input > div > div > div > div.biz-expression-editor.text-area > div.editBox > pre")
                    edit.innerHTML = text
                    edit.addEventListener('input', console.log, false)
                    const event = new UIEvent('input')
                    edit.dispatchEvent(event)
                    // 点击发送
                    document.getElementsByClassName('next-btn next-small next-btn-primary send-btn')[0].click()
                }
            }
        }
    }, 3000);
}
loadPage()
