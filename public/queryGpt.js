var currentChatId = null;
var languageHeroId = null;

async function queryGpt(userQuery, level, language, isNewChat) {
    console.log(isNewChat);
    if (currentChatId === null || isNewChat) {
	console.log("mugsy");
	const data = await fetch('/chat/new-chat', {
            method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({level: level, language: language})
	})
	    .then(async response => {
		const data = await response.json()
		console.log(data);
		return data;
	    });
	currentChatId = data.chatId;
	languageHeroId = data.languageHeroId;
    }
    console.log(currentChatId);
    console.log(languageHeroId);
    console.log(currentChatId);
    const body = JSON.stringify({message: userQuery, chatId: currentChatId, languageHeroId: languageHeroId});
    console.log("AAAA");
    console.log(body);
    var run = await fetch('/chat/send-gpt-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
	body: body
    })
	.then(async response => {
	    response = await response.json();
	    console.log(response);
	    return response.run;	    
	})

    var res = null;
    var pollBody = JSON.stringify({chatId: currentChatId, run: run});
    async function poll() {
	return  await fetch('/chat/poll-gpt-response', {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: pollBody
	});
    };

    function pollUntilComplete() {
	return new Promise(async (resolve, reject) => {
	    async function pollAndUpdate() {
		
		console.log("polleon");
		try {
		    const response = await fetch('/chat/poll-gpt-response', {
			method: 'POST',
			headers: {
			    'Content-Type': 'application/json',
			},
			body: pollBody
		    });
		    console.log(response);
		    if (response.ok) {
			res = await response.json(); // Assuming the server responds with JSON
			console.log(res); // Process or log the result as needed
			console.log("=====");
			console.log(res.status);
			pollBody.run = res.run;
			// Check if the condition to stop polling is met, for example:
			if (res.status == "completed") {
			   resolve(res);
			   clearInterval(pollInterval);
			   console.log("Polling stopped:", res);
			}
			// if (res.status != prevState) {
			//     resolve(res);
			//     clearInterval(pollInterval);
			// }			
		    } else {
			reject(res);
			clearInterval(pollInterval);
			console.error("Polling error:", response.statusText);
		    }
		} catch (error) {
		    console.error("Fetch error:", error);
		}
	    }
	    const pollInterval = setInterval(pollAndUpdate, 250);
	});
    }


    /* while (!isPollingComplete) {
        swait pollAndUpdate(); // Wait for each poll to complete
        await new Promise(resolve => setTimeout(resolve, 250)); // Wait for 250ms before the next poll
	} */
	
    res = await pollUntilComplete();
    console.log('Polling complete.');
    console.log(res);
    const messages = res.messages;
    return messages;

	/*
		console.log(response);
	console.log("aaaa");
	const data = response.data;
	const messages = response.newMessages;
	console.log(messages);
	for (m in messages) {	    
            //document.getElementById('gpt-response').innerText = data.response;
	    appendMessage(messages[m],false);
	    scrollToBottom('gpt-response');
	};
    })
    .catch(error => console.error('Error:', error));*/
    

}

module.exports = queryGpt;
