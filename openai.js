require('dotenv').config();
const OpenAI = require('openai');
const openai = new OpenAI();


function Chat(assistant, thread) {
    this.assistant = assistant;
    this.thread = thread;
    this.lastUserMessage = null;
    this.status = null;

}

var activeChats = {};

Chat.prototype.sendMessage = async function (userMessage) {
    console.log("gay");
    console.log(this.thread);
    console.log(this.assistant);
    const sentMessage = await openai.beta.threads.messages.create(
	this.thread.id,
	{
	    role: "user",
	    content: userMessage
	            
	}
	    
    );

    const sentMessageId = sentMessage.id;
    this.lastUserMessage = sentMessage;
    return sentMessageId;
    
}

Chat.prototype.createGptRun = async function () {
    console.log("chudley");
    var run = await openai.beta.threads.runs.create(
	this.thread.id,
	{
	    assistant_id: this.assistant.id
	            
	}
	    
    );
    this.status = "thinking";
    return run;
    
}

// Chat.prototype.manageRunUntilComplete = async function (run) {
//     while (run.status != "completed" && run.status != "failed") {

// 	run = await openai.beta.threads.runs.retrieve(
// 	    this.thread.id,
// 	    run.id
	            
// 	);
// 	console.log("status");
// 	console.log(run.status);
// 	if (run.status == "requires_action" && run.required_action.type == "submit_tool_outputs") {
// 	    this.status = "function";
// 	    run = await this.executeFunctions(run);
// 	    this.status = "writing";
	            
// 	}
// 	await sleep(250);
	    
//     }
//     console.log("run should be complet");
//     console.log(run.status);
//     console.log(run);
//     this.status = "done";
//     return run;
    
// }

Chat.prototype.pollRun = async function (run) {
    const runInfo = await openai.beta.threads.runs.retrieve(
	this.thread.id,
	run.id
    );
    console.log(runInfo);
    return runInfo;
}

Chat.prototype.getNewMessages = async function () {
    var messages = await openai.beta.threads.messages.list(
	this.thread.id
	    
    );
    console.log(messages);
    messages = messages.data;
    console.log("messagessdekfgnaiushfasnfbs");
    console.log(messages);
    var newMessages = [];
    for (const m in messages) {
	console.log(messages[m]);
	if (messages[m].id == this.lastUserMessage.id) {
	    break;
	            
	};
	newMessages.push(messages[m]);
	    
    };
    console.log("NM");
    console.log(newMessages);
    return newMessages;
    
}

const instructions = "";

const languageHeroPromise = (async () => {
    return await openai.beta.assistants.create({
	name: "Language Hero",
	instructions: instructions,
	//      tools: [{type: "function", amazonSearchFunctionSchema}],

	//tools: [{"type": "function", "function": amazonSearchFunctionSchema}, {"type": "function", "function": amazonAsinLookupFunctionSchema}],
	model: "gpt-4-0125-preview"
	    
    });
    
})();

async function initializeChat(lang) {

    assistant = await languageHeroPromise;

    thread = await openai.beta.threads.create();

    chat = new Chat(assistant = assistant, thread = thread, language = lang);

    return chat;
    
}
