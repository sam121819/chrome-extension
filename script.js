function get_keyword() {
    let u = window.location.toString()
    let domain = new URL(u);
    domain = domain.hostname.replace('www.', '');
    domain = domain.split(".")
    domain = domain[0]
    return domain
}

function get_domain_index(domain) {

    let index = window.keyword.indexOf(domain)
    if (index !== -1) {
        return index
    } else {
        return null
    }
}

function badge(index) {
    domain = get_keyword()
    if ((domain == window.keyword[index])) {
        return { text: "safe", color: "green" };
    } else {
        alert("Watch your steps!!!")
        return { text: "risky", color: "red" };
    }
}

chrome.tabs.onUpdated.addListener(function(id, info, tab) {

    if (info.status !== "complete") {
        return;
    }
    let domain = get_keyword()

    index = get_domain_index(domain)
    console.log(index)
    ui = badge(index)

    chrome.browserAction.setBadgeText({
        text: ui["text"],
        tabId: tab.id
    })

    chrome.browserAction.setBadgeBackgroundColor({
        color: ui["color"],
        tabId: tab.id
    })

});