var currentChatId = null;

async function queryGpt(userQuery) {
    if (currentChatId == null) {
	console.log("mugsy");
	currentChatId = await fetch('/new-chat', {
            method: 'POST',
	})
	    .then(async response => {
		const data = await response.json()
		return data.chatId
	    });
    }
    console.log(currentChatId);
    const body = JSON.stringify({query: query, chatId: currentChatId});
    console.log("AAAA");
    console.log(body);
    const runId = await fetch('/gpt-query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
	body: body
    })
	.then(async response => {
	    response = await response.json();
	    console.log(response);
	    return response.newRunId;	    
	})
    console.log(currentChatId);
    var res = null;
    const pollBody = JSON.stringify({chatId: currentChatId});
    async function poll() {
	return  await fetch('/poll-gpt-response', {
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
		    const response = await fetch('/poll-gpt-response', {
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
			
			// Check if the condition to stop polling is met, for example:
			if (res.status == "done") {
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
    const messages = res.newMessages;
    for (m in messages) {                                                                                                                                                                                         
        //document.getElementById('gpt-response').innerText = data.response;
	appendMessage(messages[m].content[0].text.value,false);
    };

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
    

});
