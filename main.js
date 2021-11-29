const dataList = document.querySelector('#data-list');
const body = document.querySelector('body');
const api = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

async function makeHttpRequest(url) {
    const httpResponse = await fetch(url);
    const data = await httpResponse.json();
    return data;
}

// promise syntax

async function topStories() {
    const data = await makeHttpRequest(api);
    for (i = 0; i < 100; i++) {
        let storyId = data[i];
        const storyLink = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`;
        const userLink = `https://news.ycombinator.com/user?id=`;
        const commentsLink = `https://news.ycombinator.com/item?id=`;
        const storyDetail = await makeHttpRequest(storyLink);
        const fromUrl = `https://news.ycombinator.com/from?site=${null}`;
        const articleList = document.createElement('div');
        articleList.innerHTML = `
        <li class="list-group-item d-flex justify-content-between align-items-start" style="border: none; border-radius: 4px; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            <div class="ms-2 me-auto">
                <div class="fw-bold">
                    <a href="${storyDetail.url}" target="_blank">${storyDetail.title}</a> <a href="${fromUrl}" class="story-url">(story domain url)</a>
                </div>
                Submitted by <a href="${userLink}${storyDetail.by}">${storyDetail.by}</a> ${storyDetail.time} hours ago | <a href="${commentsLink}${storyDetail.descendants}">${storyDetail.descendants} comments</a>
            </div>
            <span class="badge bg-success rounded-pill">${storyDetail.score} points</span>
        </li>
        <br />
        `;
        dataList.append(articleList);
    }
}

// Call the function
topStories();